import { google } from 'googleapis';
import { parseProceduresRows } from './proceduresParser.js';

const ALLOWED_METHODS = 'GET, OPTIONS';

const parseAllowedOrigins = () =>
  (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const isOriginAllowed = (req, origin) => {
  if (!origin) return true;

  const allowedOrigins = parseAllowedOrigins();
  if (allowedOrigins.includes(origin)) {
    return true;
  }

  try {
    const originHost = new URL(origin).host;
    return originHost === req.headers.host;
  } catch {
    return false;
  }
};

const applyCors = (req, res) => {
  const origin = req.headers.origin;
  if (!origin || !isOriginAllowed(req, origin)) {
    return;
  }

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', ALLOWED_METHODS);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ALLOWED_METHODS);
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
    return res.status(500).json({ error: 'Failed to fetch procedures data' });
  }
}
