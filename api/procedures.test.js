import { describe, it, expect } from 'vitest';
import { buildSheetRange } from './procedures.js';

describe('procedures API helpers', () => {
  it('builds an unbounded sheet range instead of limiting columns', () => {
    expect(buildSheetRange('Tabla_1')).toBe("'Tabla_1'");
  });

  it('escapes single quotes in sheet names', () => {
    expect(buildSheetRange("Doctor's Data")).toBe("'Doctor''s Data'");
  });
});
