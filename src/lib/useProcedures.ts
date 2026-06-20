import { useState, useMemo } from 'react';
import {
  PROCEDURES_VISIBLE,
  PROCEDURES_FILTERS,
  PROCEDURES_COLUMN_CONFIG,
} from '../data/procedures';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Procedure {
  procedure_id: string;
  procedure_name: string;
  section_group: string;
  description: string;
  visible: boolean;
  top_category?: string;
  section?: string;
  care_type?: string;
  short_description?: string;
  tags?: string[];
  sort_order?: number;
  [key: string]: unknown; // allow dynamic column access
}

export type SelectedFilters = Record<string, string[]>;

export interface UseProceduresReturn {
  procedures: Procedure[];
  availableFilters: Record<string, string[]>;
  columnConfig: Record<string, { searchable?: boolean }>;
  searchQuery: string;
  selectedFilters: SelectedFilters;
  handleSearch: (query: string) => void;
  handleFilterChange: (category: string, value: string) => void;
  clearFilters: () => void;
  totalCount: number;
  filteredCount: number;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

const LEGACY_SEARCH_FIELDS: string[] = [
  'procedure_name',
  'short_description',
  'care_type',
  'section_group',
  'section',
  'tags',
];

export const useProcedures = (): UseProceduresReturn => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});

  const searchColumns = useMemo<string[]>(() => {
    const columnConfigEntries = Object.entries(
      PROCEDURES_COLUMN_CONFIG as Record<string, { searchable?: boolean }>
    );
    const configuredColumns = columnConfigEntries
      .filter(([, config]) => config?.searchable)
      .map(([key]) => key);

    if (configuredColumns.length > 0) {
      return configuredColumns;
    }

    if (columnConfigEntries.length > 0) {
      return ['procedure_name'];
    }

    return LEGACY_SEARCH_FIELDS;
  }, []);

  const filteredProcedures = useMemo<Procedure[]>(() => {
    return (PROCEDURES_VISIBLE as Procedure[]).filter((procedure) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = searchColumns.some((column) => {
          const value = procedure[column];
          if (Array.isArray(value)) {
            return value.join(' ').toLowerCase().includes(query);
          }
          return String(value ?? '')
            .toLowerCase()
            .includes(query);
        });
        if (!matchesSearch) return false;
      }

      const filterCategories = Object.keys(selectedFilters);
      if (filterCategories.length === 0) return true;

      return filterCategories.every((category) => {
        const selectedOptions = selectedFilters[category];
        if (!selectedOptions || selectedOptions.length === 0) return true;

        const itemValue = procedure[category];
        if (!itemValue) return false;

        if (Array.isArray(itemValue)) {
          return (itemValue as string[]).some((value) => selectedOptions.includes(value));
        }

        return selectedOptions.includes(itemValue as string);
      });
    });
  }, [searchColumns, searchQuery, selectedFilters]);

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
  };

  const handleFilterChange = (category: string, value: string): void => {
    setSelectedFilters((prev) => {
      const current = prev[category] ?? [];
      const isSelected = current.includes(value);

      const newValues = isSelected ? current.filter((v) => v !== value) : [...current, value];

      if (newValues.length === 0) {
        const { [category]: _unused, ...rest } = prev;
        void _unused;
        return rest;
      }

      return { ...prev, [category]: newValues };
    });
  };

  const clearFilters = (): void => {
    setSelectedFilters({});
    setSearchQuery('');
  };

  return {
    procedures: filteredProcedures,
    availableFilters: PROCEDURES_FILTERS as Record<string, string[]>,
    columnConfig: PROCEDURES_COLUMN_CONFIG as Record<string, { searchable?: boolean }>,
    searchQuery,
    selectedFilters,
    handleSearch,
    handleFilterChange,
    clearFilters,
    totalCount: (PROCEDURES_VISIBLE as Procedure[]).length,
    filteredCount: filteredProcedures.length,
  };
};
