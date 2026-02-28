import { google } from 'googleapis';
import { parseProceduresRows } from './proceduresParser.js';

const ALLOWED_METHODS = 'GET, OPTIONS';
const DEFAULT_CONFIG_SHEET_CANDIDATES = [
  'procedures_config',
  'procedure_config',
  'procedures_labels',
  'procedure_labels',
  'labels',
];

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

const normalizeSheetName = (value) => String(value || '').trim().toLowerCase();

const resolveSheetByName = (sheetTitles, requestedName) => {
  if (!requestedName) return null;
  const normalizedRequestedName = normalizeSheetName(requestedName);
  return (
    sheetTitles.find((title) => normalizeSheetName(title) === normalizedRequestedName) || null
  );
};

const escapeSheetTitle = (title) => `'${String(title).replace(/'/g, "''")}'`;
export const buildSheetRange = (title) => escapeSheetTitle(title);

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

    const sheetTitles = (metaResponse.data.sheets || [])
      .map((sheet) => sheet?.properties?.title)
      .filter(Boolean);

    if (sheetTitles.length === 0) {
      throw new Error('No sheets found in the spreadsheet');
    }

    const configuredPrimaryTitle = process.env.GOOGLE_PROCEDURES_SHEET_NAME;
    const primarySheetTitle =
      resolveSheetByName(sheetTitles, configuredPrimaryTitle) || sheetTitles[0];

    if (configuredPrimaryTitle && !resolveSheetByName(sheetTitles, configuredPrimaryTitle)) {
      throw new Error(
        `Configured procedures sheet "${configuredPrimaryTitle}" was not found in the spreadsheet.`
      );
    }

    const configuredConfigTitle = process.env.GOOGLE_PROCEDURES_CONFIG_SHEET_NAME;
    let configSheetTitle = resolveSheetByName(sheetTitles, configuredConfigTitle);

    if (configuredConfigTitle && !configSheetTitle) {
      throw new Error(
        `Configured procedures config sheet "${configuredConfigTitle}" was not found in the spreadsheet.`
      );
    }

    if (!configSheetTitle) {
      const normalizedCandidates = new Set(DEFAULT_CONFIG_SHEET_CANDIDATES);
      configSheetTitle =
        sheetTitles.find((title) => normalizedCandidates.has(normalizeSheetName(title))) || null;
    }

    if (configSheetTitle === primarySheetTitle) {
      configSheetTitle = null;
    }

    // 2. Fetch the main procedures tab and optional config tab in one request.
    const ranges = [buildSheetRange(primarySheetTitle)];
    if (configSheetTitle) {
      ranges.push(buildSheetRange(configSheetTitle));
    }

    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges,
    });

    const valueRanges = response.data.valueRanges || [];
    const rows = valueRanges[0]?.values;
    const configRows = configSheetTitle ? valueRanges[1]?.values || [] : [];

    if (!rows || rows.length === 0) {
      return res
        .status(200)
        .json({ procedures: [], filters: {}, columnConfig: {}, validation: { warnings: [] } });
    }

    const { procedures, filters, columnConfig, validation } = parseProceduresRows(rows, {
      columnMetaRows: configRows,
    });

    // Cache for 5 minutes (300 seconds)
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

    return res.status(200).json({
      procedures,
      filters,
      columnConfig,
      validation,
    });
  } catch (error) {
    console.error('Error fetching procedures:', error);
    return res.status(500).json({ error: 'Failed to fetch procedures data' });
  }
}
