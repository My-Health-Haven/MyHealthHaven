import React, { useMemo, useState } from 'react';
import { 
  Box, 
  Typography, 
  Checkbox, 
  FormControlLabel, 
  Button, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Stack,
  TextField
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLanguage } from '../../context/LanguageContext';

const FILTER_PRIORITY = [
  'top_category',
  'group_bucket',
  'care_type',
  'section_group',
  'section',
  'tags',
];
const GROUP_CONFIG = {
  care_type: { defaultExpanded: true, maxVisible: 8, searchable: false },
  section_group: { defaultExpanded: false, maxVisible: 8, searchable: true },
  section: { defaultExpanded: false, maxVisible: 10, searchable: true },
  tags: { defaultExpanded: false, maxVisible: 12, searchable: true },
  top_category: { defaultExpanded: true, maxVisible: 10, searchable: false },
  group_bucket: { defaultExpanded: true, maxVisible: 10, searchable: false },
};

const ProcedureFilters = ({ availableFilters, selectedFilters, onFilterChange, onClearFilters }) => {
  const { t } = useLanguage();
  const [optionSearch, setOptionSearch] = useState({});
  const [expandedOptions, setExpandedOptions] = useState({});

  const orderedFilterEntries = useMemo(() => {
    const entries = Object.entries(availableFilters || {});

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

  const renderFilterGroup = (categoryKey, options) => {
    if (!Array.isArray(options) || options.length === 0) {
      return null;
    }

    const config = GROUP_CONFIG[categoryKey] || {
      defaultExpanded: true,
      maxVisible: 10,
      searchable: false,
    };

    const query = (optionSearch[categoryKey] || '').trim().toLowerCase();
    const filteredOptions = query
      ? options.filter((option) => option.toLowerCase().includes(query))
      : options;

    const isExpanded = !!expandedOptions[categoryKey];
    const visibleOptions = isExpanded
      ? filteredOptions
      : filteredOptions.slice(0, config.maxVisible);
    const hiddenCount = Math.max(filteredOptions.length - visibleOptions.length, 0);

    // Format category title (e.g., 'medical_area' -> 'Medical Area')
    const title = categoryKey
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
      
    // Determine if this group has any active filters
    const activeData = selectedFilters[categoryKey] || [];
    const isActive = activeData.length > 0;

    return (
      <Accordion 
        key={categoryKey} 
        defaultExpanded={config.defaultExpanded} 
        disableGutters 
        elevation={0}
        sx={{ 
          '&:before': { display: 'none' }, // Remove default top border
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'transparent'
        }}
      >
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          sx={{ px: 0, minHeight: 48 }}
        >
          <Typography variant="subtitle1" fontWeight="bold" color={isActive ? "primary.main" : "text.primary"}>
            {title} {isActive && `(${activeData.length})`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
          {config.searchable && options.length > config.maxVisible && (
            <TextField
              size="small"
              fullWidth
              placeholder={`Search ${title.toLowerCase()}...`}
              value={optionSearch[categoryKey] || ''}
              onChange={(event) =>
                setOptionSearch((prev) => ({ ...prev, [categoryKey]: event.target.value }))
              }
              sx={{ mb: 1.5 }}
            />
          )}

          <Stack spacing={0.5}>
            {visibleOptions.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={activeData.includes(option)}
                    onChange={() => onFilterChange(categoryKey, option)}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    {option}
                  </Typography>
                }
                sx={{ ml: 0 }} // Remove default negative margin
              />
            ))}
          </Stack>

          {filteredOptions.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              No matches.
            </Typography>
          )}

          {hiddenCount > 0 && (
            <Button
              size="small"
              sx={{ mt: 1, textTransform: 'none' }}
              onClick={() =>
                setExpandedOptions((prev) => ({ ...prev, [categoryKey]: !prev[categoryKey] }))
              }
            >
              Show {hiddenCount} more
            </Button>
          )}

          {isExpanded && filteredOptions.length > config.maxVisible && (
            <Button
              size="small"
              sx={{ mt: 1, textTransform: 'none' }}
              onClick={() =>
                setExpandedOptions((prev) => ({ ...prev, [categoryKey]: false }))
              }
            >
              Show less
            </Button>
          )}
        </AccordionDetails>
      </Accordion>
    );
  };

  const hasActiveFilters = Object.keys(selectedFilters).length > 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon color="action" />
          <Typography variant="h6" fontWeight="bold">
            {t('proceduresPage.filters') || "Filters"}
          </Typography>
        </Box>
        
        {hasActiveFilters && (
          <Button 
            size="small" 
            color="primary" 
            onClick={onClearFilters}
            sx={{ textTransform: 'none' }}
          >
            {t('proceduresPage.clearAll') || "Clear all"}
          </Button>
        )}
      </Box>

      {orderedFilterEntries.map(([category, options]) => (
        renderFilterGroup(category, options)
      ))}
    </Box>
  );
};

export default ProcedureFilters;
