import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Stack } from '@mui/material';
import FadeIn from '../FadeIn';

const getComplexityColor = (bucket) => {
  if (!bucket) return 'default';
  const lower = bucket.toLowerCase();
  if (lower === 'n/a' || lower === 'na') return 'default';
  if (lower.includes('high')) return 'error';
  if (lower.includes('moderate')) return 'warning';
  if (lower.includes('low') || lower.includes('minor')) return 'success';
  return 'primary';
};

const ProcedureCard = ({ procedure, index = 0, columnConfig = {} }) => {
  const {
    procedure_name,
    section_group,
    section,
    care_type,
    top_category,
    group_bucket,
    tags
  } = procedure;

  // Normalize tags to array
  const tagList = Array.isArray(tags) 
    ? tags 
    : (tags ? tags.split(',').map(t => t.trim()) : []);

  const normalizedBucket = String(group_bucket || '').trim().toLowerCase();
  const hasComplexity = !!group_bucket && normalizedBucket !== 'n/a' && normalizedBucket !== 'na';
  const complexityColor = getComplexityColor(group_bucket);

  const cardDisplayItems = Object.entries(columnConfig || {})
    .filter(([, config]) => config?.behavior === 'card-display')
    .map(([key, config]) => {
      const rawValue = procedure[key];
      const value = Array.isArray(rawValue) ? rawValue.join(', ') : String(rawValue || '').trim();
      if (!value) return null;

      return {
        key,
        value,
        label: String(config.cardLabel || '').trim(),
        order: Number.isFinite(config.cardOrder) ? config.cardOrder : Number.MAX_SAFE_INTEGER,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order || a.key.localeCompare(b.key));

  return (
    <FadeIn delay={index * 50} style={{ height: '100%' }}>
      <Card 
        elevation={0}
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.6)',
          bgcolor: 'rgba(255, 255, 255, 0.5)', 
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s ease',
          '&:hover': { 
            transform: 'translateY(-4px)',
            borderColor: 'primary.main',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: (theme) => `0 12px 24px -10px ${theme.palette.primary.main}40`
          } 
        }}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
              {(section_group || section) && (
                <Typography 
                  variant="overline" 
                  sx={{ 
                    color: 'text.secondary', 
                    fontWeight: 700, 
                    fontSize: '0.7rem',
                    letterSpacing: 1,
                    lineHeight: 1
                  }}
                >
                  {[section_group, section].filter(Boolean).join(' - ')}
                </Typography>
              )}
              {top_category && (
                <Chip 
                  label={top_category} 
                  size="small" 
                  sx={{ 
                    height: 20,
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    bgcolor: 'primary.50',
                    color: 'primary.700'
                  }}
                />
              )}
            </Stack>

            <Typography variant="h5" component="h3" fontWeight={800} color="text.primary" sx={{ mb: 1.5, letterSpacing: '-0.02em' }}>
              {procedure_name}
            </Typography>
            
            {hasComplexity ? (
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    bgcolor: (theme) => `${theme.palette[complexityColor].main}` 
                  }} />
                  <Typography variant="body2" fontWeight={500} color="text.secondary">
                    {group_bucket}
                  </Typography>
               </Box>
            ) : care_type ? (
              <Typography variant="body2" fontWeight={500} color="text.secondary">
                {care_type}
              </Typography>
            ) : null}

            {cardDisplayItems.length > 0 && (
              <Stack spacing={0.5} sx={{ mt: 1.25 }}>
                {cardDisplayItems.map((item) => (
                  <Typography
                    key={item.key}
                    variant="body2"
                    fontWeight={700}
                    color="primary.main"
                    sx={{ lineHeight: 1.3 }}
                  >
                    {item.label ? `${item.label}: ${item.value}` : item.value}
                  </Typography>
                ))}
              </Stack>
            )}
          </Box>

          <Box sx={{ mt: 'auto', pt: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {tagList.map((tag, i) => (
                <Chip 
                  key={i} 
                  label={tag} 
                  size="small" 
                  sx={{ 
                    fontSize: '0.7rem', 
                    height: 24, 
                    bgcolor: 'action.hover',
                    color: 'text.secondary',
                    fontWeight: 500
                  }} 
                />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </FadeIn>
  );
};

export default ProcedureCard;
