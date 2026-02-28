const REQUIRED_COLUMNS = ['procedure_id', 'procedure_name'];
const INTERNAL_COLUMNS = new Set([
  'procedure_id',
  'procedure_name',
  'short_description',
  'visible',
  'sort_order',
]);
const COLUMN_ALIASES = {
  procedure_category: 'top_category',
  complexity: 'group_bucket',
  service_line: 'section',
};
const LABEL_ROW_MARKERS = new Set(['labels', '__labels__', 'label_row']);
const DEFAULT_SEARCHABLE_COLUMNS = new Set([
  'procedure_name',
  'short_description',
  'care_type',
  'section_group',
  'section',
  'tags',
]);
const DEFAULT_CARD_DISPLAY_COLUMNS = new Set(['price_note']);
const DEFAULT_MAX_LENGTH = 180;
const DEFAULT_MAX_LENGTH_BY_COLUMN = {
  procedure_id: 64,
  procedure_name: 180,
  short_description: 500,
  top_category: 80,
  group_bucket: 80,
  care_type: 80,
  section_group: 120,
  section: 120,
  tags: 200,
  price_note: 80,
};
const ALLOWED_BEHAVIORS = new Set(['filter-only', 'card-display', 'searchable', 'hidden']);
const TRUE_VALUES = new Set(['true', 'yes', '1', 'y']);
const FALSE_VALUES = new Set(['false', 'no', '0', 'n']);
const STRICT_NUMBER_PATTERN = /^[-+]?(?:\d+\.?\d*|\.\d+)$/;
const META_COLUMN_ALIASES = {
  columnKey: ['column_key', 'column', 'key', 'field', 'column_name'],
  label: ['label', 'display_label', 'filter_label'],
  behavior: ['behavior', 'mode', 'display_mode'],
  searchable: ['searchable', 'include_in_search', 'search'],
  cardLabel: ['card_label', 'card_display_label'],
  cardOrder: ['card_order', 'display_order'],
  maxLength: ['max_length', 'maxlength', 'character_limit'],
};
const HUMAN_LABEL_OVERRIDES = {
  top_category: 'Category',
  group_bucket: 'Complexity',
  care_type: 'Type',
  section_group: 'Speciality',
  section: 'Procedure Type',
  tags: 'Purpose',
  visible: 'Visible',
  sort_order: 'Sort Order',
  price_note: 'Price',
};

export const normalizeHeader = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^\w]+/g, '_')
    .replace(/^_+|_+$/g, '');

const canonicalizeColumnKey = (key) => COLUMN_ALIASES[key] || key;

const humanizeHeader = (key) =>
  HUMAN_LABEL_OVERRIDES[key] ||
  key
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const stripControlCharacters = (value) =>
  [...String(value ?? '')]
    .filter((character) => {
      const code = character.charCodeAt(0);
      return code >= 32 && code !== 127;
    })
    .join('');

const sanitizeText = (value, maxLength = DEFAULT_MAX_LENGTH) => {
  const raw = stripControlCharacters(value).trim();

  if (!Number.isFinite(maxLength) || maxLength <= 0) {
    return { value: raw, truncated: false };
  }

  if (raw.length <= maxLength) {
    return { value: raw, truncated: false };
  }

  return { value: raw.slice(0, maxLength), truncated: true };
};

const parseOptionalBoolean = (value) => {
  const raw = String(value ?? '').trim();
  if (!raw) return undefined;

  const normalized = raw.toLowerCase();
  if (TRUE_VALUES.has(normalized)) return true;
  if (FALSE_VALUES.has(normalized)) return false;
  return undefined;
};

const parseVisible = (value) => {
  const raw = String(value ?? '').trim();
  if (!raw) return { value: true, valid: true };

  const normalized = raw.toLowerCase();
  if (TRUE_VALUES.has(normalized)) return { value: true, valid: true };
  if (FALSE_VALUES.has(normalized)) return { value: false, valid: true };

  return { value: true, valid: false };
};

