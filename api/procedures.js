import { google } from 'googleapis';
import { parseProceduresRows } from './proceduresParser.js';

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

    // 2. Use a wide range so schema additions (e.g., care_type) remain supported.
    const range = `${sheetTitle}!A:Z`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(200).json({ procedures: [], filters: {} });
    }

    const { procedures, filters } = parseProceduresRows(rows);

    // Cache for 5 minutes (300 seconds)
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

    return res.status(200).json({
      procedures,
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
