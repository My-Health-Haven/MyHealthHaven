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
    const range = 'Procedures!A:I'; // Assumes data is in 'Procedures' tab, columns A-I

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

    // Map rows to objects
    const procedures = rows.slice(1).map((row) => {
      const procedure = {};
      headers.forEach((header, index) => {
        const value = row[index] ? row[index].trim() : '';

        if (header === 'tags') {
          procedure[header] = value ? value.split(',').map((tag) => tag.trim()) : [];
        } else if (header === 'sort_order') {
          procedure[header] = value ? parseInt(value, 10) : 999;
        } else if (header === 'visible') {
          // Handle various boolean representations from Sheets (TRUE, true, checkmarks if exported oddly)
          procedure[header] = value.toUpperCase() === 'TRUE';
        } else {
          procedure[header] = value;
        }
      });
      return procedure;
    });

    // Filter out hidden procedures
    const validProcedures = procedures.filter(
      (p) => p.visible && p.procedure_id && p.procedure_name
    );

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
