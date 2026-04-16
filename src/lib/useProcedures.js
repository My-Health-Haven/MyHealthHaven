import { useState, useEffect, useMemo } from 'react';

const PROCEDURES_CACHE_KEY = 'my-health-haven:procedures:v1';
const PROCEDURES_CACHE_TTL_MS = 5 * 60 * 1000;
let proceduresCacheEntry = null;
let proceduresRequestPromise = null;

// Mock data for development fallback
const MOCK_DATA = {
  procedures: [
    {
      procedure_id: 'MN-HC-001',
      top_category: 'Medical Necessity',
      group_bucket: 'High',
      care_type: 'Surgical',
      section_group: 'CARDIOVASCULAR',
      section: 'CARDIAC & MAJOR SURGERY',
      procedure_name: 'Heart bypass (CABG)',
      tags: ['Cardiac', 'Major Surgery'],
      visible: true,
      sort_order: 1,
      price_note: 'From $13,500 USD',
    },
    {
      procedure_id: 'MN-HC-002',
      top_category: 'Medical Necessity',
      group_bucket: 'High',
      care_type: 'Surgical',
      section_group: 'CARDIOVASCULAR',
      section: 'CARDIAC & MAJOR SURGERY',
      procedure_name: 'Heart valve repair/replacement',
      tags: ['Cardiac', 'Valve'],
      visible: true,
      sort_order: 2,
    },
    {
      procedure_id: 'MN-MC-001',
      top_category: 'Medical Necessity',
      group_bucket: 'Moderate',
      care_type: 'Surgical',
      section_group: 'ORTHOPEDIC',
      section: 'JOINT REPLACEMENTS',
      procedure_name: 'Knee replacement',
      tags: ['Orthopedic', 'Joint'],
      visible: true,
      sort_order: 3,
    },
    {
      procedure_id: 'MN-LC-001',
      top_category: 'Medical Necessity',
      group_bucket: 'Low',
      care_type: 'Surgical',
      section_group: 'ORTHOPEDIC',
      section: 'MODERATE / MINOR SURGERY',
      procedure_name: 'ACL reconstruction',
      tags: ['Orthopedic', 'Minor'],
      visible: true,
      sort_order: 4,
    },
    {
      procedure_id: 'COS-001',
      top_category: 'Cosmetic',
      group_bucket: 'Moderate',
      care_type: 'Surgical',
      section_group: 'BODY CONTOURING',
      section: 'BODY CONTOURING',
      procedure_name: 'Tummy tuck (abdominoplasty)',
      tags: ['Cosmetic', 'Body'],
      visible: true,
      sort_order: 5,
    },
  ],
  filters: {
    top_category: ['Medical Necessity', 'Cosmetic', 'Dental'],
    group_bucket: ['High', 'Moderate', 'Low', 'N/A'],
    care_type: ['Surgical', 'Diagnostic', 'Preventive'],
    section_group: ['CARDIOVASCULAR', 'ORTHOPEDIC', 'BODY CONTOURING'],
    section: [
      'CARDIAC & MAJOR SURGERY',
      'JOINT REPLACEMENTS',
      'MODERATE / MINOR SURGERY',
      'BODY CONTOURING',
    ],
    tags: [
      'Cardiac',
      'Major Surgery',
      'Valve',
      'Orthopedic',
      'Joint',
      'Minor',
      'Cosmetic',
      'Body',
    ],
  },
  columnConfig: {
    top_category: {
      label: 'Category',
      behavior: 'filter-only',
      searchable: false,
      cardLabel: '',
      cardOrder: 1,
      maxLength: 80,
    },
    group_bucket: {
      label: 'Complexity',
      behavior: 'filter-only',
      searchable: false,
      cardLabel: '',
      cardOrder: 2,
      maxLength: 80,
    },
    care_type: {
      label: 'Type',
      behavior: 'filter-only',
      searchable: true,
      cardLabel: '',
      cardOrder: 3,
      maxLength: 80,
    },
    section_group: {
      label: 'Speciality',
      behavior: 'filter-only',
      searchable: true,
      cardLabel: '',
      cardOrder: 4,
      maxLength: 120,
    },
    section: {
      label: 'Procedure Type',
      behavior: 'filter-only',
      searchable: true,
      cardLabel: '',
      cardOrder: 5,
      maxLength: 120,
    },
    tags: {
      label: 'Purpose',
      behavior: 'filter-only',
      searchable: true,
      cardLabel: '',
      cardOrder: 6,
      maxLength: 200,
    },
    price_note: {
      label: 'Price',
      behavior: 'card-display',
      searchable: false,
      cardLabel: '',
      cardOrder: 7,
      maxLength: 80,
    },
  },
  validation: { warnings: [] },
};

const LEGACY_SEARCH_FIELDS = [
  'procedure_name',
  'short_description',
  'care_type',
  'section_group',
  'section',
  'tags',
];

const normalizeProceduresPayload = (result = {}) => ({
  procedures: Array.isArray(result.procedures) ? result.procedures : [],
  filters: result.filters || {},
  columnConfig: result.columnConfig || {},
  validation: result.validation || { warnings: [] },
});

const getProceduresStorage = () => {
  if (typeof window === 'undefined') return null;

  try {
    const storage = window.localStorage;
    const hasStorageMethods =
      storage &&
      typeof storage.getItem === 'function' &&
      typeof storage.setItem === 'function' &&
      typeof storage.removeItem === 'function';

    return hasStorageMethods ? storage : null;
  } catch {
    return null;
  }
};

const isValidProceduresCacheEntry = (entry) =>
  !!entry &&
  typeof entry.updatedAt === 'number' &&
  entry.updatedAt > 0 &&
  entry.data &&
  Array.isArray(entry.data.procedures);