const parseSortOrder = (value) => {
  const raw = String(value ?? '').trim();
  if (!raw) return { value: 999, valid: true };

  if (!STRICT_NUMBER_PATTERN.test(raw)) {
    return { value: 999, valid: false };
  }

  const parsed = Number.parseFloat(raw);
  if (Number.isFinite(parsed)) return { value: parsed, valid: true };

  return { value: 999, valid: false };
};

const parseTags = (value, maxLength) =>
  value
    ? [...new Set(
        String(value)
          .split(',')
          .map((tag) => sanitizeText(tag, maxLength).value)
          .filter(Boolean)
      )]
    : [];

const normalizeBehavior = (value) => {
  const normalized = normalizeHeader(value);
  if (!normalized || normalized === 'auto') return 'auto';
  if (['filter_only', 'filter', 'filters'].includes(normalized)) return 'filter-only';
  if (['card_display', 'card_only', 'card', 'display'].includes(normalized)) return 'card-display';
  if (['searchable', 'search_only', 'search'].includes(normalized)) return 'searchable';
  if (['hidden', 'hide', 'none', 'internal'].includes(normalized)) return 'hidden';
  return null;
};

const parsePositiveInteger = (value) => {
  const parsed = Number.parseInt(String(value ?? '').trim(), 10);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }
  return parsed;
};

const findColumnIndexByAliases = (headers, aliases) => {
  for (let i = 0; i < headers.length; i += 1) {
    if (aliases.includes(headers[i])) return i;
  }
  return -1;
};

const findMetaHeaderRowIndex = (rows) => {
  if (!Array.isArray(rows)) return -1;

  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    if (!Array.isArray(row) || row.length === 0) continue;

    const normalizedHeaders = row.map(normalizeHeader).filter(Boolean);
    if (normalizedHeaders.length === 0) continue;

    const hasColumnKey = META_COLUMN_ALIASES.columnKey.some((alias) =>
      normalizedHeaders.includes(alias)
    );
    if (hasColumnKey) return index;
  }

  return -1;
};

export const parseColumnMetaRows = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return {};

  const headerRowIndex = findMetaHeaderRowIndex(rows);
  if (headerRowIndex === -1) return {};

  const headers = rows[headerRowIndex].map(normalizeHeader);
  const columnKeyIndex = findColumnIndexByAliases(headers, META_COLUMN_ALIASES.columnKey);
  if (columnKeyIndex === -1) return {};

  const labelIndex = findColumnIndexByAliases(headers, META_COLUMN_ALIASES.label);
  const behaviorIndex = findColumnIndexByAliases(headers, META_COLUMN_ALIASES.behavior);
  const searchableIndex = findColumnIndexByAliases(headers, META_COLUMN_ALIASES.searchable);
  const cardLabelIndex = findColumnIndexByAliases(headers, META_COLUMN_ALIASES.cardLabel);
  const cardOrderIndex = findColumnIndexByAliases(headers, META_COLUMN_ALIASES.cardOrder);
  const maxLengthIndex = findColumnIndexByAliases(headers, META_COLUMN_ALIASES.maxLength);

  const metadataByColumn = {};

  rows.slice(headerRowIndex + 1).forEach((row) => {
    if (!Array.isArray(row) || row.length === 0) return;

    const key = canonicalizeColumnKey(normalizeHeader(row[columnKeyIndex]));
    if (!key) return;

    const entry = {};

    if (labelIndex >= 0) {
      const labelValue = sanitizeText(row[labelIndex], 80).value;
      if (labelValue) entry.label = labelValue;
    }

    if (behaviorIndex >= 0) {
      const behaviorValue = normalizeBehavior(row[behaviorIndex]);
      if (behaviorValue) entry.behavior = behaviorValue;
    }

    if (searchableIndex >= 0) {
      const searchableValue = parseOptionalBoolean(row[searchableIndex]);
      if (typeof searchableValue === 'boolean') entry.searchable = searchableValue;
    }

    if (cardLabelIndex >= 0) {
      const cardLabelValue = sanitizeText(row[cardLabelIndex], 60).value;
      if (cardLabelValue) entry.cardLabel = cardLabelValue;
    }

    if (cardOrderIndex >= 0) {
      const cardOrderValue = parsePositiveInteger(row[cardOrderIndex]);
      if (typeof cardOrderValue === 'number') entry.cardOrder = cardOrderValue;
    }

    if (maxLengthIndex >= 0) {
      const maxLengthValue = parsePositiveInteger(row[maxLengthIndex]);
      if (typeof maxLengthValue === 'number') entry.maxLength = maxLengthValue;
    }

    metadataByColumn[key] = { ...metadataByColumn[key], ...entry };
  });

  return metadataByColumn;
};

