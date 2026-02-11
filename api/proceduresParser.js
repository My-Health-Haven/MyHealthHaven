const REQUIRED_COLUMNS = ['procedure_id', 'procedure_name'];
const NON_FILTER_COLUMNS = new Set([
  'procedure_id',
  'procedure_name',
  'short_description',
  'visible',
  'sort_order',
]);

export const normalizeHeader = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^\w]+/g, '_')
    .replace(/^_+|_+$/g, '');

export const findHeaderRowIndex = (rows) => {
  if (!Array.isArray(rows)) {
    return -1;
  }

  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    if (!Array.isArray(row) || row.length === 0) {
      continue;
    }

    const normalizedHeaders = row.map(normalizeHeader).filter(Boolean);
    if (normalizedHeaders.length === 0) {
      continue;
    }

    const hasRequiredColumns = REQUIRED_COLUMNS.every((column) =>
      normalizedHeaders.includes(column)
    );

    if (hasRequiredColumns) {
      return index;
    }
  }

  return -1;
};

const parseTags = (value) =>
  value
    ? value
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

const parseSortOrder = (value) => {
  if (!value) {
    return 999;
  }

  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 999;
};

const parseVisible = (value) => {
  if (!value) {
    return true;
  }

  const normalized = value.trim().toUpperCase();
  if (['FALSE', 'NO', '0', 'N'].includes(normalized)) {
    return false;
  }

  if (['TRUE', 'YES', '1', 'Y'].includes(normalized)) {
    return true;
  }

  return true;
};

const normalizeProcedureShape = (procedure) => {
  const normalized = { ...procedure };

  // Backwards-compatible aliases for the current UI card/search fields.
  if (!normalized.top_category && normalized.procedure_category) {
    normalized.top_category = normalized.procedure_category;
  }
  if (!normalized.group_bucket && normalized.complexity) {
    normalized.group_bucket = normalized.complexity;
  }
  if (!normalized.section && normalized.service_line) {
    normalized.section = normalized.service_line;
  }

  return normalized;
};

const uniqueSorted = (values) =>
  [...new Set(values)].sort((a, b) => String(a).localeCompare(String(b)));

const uniqueInOrder = (values) => {
  const seen = new Set();
  const result = [];

  values.forEach((value) => {
    const normalized = String(value);
    if (!seen.has(normalized)) {
      seen.add(normalized);
      result.push(value);
    }
  });

  return result;
};

export const parseProceduresRows = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) {
    return { procedures: [], filters: {} };
  }

  const headerRowIndex = findHeaderRowIndex(rows);
  if (headerRowIndex === -1) {
    throw new Error(
      'Could not locate a valid header row. Required columns: procedure_id, procedure_name.'
    );
  }

  const headers = rows[headerRowIndex].map(normalizeHeader);
  const activeHeaderIndexes = headers
    .map((header, index) => (header ? index : -1))
    .filter((index) => index >= 0);

  const procedures = rows
    .slice(headerRowIndex + 1)
    .map((row) => {
      if (!Array.isArray(row) || row.length === 0) {
        return null;
      }

      const procedure = {};
      activeHeaderIndexes.forEach((index) => {
        const header = headers[index];
        const rawValue = row[index];
        const value = rawValue === undefined || rawValue === null ? '' : String(rawValue).trim();

        if (header === 'tags') {
          procedure[header] = parseTags(value);
          return;
        }

        if (header === 'sort_order') {
          procedure[header] = parseSortOrder(value);
          return;
        }

        if (header === 'visible') {
          procedure[header] = parseVisible(value);
          return;
        }

        procedure[header] = value;
      });

      return normalizeProcedureShape(procedure);
    })
    .filter(Boolean)
    .filter((procedure) => procedure.visible !== false)
    .filter((procedure) => procedure.procedure_id && procedure.procedure_name)
    .sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999));

  const seenFilterKeys = new Set();
  const filterKeys = headers.filter((header) => {
    if (!header || NON_FILTER_COLUMNS.has(header) || seenFilterKeys.has(header)) {
      return false;
    }
    seenFilterKeys.add(header);
    return true;
  });

  const filters = {};
  filterKeys.forEach((key) => {
    if (key === 'tags') {
      const tagValues = procedures
        .flatMap((procedure) => (Array.isArray(procedure.tags) ? procedure.tags : []))
        .filter(Boolean);

      if (tagValues.length > 0) {
        filters[key] = uniqueSorted(tagValues);
      }
      return;
    }

    const values = procedures.map((procedure) => procedure[key]).filter(Boolean);
    if (values.length > 0) {
      filters[key] = uniqueInOrder(values);
    }
  });

  return { procedures, filters };
};
