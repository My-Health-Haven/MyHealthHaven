import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useProcedures } from './useProcedures';

// Mock data
const MOCK_RESPONSE = {
  procedures: [
    {
      procedure_id: 'p1',
      procedure_name: 'Procedure A',
      top_category: 'Area 1',
      section: 'Category 1',
      tags: ['tag1'],
      visible: true,
      sort_order: 1
    },
    {
      procedure_id: 'p2',
      procedure_name: 'Procedure B',
      top_category: 'Area 2',
      section: 'Category 1',
      tags: ['tag2'],
      visible: true,
      sort_order: 2
    },
    {
      procedure_id: 'p3',
      procedure_name: 'Procedure C',
      top_category: 'Area 1',
      section: 'Category 2',
      tags: ['tag1', 'tag3'],
      visible: true,
      sort_order: 3
    }
  ],
  filters: {
    top_category: ['Area 1', 'Area 2'],
    section: ['Category 1', 'Category 2'],
    tags: ['tag1', 'tag2', 'tag3']
  }
};

describe('useProcedures Hook', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        headers: {
          get: (key) => (key.toLowerCase() === 'content-type' ? 'application/json' : null),
        },
        json: () => Promise.resolve(MOCK_RESPONSE),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch data on mount', async () => {
    const { result } = renderHook(() => useProcedures());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.procedures).toHaveLength(3);
    expect(result.current.availableFilters).toEqual(MOCK_RESPONSE.filters);
  });

  it('should filter by search query', async () => {
    const { result } = renderHook(() => useProcedures());
    
    await waitFor(() => expect(result.current.loading).toBe(false));

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

  it('should filter by category (OR logic within category)', async () => {
    const { result } = renderHook(() => useProcedures());
    
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.handleFilterChange('top_category', 'Area 1');
    });

    // Should match p1 and p3
    expect(result.current.procedures).toHaveLength(2);
    
    act(() => {
        result.current.handleFilterChange('top_category', 'Area 2');
    });
      
    // Should match p1, p2, p3 (Area 1 OR Area 2)
    expect(result.current.procedures).toHaveLength(3);
  });

  it('should filter across categories (AND logic)', async () => {
     const { result } = renderHook(() => useProcedures());
    
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.handleFilterChange('top_category', 'Area 1');
    });
    
    // p1, p3

    act(() => {
        result.current.handleFilterChange('section', 'Category 2');
    });

    // Area 1 AND Category 2 -> Only p3
    expect(result.current.procedures).toHaveLength(1);
    expect(result.current.procedures[0].procedure_id).toBe('p3');
  });

  it('should filter by tags when procedure tags are arrays', async () => {
    const { result } = renderHook(() => useProcedures());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.handleFilterChange('tags', 'tag1');
    });

    expect(result.current.procedures).toHaveLength(2);

    act(() => {
      result.current.handleFilterChange('tags', 'tag2');
    });

    // OR logic within tags category -> tag1 OR tag2
    expect(result.current.procedures).toHaveLength(3);
  });
});