export const findHeaderRowIndex = (rows) => {
  if (!Array.isArray(rows)) {
    return -1;
  }

  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    if (!Array.isArray(row) || row.length === 0) {
      continue;
    }

    const normalizedHeaders = row
      .map((value) => canonicalizeColumnKey(normalizeHeader(value)))
      .filter(Boolean);
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

const looksLikeLabelRow = (row, activeHeaders) => {
  if (!Array.isArray(row) || row.length === 0) return false;

  const entries = activeHeaders
    .map(({ key, index }) => ({
      key,
      rawValue: row[index],
      normalized: normalizeHeader(row[index]),
      text: String(row[index] ?? '').trim(),
    }))
    .filter((entry) => entry.text);

  if (entries.length === 0) return false;

  if (LABEL_ROW_MARKERS.has(entries[0].normalized)) return true;

  const headerEchoCount = entries.filter((entry) => entry.normalized === entry.key).length;
  if (headerEchoCount >= 3) return true;

  const hasProcedureNameEcho = entries.some(
    (entry) => entry.key === 'procedure_name' && entry.normalized === 'procedure_name'
  );
  const hasVisibleEcho = entries.some(
    (entry) => entry.key === 'visible' && entry.normalized === 'visible'
  );
  const hasSortOrderEcho = entries.some(
    (entry) => entry.key === 'sort_order' && entry.normalized === 'sort_order'
  );

  return hasProcedureNameEcho && (hasVisibleEcho || hasSortOrderEcho);
};

const getDefaultBehavior = (key) => {
  if (INTERNAL_COLUMNS.has(key)) return 'hidden';
  if (DEFAULT_CARD_DISPLAY_COLUMNS.has(key)) return 'card-display';
  return 'filter-only';
};

const getDefaultMaxLength = (key) => DEFAULT_MAX_LENGTH_BY_COLUMN[key] || DEFAULT_MAX_LENGTH;

const buildColumnConfig = ({ activeHeaders, columnMeta }) => {
  const config = {};

  activeHeaders.forEach(({ key }, position) => {
    const meta = columnMeta[key] || {};

    let behavior = meta.behavior && meta.behavior !== 'auto' ? meta.behavior : getDefaultBehavior(key);
    if (!ALLOWED_BEHAVIORS.has(behavior)) {
      behavior = getDefaultBehavior(key);
    }

    let searchable =
      typeof meta.searchable === 'boolean' ? meta.searchable : DEFAULT_SEARCHABLE_COLUMNS.has(key);

    if (behavior === 'searchable') {
      behavior = 'hidden';
      searchable = true;
    }

    config[key] = {
      label: meta.label || humanizeHeader(key),
      behavior,
      searchable,
      cardLabel: meta.cardLabel || '',
      cardOrder: typeof meta.cardOrder === 'number' ? meta.cardOrder : position + 1,
      maxLength:
        typeof meta.maxLength === 'number' ? meta.maxLength : getDefaultMaxLength(key),
    };
  });

  return config;
};

const normalizeProcedureShape = (procedure) => {
  const normalized = { ...procedure };

  // Backwards-compatible aliases for legacy schemas.
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

export const parseProceduresRows = (rows, options = {}) => {
  if (!Array.isArray(rows) || rows.length === 0) {
    return { procedures: [], filters: {}, columnConfig: {}, validation: { warnings: [] } };
  }

  const warnings = [];
  const headerRowIndex = findHeaderRowIndex(rows);
  if (headerRowIndex === -1) {
    throw new Error(
      'Could not locate a valid header row. Required columns: procedure_id, procedure_name.'
    );
  }

  const headers = rows[headerRowIndex].map((header) => canonicalizeColumnKey(normalizeHeader(header)));
  const activeHeaders = [];
  const seenHeaders = new Set();

  headers.forEach((header, index) => {
    if (!header) return;
    if (seenHeaders.has(header)) {
      warnings.push(`Duplicate column "${header}" detected at header index ${index + 1}. Using first occurrence only.`);
      return;
    }

    seenHeaders.add(header);
    activeHeaders.push({ key: header, index });
  });

  const labelCandidateRow = rows[headerRowIndex + 1];
  const hasLabelRow = looksLikeLabelRow(labelCandidateRow, activeHeaders);
  const dataStartIndex = hasLabelRow ? headerRowIndex + 2 : headerRowIndex + 1;

  const columnMeta = parseColumnMetaRows(options.columnMetaRows);
  const columnConfig = buildColumnConfig({ activeHeaders, columnMeta });

  const seenProcedureIds = new Set();
  const procedures = [];

  for (let rowIndex = dataStartIndex; rowIndex < rows.length; rowIndex += 1) {
    const row = rows[rowIndex];
    const sourceRowNumber = rowIndex + 1;

    if (!Array.isArray(row) || row.length === 0) {
      continue;
    }

    const hasAnyValue = row.some((cell) => String(cell ?? '').trim());
    if (!hasAnyValue) continue;

    const procedure = {};

    activeHeaders.forEach(({ key, index }) => {
      const config = columnConfig[key] || {};
      const maxLength = config.maxLength || getDefaultMaxLength(key);
      const rawValue = row[index];

      if (key === 'tags') {
        procedure[key] = parseTags(rawValue, maxLength);
        return;
      }

      if (key === 'sort_order') {
        const parsed = parseSortOrder(rawValue);
        procedure[key] = parsed.value;
        if (!parsed.valid) {
          warnings.push(
            `Row ${sourceRowNumber}: invalid sort_order "${String(rawValue)}". Defaulted to 999.`
          );
        }
        return;
      }

      if (key === 'visible') {
        const parsed = parseVisible(rawValue);
        procedure[key] = parsed.value;
        if (!parsed.valid) {
          warnings.push(
            `Row ${sourceRowNumber}: invalid visible value "${String(rawValue)}". Defaulted to true.`
          );
        }
        return;
      }

      const sanitized = sanitizeText(rawValue, maxLength);
      if (sanitized.truncated) {
        warnings.push(`Row ${sourceRowNumber}: "${key}" exceeded ${maxLength} characters and was truncated.`);
      }
      procedure[key] = sanitized.value;
    });

    const normalizedProcedure = normalizeProcedureShape(procedure);

    if (!normalizedProcedure.procedure_id || !normalizedProcedure.procedure_name) {
      warnings.push(`Row ${sourceRowNumber}: skipped because required fields are missing.`);
      continue;
    }

    const dedupeKey = String(normalizedProcedure.procedure_id).toLowerCase();

    if (seenProcedureIds.has(dedupeKey)) {
      warnings.push(
        `Row ${sourceRowNumber}: duplicate procedure_id "${normalizedProcedure.procedure_id}" skipped.`
      );
      continue;
    }

    seenProcedureIds.add(dedupeKey);
    if (normalizedProcedure.visible === false) {
      continue;
    }

    procedures.push(normalizedProcedure);
  }

  procedures.sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999));

  const filterKeys = activeHeaders
    .map(({ key }) => key)
    .filter((key) => columnConfig[key]?.behavior === 'filter-only');

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

  return { procedures, filters, columnConfig, validation: { warnings } };
};