const isFreshProceduresCacheEntry = (entry) =>
  isValidProceduresCacheEntry(entry) && Date.now() - entry.updatedAt < PROCEDURES_CACHE_TTL_MS;

const readProceduresCacheEntry = () => {
  if (isValidProceduresCacheEntry(proceduresCacheEntry)) {
    return proceduresCacheEntry;
  }

  const storage = getProceduresStorage();
  if (!storage) return null;

  try {
    const rawValue = storage.getItem(PROCEDURES_CACHE_KEY);
    if (!rawValue) return null;

    const parsed = JSON.parse(rawValue);
    if (!isValidProceduresCacheEntry(parsed)) {
      storage.removeItem(PROCEDURES_CACHE_KEY);
      return null;
    }

    proceduresCacheEntry = parsed;
    return parsed;
  } catch {
    storage.removeItem(PROCEDURES_CACHE_KEY);
    return null;
  }
};

const writeProceduresCache = (payload) => {
  const normalizedPayload = normalizeProceduresPayload(payload);
  const nextEntry = {
    updatedAt: Date.now(),
    data: normalizedPayload,
  };

  proceduresCacheEntry = nextEntry;

  const storage = getProceduresStorage();
  if (storage) {
    try {
      storage.setItem(PROCEDURES_CACHE_KEY, JSON.stringify(nextEntry));
    } catch {
      // Ignore storage quota and privacy-mode failures.
    }
  }

  return normalizedPayload;
};

const getErrorMessageFromResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  let errorMessage = 'Failed to fetch procedures';

  if (contentType && contentType.includes('application/json')) {
    try {
      const errorData = await response.json();
      errorMessage = errorData.details || errorData.error || errorMessage;
    } catch {
      // Ignore invalid JSON and keep the default message.
    }
  }

  return errorMessage;
};

const getDevelopmentFallbackData = () => writeProceduresCache(MOCK_DATA);

const fetchProceduresData = async () => {
  if (proceduresRequestPromise) {
    return proceduresRequestPromise;
  }

  proceduresRequestPromise = (async () => {
    const response = await fetch('/api/procedures');

    if (!response.ok) {
      const errorMessage = await getErrorMessageFromResponse(response);

      if (process.env.NODE_ENV === 'development') {
        console.warn(`API Error (${errorMessage}), using mock data for development`);
        return getDevelopmentFallbackData();
      }

      throw new Error(errorMessage);
    }

    const result = await response.json();
    return writeProceduresCache(result);
  })().finally(() => {
    proceduresRequestPromise = null;
  });

  return proceduresRequestPromise;
};

export const prefetchProceduresData = async () => {
  const cacheEntry = readProceduresCacheEntry();

  if (isFreshProceduresCacheEntry(cacheEntry)) {
    return cacheEntry.data;
  }

  try {
    return await fetchProceduresData();
  } catch (error) {
    if (cacheEntry?.data) {
      return cacheEntry.data;
    }

    throw error;
  }
};

export const __resetProceduresCache = () => {
  proceduresCacheEntry = null;
  proceduresRequestPromise = null;

  const storage = getProceduresStorage();
  if (storage) {
    storage.removeItem(PROCEDURES_CACHE_KEY);
  }
};

export const useProcedures = () => {
  const [data, setData] = useState({
    procedures: [],
    filters: {},
    columnConfig: {},
    validation: { warnings: [] },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    let isMounted = true;

    const fetchProcedures = async () => {
      const cacheEntry = readProceduresCacheEntry();
      const cachedData = cacheEntry?.data || null;
      const cacheIsFresh = isFreshProceduresCacheEntry(cacheEntry);

      if (cachedData) {
        setData(cachedData);
        setError(null);
        setLoading(false);
      } else {
        setLoading(true);
      }

      if (cacheIsFresh) {
        return;
      }

      try {
        const nextData = await fetchProceduresData();

        if (!isMounted) return;

        setData(nextData);
        setError(null);
      } catch (err) {
        if (!isMounted) return;

        console.error('Error in useProcedures:', err);

        if (cachedData) {
          setError(null);
        } else if (process.env.NODE_ENV === 'development') {
          console.warn('Fetch error, using mock data for development');
          setData(getDevelopmentFallbackData());
          setError(null);
        } else {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProcedures();

    return () => {
      isMounted = false;
    };
  }, []);

  const searchColumns = useMemo(() => {
    const columnConfigEntries = Object.entries(data.columnConfig || {});
    const configuredColumns = columnConfigEntries
      .filter(([, config]) => config?.searchable)
      .map(([key]) => key);

    if (configuredColumns.length > 0) {
      return configuredColumns;
    }

    // If explicit column config exists but marks no searchable fields, keep
    // search scoped to the primary name instead of falling back to legacy columns.
    if (columnConfigEntries.length > 0) {
      return ['procedure_name'];
    }

    return LEGACY_SEARCH_FIELDS;
  }, [data.columnConfig]);

  const filteredProcedures = useMemo(() => {
    if (!data.procedures) return [];

    return data.procedures.filter((procedure) => {
      // 1. Search Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchFields = searchColumns.map((column) => {
          const value = procedure[column];
          if (Array.isArray(value)) {
            return value.join(' ').toLowerCase();
          }
          return String(value || '').toLowerCase();
        });

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

        if (Array.isArray(itemValue)) {
          return itemValue.some((value) => selectedOptions.includes(value));
        }

        // Check if item value is in the selected options
        return selectedOptions.includes(itemValue);
      });
    });
  }, [data.procedures, searchColumns, searchQuery, selectedFilters]);

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
    availableFilters: data.filters,
    columnConfig: data.columnConfig || {},
    validationWarnings: data.validation?.warnings || [],
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
