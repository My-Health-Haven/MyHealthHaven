import { describe, it, expect } from 'vitest';
import { findHeaderRowIndex, parseColumnMetaRows, parseProceduresRows } from './proceduresParser.js';

describe('proceduresParser', () => {
  it('finds header row even when metadata rows appear first', () => {
    const rows = [
      ['', '', 'MyHealth Haven'],
      [],
      [
        'procedure_id',
        'top_category',
        'group_bucket',
        'section',
        'procedure_name',
        'tags',
        'visible',
        'sort_order',
      ],
    ];

    expect(findHeaderRowIndex(rows)).toBe(2);
  });

  it('parses and filters procedures from rows with leading non-data rows', () => {
    const rows = [
      ['', '', 'Facilitated Procedures'],
      [],
      [
        'procedure_id',
        'top_category',
        'group_bucket',
        'section',
        'procedure_name',
        'tags',
        'visible',
        'sort_order',
      ],
      ['P-2', 'Medical', 'Low-Complexity', 'DENTAL', 'Whitening', 'Dental, Cosmetic', '1', '2.0'],
      ['P-1', 'Medical', 'High-Complexity', 'CARDIAC', 'Bypass', 'Cardiac, Major', 'YES', '1.0'],
      ['P-3', 'Medical', 'High-Complexity', 'CARDIAC', 'Hidden', 'Cardiac', '0', '3.0'],
    ];

    const result = parseProceduresRows(rows);

    expect(result.procedures).toHaveLength(2);
    expect(result.procedures[0].procedure_id).toBe('P-1');
    expect(result.procedures[1].procedure_id).toBe('P-2');
    expect(result.filters.top_category).toEqual(['Medical']);
    expect(result.filters.group_bucket).toEqual(['High-Complexity', 'Low-Complexity']);
    expect(result.filters.section).toEqual(['CARDIAC', 'DENTAL']);
    expect(result.filters.tags).toEqual(['Cardiac', 'Cosmetic', 'Dental', 'Major']);
  });

  it('ignores optional customer-label row directly below headers', () => {
    const rows = [
      [
        'procedure_id',
        'top_category',
        'group_bucket',
        'care_type',
        'section_group',
        'section',
        'procedure_name',
        'tags',
        'visible',
        'sort_order',
      ],
      ['MHH Item', 'Category', 'Complexity', 'Type', 'Speciality', 'Procedure Type', 'Procedure Name', 'Purpose', 'visible', 'sort_order'],
      ['P-1', 'Medical', 'High', 'Surgical', 'CARDIOVASCULAR', 'Major Surgery', 'CABG', 'Cardiac, Major', '1', '1'],
    ];

    const result = parseProceduresRows(rows);

    expect(result.procedures).toHaveLength(1);
    expect(result.procedures[0].procedure_id).toBe('P-1');
    expect(result.columnConfig.top_category.label).toBe('Category');
    expect(result.columnConfig.group_bucket.label).toBe('Complexity');
  });

  it('supports schema aliases used by the current UI', () => {
    const rows = [
      ['procedure_id', 'procedure_name', 'procedure_category', 'complexity', 'service_line', 'visible'],
      ['A-1', 'Procedure A', 'Cosmetic', 'Moderate', 'Dermatology', 'true'],
    ];

    const result = parseProceduresRows(rows);
    const [first] = result.procedures;

    expect(first.top_category).toBe('Cosmetic');
    expect(first.group_bucket).toBe('Moderate');
    expect(first.section).toBe('Dermatology');
  });

  it('keeps care_type and section_group as first-class filters', () => {
    const rows = [
      [
        'procedure_id',
        'top_category',
        'group_bucket',
        'care_type',
        'section_group',
        'section',
        'procedure_name',
        'tags',
        'visible',
        'sort_order',
      ],
      ['X-1', 'Medical Necessity', 'High', 'Surgical', 'CARDIOVASCULAR', 'Major Surgery', 'CABG', 'Cardiac, Major', '1', '1'],
      ['X-2', 'Medical Necessity', 'N/A', 'Diagnostic', 'IMAGING', 'General Diagnostics', 'Echocardiogram', 'Cardiac, Imaging', '1', '2'],
    ];

    const result = parseProceduresRows(rows);

    expect(result.filters.care_type).toEqual(['Surgical', 'Diagnostic']);
    expect(result.filters.section_group).toEqual(['CARDIOVASCULAR', 'IMAGING']);
    expect(result.filters.group_bucket).toEqual(['High', 'N/A']);
  });

  it('parses metadata sheet rows for labels and behavior', () => {
    const metaRows = [
      ['column_key', 'label', 'behavior', 'searchable', 'card_label', 'card_order', 'max_length'],
      ['top_category', 'Category', 'filter-only', 'false', '', '', '80'],
      ['price_note', 'Price', 'card-display', 'false', '', '1', '80'],
      ['internal_notes', 'Internal Notes', 'hidden', 'false', '', '', '40'],
    ];

    const metadata = parseColumnMetaRows(metaRows);

    expect(metadata.top_category).toEqual({
      label: 'Category',
      behavior: 'filter-only',
      searchable: false,
      maxLength: 80,
    });
    expect(metadata.price_note).toEqual({
      label: 'Price',
      behavior: 'card-display',
      searchable: false,
      cardOrder: 1,
      maxLength: 80,
    });
    expect(metadata.internal_notes).toEqual({
      label: 'Internal Notes',
      behavior: 'hidden',
      searchable: false,
      maxLength: 40,
    });
  });

  it('respects column behavior config and validates row values', () => {
    const rows = [
      ['procedure_id', 'procedure_name', 'top_category', 'price_note', 'visible', 'sort_order', 'tags'],
      ['P-1', 'CABG', 'Medical', 'From $13,500 USD', 'YES', 'A', 'Cardiac, Major'],
      ['P-2', 'Knee replacement', 'Orthopedic', '', 'MAYBE', '2', 'Orthopedic'],
      ['P-1', 'Duplicate', 'Orthopedic', '', '1', '3', 'Duplicate'],
    ];

    const columnMetaRows = [
      ['column_key', 'label', 'behavior', 'searchable'],
      ['top_category', 'Category', 'filter-only', 'false'],
      ['price_note', 'Price', 'card-display', 'false'],
    ];

    const result = parseProceduresRows(rows, { columnMetaRows });

    expect(result.procedures).toHaveLength(2);
    expect(result.filters.top_category).toEqual(['Orthopedic', 'Medical']);
    expect(result.filters.price_note).toBeUndefined();
    expect(result.columnConfig.price_note.behavior).toBe('card-display');
    expect(result.procedures.find((item) => item.procedure_id === 'P-1')?.sort_order).toBe(999);
    expect(result.procedures.find((item) => item.procedure_id === 'P-2')?.visible).toBe(true);
    expect(result.validation.warnings.length).toBeGreaterThanOrEqual(2);
  });

  it('throws when required headers are missing', () => {
    const rows = [['top_category', 'procedure_name'], ['Medical', 'Bypass']];
    expect(() => parseProceduresRows(rows)).toThrow(/Could not locate a valid header row/i);
  });
});
