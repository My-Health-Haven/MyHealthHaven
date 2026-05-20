import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useProcedures } from './useProcedures';

vi.mock('../data/procedures', () => {
  const PROCEDURES_VISIBLE = [
    {
      procedure_id: 'p1',
      procedure_name: 'Procedure A',
      top_category: 'Area 1',
      section: 'Category 1',
      tags: ['tag1'],
      visible: true,
      sort_order: 1,
    },
    {
      procedure_id: 'p2',
      procedure_name: 'Procedure B',
      top_category: 'Area 2',
      section: 'Category 1',
      tags: ['tag2'],
      visible: true,
      sort_order: 2,
    },
    {
      procedure_id: 'p3',
      procedure_name: 'Procedure C',
      top_category: 'Area 1',
      section: 'Category 2',
      tags: ['tag1', 'tag3'],
      visible: true,
      sort_order: 3,
    },
  ];

  return {
    PROCEDURES: PROCEDURES_VISIBLE,
    PROCEDURES_VISIBLE,
    PROCEDURES_FILTERS: {
      top_category: ['Area 1', 'Area 2'],
      section: ['Category 1', 'Category 2'],
      tags: ['tag1', 'tag2', 'tag3'],
    },
    PROCEDURES_COLUMN_CONFIG: {
      procedure_name: { searchable: true },
      top_category: { searchable: false },
      section: { searchable: true },
      tags: { searchable: true },
    },
  };
});

describe('useProcedures Hook', () => {
  it('exposes all visible procedures synchronously', () => {
    const { result } = renderHook(() => useProcedures());

    expect(result.current.procedures).toHaveLength(3);
    expect(result.current.availableFilters.top_category).toEqual(['Area 1', 'Area 2']);
  });

  it('filters by search query', () => {
    const { result } = renderHook(() => useProcedures());

    act(() => {
      result.current.handleSearch('Procedure A');
    });

    expect(result.current.procedures).toHaveLength(1);
    expect(result.current.procedures[0].procedure_name).toBe('Procedure A');

    act(() => {
      result.current.handleSearch('tag3');
    });
    expect(result.current.procedures).toHaveLength(1);
    expect(result.current.procedures[0].procedure_name).toBe('Procedure C');
  });

  it('filters by category (OR logic within category)', () => {
    const { result } = renderHook(() => useProcedures());

    act(() => {
      result.current.handleFilterChange('top_category', 'Area 1');
    });
    expect(result.current.procedures).toHaveLength(2);

    act(() => {
      result.current.handleFilterChange('top_category', 'Area 2');
    });
    expect(result.current.procedures).toHaveLength(3);
  });

  it('filters across categories (AND logic)', () => {
    const { result } = renderHook(() => useProcedures());

    act(() => {
      result.current.handleFilterChange('top_category', 'Area 1');
    });

    act(() => {
      result.current.handleFilterChange('section', 'Category 2');
    });

    expect(result.current.procedures).toHaveLength(1);
    expect(result.current.procedures[0].procedure_id).toBe('p3');
  });

  it('filters by tags when procedure tags are arrays', () => {
    const { result } = renderHook(() => useProcedures());

    act(() => {
      result.current.handleFilterChange('tags', 'tag1');
    });
    expect(result.current.procedures).toHaveLength(2);

    act(() => {
      result.current.handleFilterChange('tags', 'tag2');
    });
    expect(result.current.procedures).toHaveLength(3);
  });

  it('respects searchable column config when searching', () => {
    const { result } = renderHook(() => useProcedures());

    // tag values should match since `tags` is configured as searchable
    act(() => {
      result.current.handleSearch('tag3');
    });
    expect(result.current.procedures).toHaveLength(1);

    // top_category is NOT searchable in the mocked config, so 'Area' should match nothing
    act(() => {
      result.current.handleSearch('Area');
    });
    expect(result.current.procedures).toHaveLength(0);
  });

  it('clearFilters resets search and filters', () => {
    const { result } = renderHook(() => useProcedures());

    act(() => {
      result.current.handleFilterChange('top_category', 'Area 1');
      result.current.handleSearch('Procedure');
    });

    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.procedures).toHaveLength(3);
    expect(result.current.searchQuery).toBe('');
    expect(result.current.selectedFilters).toEqual({});
  });
});
