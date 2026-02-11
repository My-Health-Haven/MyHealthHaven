import React from 'react';
import { 
  Box, 
  Typography, 
  Checkbox, 
  FormControlLabel, 
  Button, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Stack 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLanguage } from '../../context/LanguageContext';

const ProcedureFilters = ({ availableFilters, selectedFilters, onFilterChange, onClearFilters }) => {
  const { t } = useLanguage();

  const renderFilterGroup = (categoryKey, options) => {
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
        defaultExpanded={true} 
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
          <Stack spacing={0.5}>
            {options.map((option) => (
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

      {Object.entries(availableFilters).map(([category, options]) => (
        renderFilterGroup(category, options)
      ))}
    </Box>
  );
};

export default ProcedureFilters;
