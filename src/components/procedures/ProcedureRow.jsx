import React from 'react';
import Link from 'next/link';
import { Box, Typography, Chip, Stack } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useLanguage } from '../../context/LanguageContext';

const COMPLEXITY_COLORS = {
  high: '#EF4444',
  moderate: '#F59E0B',
  low: '#22C55E',
  minimal: '#86EFAC',
};

const COMPLEXITY_LABELS = {
  high: { en: 'High Complexity', es: 'Alta complejidad' },
  moderate: { en: 'Moderate', es: 'Moderada' },
  low: { en: 'Low', es: 'Baja' },
  minimal: { en: 'Minimal', es: 'Mínima' },
};

const classifyComplexity = (bucket) => {
  const key = String(bucket || '').trim().toLowerCase();
  if (!key || key === 'n/a' || key === 'na') return null;
  if (key.includes('high')) return 'high';
  if (key.includes('moderate')) return 'moderate';
  if (key.includes('minimal')) return 'minimal';
  if (key.includes('low') || key.includes('minor')) return 'low';
  return null;
};

const ProcedureRow = ({ procedure }) => {
  const { language } = useLanguage();
  const { procedure_id, procedure_name, group_bucket, tags } = procedure;
  const tagList = Array.isArray(tags) ? tags : [];
  const complexityKey = classifyComplexity(group_bucket);
  const complexityColor = complexityKey ? COMPLEXITY_COLORS[complexityKey] : null;
  const complexityLabel = complexityKey
    ? COMPLEXITY_LABELS[complexityKey][language] || COMPLEXITY_LABELS[complexityKey].en
    : String(group_bucket || '').trim();

  return (
    <Box
      component={Link}
      href={`/procedures/${procedure_id}`}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr auto', md: '1.4fr 1fr 1.6fr auto' },
        alignItems: 'center',
        columnGap: 2,
        rowGap: 1,
        px: { xs: 2, md: 3 },
        py: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'background-color 0.15s ease',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      <Typography
        variant="body1"
        fontWeight={600}
        color="text.primary"
        sx={{ gridColumn: { xs: '1', md: '1' } }}
      >
        {procedure_name}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          gridColumn: { xs: '1 / -1', md: '2' },
          order: { xs: 2, md: 0 },
        }}
      >
        {complexityColor && (
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: complexityColor,
              flexShrink: 0,
            }}
          />
        )}
        {complexityLabel && (
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {complexityLabel}
          </Typography>
        )}
      </Box>

      {tagList.length > 0 && (
        <Stack
          direction="row"
          spacing={0.75}
          useFlexGap
          flexWrap="wrap"
          sx={{
            gridColumn: { xs: '1 / -1', md: '3' },
            order: { xs: 3, md: 0 },
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
          }}
        >
          {tagList.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                height: 24,
                fontSize: '0.75rem',
                fontWeight: 500,
                bgcolor: 'grey.100',
                color: 'text.secondary',
                borderRadius: 1.5,
              }}
            />
          ))}
        </Stack>
      )}

      <Box
        sx={{
          gridColumn: { xs: '2', md: '4' },
          gridRow: { xs: '1', md: 'auto' },
          color: 'text.disabled',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <ChevronRightIcon fontSize="small" />
      </Box>
    </Box>
  );
};

export default ProcedureRow;
