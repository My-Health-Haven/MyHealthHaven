import React, { useState } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const hexToRgba = (hex, alpha) => {
  if (!hex || typeof hex !== 'string') return `rgba(100, 116, 139, ${alpha})`;
  const value = hex.replace('#', '');
  const normalized =
    value.length === 3
      ? value
          .split('')
          .map((c) => c + c)
          .join('')
      : value;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ProcedureRow = ({ procedure, accentColor }) => {
  const { procedure_name, description } = procedure;
  const [expanded, setExpanded] = useState(false);
  const hasDescription = Boolean(description && description.trim());

  const handleToggle = () => {
    if (!hasDescription) return;
    setExpanded((prev) => !prev);
  };

  const panelBg = accentColor ? hexToRgba(accentColor, 0.06) : 'action.hover';

  return (
    <Box
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        role={hasDescription ? 'button' : undefined}
        tabIndex={hasDescription ? 0 : -1}
        aria-expanded={hasDescription ? expanded : undefined}
        onClick={handleToggle}
        onKeyDown={(event) => {
          if (!hasDescription) return;
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleToggle();
          }
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          px: { xs: 2, md: 3 },
          py: 2,
          cursor: hasDescription ? 'pointer' : 'default',
          userSelect: 'none',
          transition: 'background-color 0.15s ease',
          '&:hover': hasDescription
            ? { bgcolor: accentColor ? hexToRgba(accentColor, 0.04) : 'action.hover' }
            : undefined,
        }}
      >
        <Typography variant='body1' fontWeight={600} color='text.primary'>
          {procedure_name}
        </Typography>

        {hasDescription && (
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              bgcolor: expanded ? accentColor || 'text.secondary' : 'transparent',
              color: expanded ? '#fff' : accentColor || 'text.secondary',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease, background-color 0.2s ease, color 0.2s ease',
              flexShrink: 0,
            }}
          >
            <KeyboardArrowDownIcon fontSize='small' />
          </Box>
        )}
      </Box>

      {hasDescription && (
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <Box
            style={{
              borderLeft: `3px solid ${accentColor || '#64748B'}`,
            }}
            sx={{
              mx: { xs: 1.5, md: 2.5 },
              mb: 2,
              px: { xs: 2, md: 2.5 },
              py: { xs: 1.75, md: 2 },
              borderRadius: '4px 10px 10px 4px',
              bgcolor: panelBg,
              position: 'relative',
            }}
          >
            <Typography
              variant='overline'
              sx={{
                display: 'block',
                color: accentColor || 'text.secondary',
                fontWeight: 700,
                letterSpacing: '0.08em',
                fontSize: '0.68rem',
                lineHeight: 1,
                mb: 1,
              }}
            >
              About this procedure
            </Typography>
            <Typography
              variant='body2'
              sx={{
                color: 'text.primary',
                lineHeight: 1.65,
                fontSize: { xs: '0.875rem', md: '0.92rem' },
              }}
            >
              {description}
            </Typography>
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

export default ProcedureRow;
