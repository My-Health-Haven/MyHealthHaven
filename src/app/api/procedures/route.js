import { google } from 'googleapis';
import { parseProceduresRows } from '@/lib/proceduresParser';

const DEFAULT_CONFIG_SHEET_CANDIDATES = [
  'procedures_config',
  'procedure_config',
  'procedures_labels',
  'procedure_labels',
  'labels',
];

const normalizeSheetName = (value) => String(value || '').trim().toLowerCase();

const resolveSheetByName = (sheetTitles, requestedName) => {
  if (!requestedName) return null;
  const normalizedRequestedName = normalizeSheetName(requestedName);
  return (
    sheetTitles.find((title) => normalizeSheetName(title) === normalizedRequestedName) || null
  );
};

const escapeSheetTitle = (title) => `'${String(title).replace(/'/g, "''")}'`;
const buildSheetRange = (title) => escapeSheetTitle(title);

function corsHeaders(request) {
  const origin = request.headers.get('origin');
  if (!origin) return {};

  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  const host = request.headers.get('host');
  let allowed = false;

  if (allowedOrigins.includes(origin)) {
    allowed = true;
  } else {
    try {
      const originHost = new URL(origin).host;
      allowed = originHost === host;
    } catch {
      allowed = false;
    }
  }

  if (!allowed) return {};

  return {
    'Access-Control-Allow-Origin': origin,
    Vary: 'Origin',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function OPTIONS(request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function GET(request) {
  const cors = corsHeaders(request);

  if (!process.env.GOOGLE_SHEETS_CREDENTIALS || !process.env.GOOGLE_SHEET_ID) {
    console.error('Missing Google Sheet credentials or ID');
    return Response.json({ error: 'Server configuration error' }, { status: 500, headers: cors });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

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
      return Response.json(
        { procedures: [], filters: {}, columnConfig: {}, validation: { warnings: [] } },
        { headers: { ...cors, 'Cache-Control': 's-maxage=300, stale-while-revalidate' } }
      );
    }

    const { procedures, filters, columnConfig, validation } = parseProceduresRows(rows, {
      columnMetaRows: configRows,
    });

    return Response.json(
      { procedures, filters, columnConfig, validation },
      { headers: { ...cors, 'Cache-Control': 's-maxage=300, stale-while-revalidate' } }
    );
  } catch (error) {
    console.error('Error fetching procedures:', error);
    return Response.json(
      { error: 'Failed to fetch procedures data' },
      { status: 500, headers: cors }
    );
  }
}
