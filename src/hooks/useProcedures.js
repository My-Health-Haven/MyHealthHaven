import { useState, useEffect, useMemo } from 'react';

// Mock data for development fallback
const MOCK_DATA = {
  procedures: [
    {
      procedure_id: 'MN-HC-001',
      top_category: 'Medical Necessity',
      group_bucket: 'High-Complexity',
      section: 'CARDIAC & MAJOR SURGERY',
      procedure_name: 'Heart bypass (CABG)',
      tags: ['Cardiac', 'Major Surgery'],
      visible: true,
      sort_order: 1,
    },
    {
      procedure_id: 'MN-HC-002',
      top_category: 'Medical Necessity',
      group_bucket: 'High-Complexity',
      section: 'CARDIAC & MAJOR SURGERY',
      procedure_name: 'Heart valve repair/replacement',
      tags: ['Cardiac', 'Valve'],
      visible: true,
      sort_order: 2,
    },
    {
      procedure_id: 'MN-MC-001',
      top_category: 'Medical Necessity',
      group_bucket: 'Moderate-Complexity',
      section: 'JOINT REPLACEMENTS',
      procedure_name: 'Knee replacement',
      tags: ['Orthopedic', 'Joint'],
      visible: true,
      sort_order: 3,
    },
    {
      procedure_id: 'MN-LC-001',
      top_category: 'Medical Necessity',
      group_bucket: 'Low-Complexity',
      section: 'MODERATE / MINOR SURGERY',
      procedure_name: 'ACL reconstruction',
      tags: ['Orthopedic', 'Minor'],
      visible: true,
      sort_order: 4,
    },
    {
      procedure_id: 'COS-001',
      top_category: 'Cosmetic',
      group_bucket: 'Plastic Surgery',
      section: 'BODY CONTOURING',
      procedure_name: 'Tummy tuck (abdominoplasty)',
      tags: ['Cosmetic', 'Body'],
      visible: true,
      sort_order: 5,
    },
  ],
  filters: {
    top_category: ['Medical Necessity', 'Cosmetic', 'Dental'],
    group_bucket: ['High-Complexity', 'Moderate-Complexity', 'Low-Complexity', 'Plastic Surgery'],
    section: [
      'CARDIAC & MAJOR SURGERY',
      'JOINT REPLACEMENTS',
      'MODERATE / MINOR SURGERY',
      'BODY CONTOURING',
    ],
  },
};

export const useProcedures = () => {
  const [data, setData] = useState({ procedures: [], filters: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    const fetchProcedures = async () => {
      try {
        setLoading(true);
        // Clean key cache to ensure we get fresh data if needed, though browser handles this
        const response = await fetch('/api/procedures');
        const contentType = response.headers.get('content-type');

        if (!response.ok || (contentType && !contentType.includes('application/json'))) {
          // If 404 or not JSON (likely local dev returning HTML), use mock data if we're in dev
          if (import.meta.env.DEV) {
            console.warn('API not available or returned non-JSON, using mock data for development');
            setData(MOCK_DATA);
            setLoading(false);
            return;
          }
          throw new Error('Failed to fetch procedures');
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Error in useProcedures:', err);
        // Fallback to mock data in dev even on error
        if (import.meta.env.DEV) {
          console.warn('Fetch error, using mock data for development');
          setData(MOCK_DATA);
          setError(null);
        } else {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProcedures();
  }, []);

  const filteredProcedures = useMemo(() => {
    if (!data.procedures) return [];

    return data.procedures.filter((procedure) => {
      // 1. Search Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchFields = [
          procedure.procedure_name,
          procedure.section, // Added section to search
          // Handle tags array or string
          Array.isArray(procedure.tags) ? procedure.tags.join(' ') : procedure.tags || '',
        ].map((f) => (f || '').toLowerCase());

        const matchesSearch = searchFields.some((field) => field.includes(query));
        if (!matchesSearch) return false;
      }

      // 2. Category Filters (OR within category, AND across categories)
      // selectedFilters format: { top_category: ['Medical Necessity'], section: ['CARDIAC...'] }

      const filterCategories = Object.keys(selectedFilters);
      if (filterCategories.length === 0) return true;

      return filterCategories.every((category) => {
        const selectedOptions = selectedFilters[category];
        if (!selectedOptions || selectedOptions.length === 0) return true;

        const itemValue = procedure[category];
        // If item has no value for this category but filter is active, it shouldn't match
        if (!itemValue) return false;

        // Check if item value is in the selected options
        return selectedOptions.includes(itemValue);
      });
    });
  }, [data.procedures, searchQuery, selectedFilters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (category, value) => {
    setSelectedFilters((prev) => {
      const current = prev[category] || [];
      const isSelected = current.includes(value);

      let newValues;
      if (isSelected) {
        newValues = current.filter((v) => v !== value);
      } else {
        newValues = [...current, value];
      }

      // If empty, remove the category key entirely
      if (newValues.length === 0) {
        const { [category]: unused, ...rest } = prev;
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
    availableFilters: data.filters,
    loading,
    error,
    searchQuery,
    selectedFilters,
    handleSearch,
    handleFilterChange,
    clearFilters,
    totalCount: data.procedures?.length || 0,
    filteredCount: filteredProcedures.length,
  };
};
