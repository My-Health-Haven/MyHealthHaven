'use client';
import React, { useMemo, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
} from '@mui/material';
import Link from 'next/link';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import { useLanguage } from '../context/LanguageContext';
import { useProcedures } from '../lib/useProcedures';
import { SPECIALITY_META, getSpecialityMeta } from '../data/specialityMeta';
import ProcedureSearch from '../components/procedures/ProcedureSearch';
import SpecialitySection from '../components/procedures/SpecialitySection';
import SpecialityCard from '../components/procedures/SpecialityCard';

const Procedures = () => {
  const { language, t } = useLanguage();
  const [expandedSpecialities, setExpandedSpecialities] = useState(() => new Set());
  const [viewMode, setViewMode] = useState('grid');

  const {
    procedures,
    searchQuery,
    selectedFilters,
    handleSearch,
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

  const handleViewModeChange = (_event, nextMode) => {
    if (nextMode) setViewMode(nextMode);
  };

  const isSpecialityExpanded = (key) =>
    isUserSearchingOrFiltering ? true : expandedSpecialities.has(key);

  const resultsLabel = useMemo(() => {
    const template =
      t('proceduresPage.showingResults') ||
      (language === 'es' ? 'Mostrando {count} procedimientos' : 'Showing {count} procedures');
    return template.replace('{count}', String(filteredCount));
  }, [filteredCount, language, t]);

  const noResultsLabel =
    t('proceduresPage.noResults') ||
    (language === 'es'
      ? 'No se encontraron procedimientos que coincidan con sus criterios.'
      : 'No procedures found matching your criteria.');

  const buildSpecialityMeta = (meta) => {
    const baseMeta = getSpecialityMeta(meta.key);
    return {
      ...baseMeta,
      displayName: meta.name?.[language] || meta.name?.en || meta.key,
      description: meta.description?.[language] || meta.description?.en || '',
    };
  };

  const countLabel = (count) =>
    language === 'es'
      ? `${count} procedimiento${count === 1 ? '' : 's'}`
      : `${count} procedure${count === 1 ? '' : 's'}`;

  const viewMoreLabel = (hidden) =>
    language === 'es'
      ? `Ver ${hidden} procedimiento${hidden === 1 ? '' : 's'} más`
      : `View ${hidden} more procedure${hidden === 1 ? '' : 's'}`;

  const viewLessLabel = language === 'es' ? 'Ver menos' : 'Show less';

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: 'background.default', minHeight: '80vh' }}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: { xs: '100%', md: 'clamp(1200px, 85vw, 2400px)' },
        }}
      >
        <Box sx={{ mb: 3 }}>
          <ProcedureSearch onSearch={handleSearch} initialValue={searchQuery} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {resultsLabel}
          </Typography>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            size="small"
            aria-label={language === 'es' ? 'Vista' : 'View mode'}
          >
            <ToggleButton value="list" aria-label={language === 'es' ? 'Lista' : 'List'}>
              <Tooltip title={language === 'es' ? 'Lista' : 'List'}>
                <ViewListRoundedIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="grid" aria-label={language === 'es' ? 'Cuadrícula' : 'Grid'}>
              <Tooltip title={language === 'es' ? 'Cuadrícula' : 'Grid'}>
                <GridViewRoundedIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

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
        ) : viewMode === 'list' ? (
          <Stack spacing={2}>
            {visibleSpecialities.map(({ meta, procedures: list }) => {
              const fullMeta = buildSpecialityMeta(meta);
              return (
                <SpecialitySection
                  key={meta.key}
                  speciality={fullMeta}
                  procedures={list}
                  expanded={isSpecialityExpanded(meta.key)}
                  onToggle={() => toggleSpeciality(meta.key)}
                  countLabel={countLabel}
                />
              );
            })}
          </Stack>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 2,
              alignItems: 'start',
            }}
          >
            {visibleSpecialities.map(({ meta, procedures: list }, index) => {
              const fullMeta = buildSpecialityMeta(meta);
              const isLastOddItem =
                index === visibleSpecialities.length - 1 &&
                visibleSpecialities.length % 2 === 1;
              return (
                <Box
                  key={meta.key}
                  sx={{
                    gridColumn: isLastOddItem ? { xs: '1', md: '1 / -1' } : 'auto',
                  }}
                >
                  <SpecialityCard
                    speciality={fullMeta}
                    procedures={list}
                    countLabel={countLabel}
                    viewMoreLabel={viewMoreLabel}
                    viewLessLabel={viewLessLabel}
                    wide={isLastOddItem}
                    forceShowAll={isUserSearchingOrFiltering}
                  />
                </Box>
              );
            })}
          </Box>
        )}

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
