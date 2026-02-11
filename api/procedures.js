import { google } from 'googleapis';

export default async function handler(req, res) {
  // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Check for environment variables
  if (!process.env.GOOGLE_SHEETS_CREDENTIALS || !process.env.GOOGLE_SHEET_ID) {
    console.error('Missing Google Sheet credentials or ID');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // 1. Fetch spreadsheet metadata to get the actual sheet name (tab name)
    const metaResponse = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: 'sheets.properties.title',
    });

    const sheetTitle = metaResponse.data.sheets?.[0]?.properties?.title;
    if (!sheetTitle) {
      throw new Error('No sheets found in the spreadsheet');
    }

    // 2. Use the dynamic sheet title for the range
    const range = `${sheetTitle}!A:I`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(200).json({ procedures: [], filters: {} });
    }

    // Extract headers (first row) and normalize them
    // Expected headers: procedure_id, top_category, group_bucket, section, procedure_name, tags, visible, sort_order
    const headers = rows[0].map((header) => header.toLowerCase().replace(/\s+/g, '_'));
    console.log('Detected Headers:', headers);

    // Map rows to objects
    const procedures = rows.slice(1).map((row, i) => {
      const procedure = {};
      headers.forEach((header, index) => {
        const value = row[index] ? row[index].trim() : '';

        if (header === 'tags') {
          procedure[header] = value ? value.split(',').map((tag) => tag.trim()) : [];
        } else if (header === 'sort_order') {
          procedure[header] = value ? parseInt(value, 10) : 999;
        } else if (header === 'visible') {
          // Relaxed check: Only hide if explicitly FALSE. Default to true.
          const upperVal = value.toUpperCase();
          procedure[header] = upperVal !== 'FALSE' && upperVal !== 'NO';
        } else {
          procedure[header] = value;
        }
      });
      return procedure;
    });

    console.log(`Parsed ${procedures.length} rows.`);

    // Filter out hidden procedures
    const validProcedures = procedures.filter(
      (p) => p.visible && p.procedure_id && p.procedure_name
    );

    console.log(`Returning ${validProcedures.length} valid procedures.`);

    // Sort by sort_order
    validProcedures.sort((a, b) => a.sort_order - b.sort_order);

    // Extract unique values for filters
    const filters = {
      top_category: [...new Set(validProcedures.map((p) => p.top_category).filter(Boolean))].sort(),
      group_bucket: [...new Set(validProcedures.map((p) => p.group_bucket).filter(Boolean))].sort(),
      section: [...new Set(validProcedures.map((p) => p.section).filter(Boolean))].sort(),
    };

    // Cache for 5 minutes (300 seconds)
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

    return res.status(200).json({
      procedures: validProcedures,
      filters,
    });
  } catch (error) {
    console.error('Error fetching procedures:', error);
    return res.status(500).json({
      error: 'Failed to fetch procedures data',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}
