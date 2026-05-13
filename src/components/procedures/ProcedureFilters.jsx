import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Stack,
  Collapse,
  IconButton,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLanguage } from '../../context/LanguageContext';

const FILTER_PRIORITY = [
  'section_group',
  'top_category',
  'care_type',
  'group_bucket',
  'section',
  'tags',
];

const DEFAULT_EXPANDED = new Set(['section_group', 'top_category']);

const ProcedureFilters = ({
  availableFilters,
  selectedFilters,
  onFilterChange,
  onClearFilters,
  columnConfig = {},
}) => {
  const { t } = useLanguage();
  const [expandedGroups, setExpandedGroups] = useState(DEFAULT_EXPANDED);

  const orderedFilterEntries = useMemo(() => {
    const entries = Object.entries(availableFilters || {}).filter(
      ([, options]) => Array.isArray(options) && options.length > 0
    );

    const getPriority = (key) => {
      const index = FILTER_PRIORITY.indexOf(key);
      return index === -1 ? Number.MAX_SAFE_INTEGER : index;
    };

    return entries.sort((a, b) => {
      const priorityDiff = getPriority(a[0]) - getPriority(b[0]);
      if (priorityDiff !== 0) return priorityDiff;
      return a[0].localeCompare(b[0]);
    });
  }, [availableFilters]);

  const toggleGroup = (categoryKey) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(categoryKey)) {
        next.delete(categoryKey);
      } else {
        next.add(categoryKey);
      }
      return next;
    });
  };

  const renderFilterGroup = (categoryKey, options) => {
    const isExpanded = expandedGroups.has(categoryKey);
    const activeData = selectedFilters[categoryKey] || [];
    const isActive = activeData.length > 0;

    const title =
      columnConfig[categoryKey]?.label ||
      categoryKey
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
      <Box
        key={categoryKey}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          '&:last-of-type': { borderBottom: 'none' },
        }}
      >
        <Box
          role="button"
          tabIndex={0}
          onClick={() => toggleGroup(categoryKey)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              toggleGroup(categoryKey);
            }
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1.5,
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={700}
            color={isActive ? 'primary.main' : 'text.primary'}
          >
            {title}
            {isActive && (
              <Box
                component="span"
                sx={{ ml: 0.5, color: 'primary.main', fontWeight: 600 }}
              >
                ({activeData.length})
              </Box>
            )}
          </Typography>
          <IconButton
            size="small"
            tabIndex={-1}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            sx={{
              p: 0.5,
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          >
            <KeyboardArrowDownIcon fontSize="small" />
          </IconButton>
        </Box>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Stack spacing={0.25} sx={{ pb: 1.5 }}>
            {options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={activeData.includes(option)}
                    onChange={() => onFilterChange(categoryKey, option)}
                    size="small"
                    sx={{ py: 0.25 }}
                  />
                }
                label={
                  <Typography variant="body2" color="text.primary">
                    {option}
                  </Typography>
                }
                sx={{ ml: 0, mr: 0 }}
              />
            ))}
          </Stack>
        </Collapse>
      </Box>
    );
  };

  const hasActiveFilters = Object.keys(selectedFilters).length > 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon color="action" fontSize="small" />
          <Typography variant="h6" fontWeight={700}>
            {t('proceduresPage.filters') || 'Filters'}
          </Typography>
        </Box>

        {hasActiveFilters && (
          <Button
            size="small"
            color="primary"
            onClick={onClearFilters}
            sx={{ textTransform: 'none' }}
          >
            {t('proceduresPage.clearAll') || 'Clear all'}
          </Button>
        )}
      </Box>

      {orderedFilterEntries.map(([category, options]) =>
        renderFilterGroup(category, options)
      )}
    </Box>
  );
};

export default ProcedureFilters;
