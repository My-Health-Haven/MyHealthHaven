import { useState, useMemo } from 'react';
import {
  PROCEDURES_VISIBLE,
  PROCEDURES_FILTERS,
  PROCEDURES_COLUMN_CONFIG,
} from '../data/procedures';

const LEGACY_SEARCH_FIELDS = [
  'procedure_name',
  'short_description',
  'care_type',
  'section_group',
  'section',
  'tags',
];

export const useProcedures = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});

  const searchColumns = useMemo(() => {
    const columnConfigEntries = Object.entries(PROCEDURES_COLUMN_CONFIG);
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

  const filteredProcedures = useMemo(() => {
    return PROCEDURES_VISIBLE.filter((procedure) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = searchColumns.some((column) => {
          const value = procedure[column];
          if (Array.isArray(value)) {
            return value.join(' ').toLowerCase().includes(query);
          }
          return String(value || '').toLowerCase().includes(query);
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
          return itemValue.some((value) => selectedOptions.includes(value));
        }

        return selectedOptions.includes(itemValue);
      });
    });
  }, [searchColumns, searchQuery, selectedFilters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (category, value) => {
    setSelectedFilters((prev) => {
      const current = prev[category] || [];
      const isSelected = current.includes(value);

      const newValues = isSelected
        ? current.filter((v) => v !== value)
        : [...current, value];

      if (newValues.length === 0) {
        const { [category]: _unused, ...rest } = prev;
        return rest;
      }

      return { ...prev, [category]: newValues };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setSearchQuery('');
  };

  return {
    procedures: filteredProcedures,
    availableFilters: PROCEDURES_FILTERS,
    columnConfig: PROCEDURES_COLUMN_CONFIG,
    validationWarnings: [],
    loading: false,
    error: null,
    searchQuery,
    selectedFilters,
    handleSearch,
    handleFilterChange,
    clearFilters,
    totalCount: PROCEDURES_VISIBLE.length,
    filteredCount: filteredProcedures.length,
  };
};
