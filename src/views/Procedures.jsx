'use client';
import React, { useMemo, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Drawer,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { useLanguage } from '../context/LanguageContext';
import { useProcedures } from '../lib/useProcedures';
import { SPECIALITY_META, getSpecialityMeta } from '../data/specialityMeta';
import ProcedureFilters from '../components/procedures/ProcedureFilters';
import ProcedureSearch from '../components/procedures/ProcedureSearch';
import SpecialitySection from '../components/procedures/SpecialitySection';

const Procedures = () => {
  const { language, t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSpecialities, setExpandedSpecialities] = useState(() => new Set());

  const {
    procedures,
    availableFilters,
    columnConfig,
    searchQuery,
    selectedFilters,
    handleSearch,
    handleFilterChange,
    clearFilters,
    filteredCount,
  } = useProcedures();

  const proceduresBySpeciality = useMemo(() => {
    const groups = new Map();
    for (const meta of SPECIALITY_META) {
      groups.set(meta.key, []);
    }
    for (const procedure of procedures) {
      const key = procedure.section_group;
      if (groups.has(key)) {
        groups.get(key).push(procedure);
      } else if (key) {
        groups.set(key, [procedure]);
      }
    }
    return groups;
  }, [procedures]);

  const isUserSearchingOrFiltering = Boolean(
    searchQuery || Object.keys(selectedFilters).length > 0
  );

  const visibleSpecialities = useMemo(() => {
    return SPECIALITY_META.map((meta) => {
      const list = proceduresBySpeciality.get(meta.key) || [];
      return { meta, procedures: list };
    }).filter(({ procedures: list }) => list.length > 0);
  }, [proceduresBySpeciality]);

  const toggleSpeciality = (key) => {
    setExpandedSpecialities((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleDrawerToggle = () => {
    setMobileFiltersOpen((prev) => !prev);
  };

  const isSpecialityExpanded = (key) =>
    isUserSearchingOrFiltering ? true : expandedSpecialities.has(key);

  const renderFilterSidebar = () => (
    <Box sx={{ p: 2 }}>
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      <ProcedureFilters
        availableFilters={availableFilters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        columnConfig={columnConfig}
      />
    </Box>
  );

  const resultsLabel = useMemo(() => {
    const template =
      t('proceduresPage.showingResults') ||
      (language === 'es' ? 'Mostrando {count} resultados' : 'Showing {count} results');
    return template.replace('{count}', String(filteredCount));
  }, [filteredCount, language, t]);

  const noResultsLabel =
    t('proceduresPage.noResults') ||
    (language === 'es'
      ? 'No se encontraron procedimientos que coincidan con sus criterios.'
      : 'No procedures found matching your criteria.');

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: 'background.default', minHeight: '80vh' }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 3 }}>
          <ProcedureSearch onSearch={handleSearch} initialValue={searchQuery} />
        </Box>

        {isMobile && (
          <Box sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleDrawerToggle}
              fullWidth
            >
              {t('proceduresPage.filters') || 'Filters'}
            </Button>
          </Box>
        )}

        <Grid container spacing={3}>
          {!isMobile && (
            <Grid size={{ md: 3 }}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  position: 'sticky',
                  top: 100,
                  maxHeight: 'calc(100vh - 120px)',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                }}
              >
                {renderFilterSidebar()}
              </Box>
            </Grid>
          )}

          <Drawer
            anchor="left"
            open={mobileFiltersOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            PaperProps={{ sx: { width: 300 } }}
          >
            {renderFilterSidebar()}
          </Drawer>

          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {resultsLabel}
            </Typography>

            {visibleSpecialities.length === 0 ? (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  bgcolor: 'background.paper',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {noResultsLabel}
                </Typography>
                <Button variant="text" onClick={clearFilters}>
                  {t('proceduresPage.clearAll') || 'Clear all filters'}
                </Button>
              </Box>
            ) : (
              <Stack spacing={2}>
                {visibleSpecialities.map(({ meta, procedures: list }) => {
                  const fullMeta = {
                    ...getSpecialityMeta(meta.key),
                    description: meta.description?.[language] || meta.description?.en || '',
                  };
                  return (
                    <SpecialitySection
                      key={meta.key}
                      speciality={fullMeta}
                      procedures={list}
                      expanded={isSpecialityExpanded(meta.key)}
                      onToggle={() => toggleSpeciality(meta.key)}
                      countLabel={(count) =>
                        language === 'es'
                          ? `${count} procedimiento${count === 1 ? '' : 's'}`
                          : `${count} procedure${count === 1 ? '' : 's'}`
                      }
                    />
                  );
                })}
              </Stack>
            )}
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 6,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            href="/estimate"
            sx={{ px: 4, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
          >
            {t('navbar.freeEstimate')}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={Link}
            href="/schedule"
            sx={{ px: 4, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
          >
            {t('navbar.schedule')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Procedures;
