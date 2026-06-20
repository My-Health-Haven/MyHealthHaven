import React, { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ProcedureRow from './ProcedureRow';

const DEFAULT_VISIBLE = 5;
const EXPANDED_MAX_HEIGHT = 360;

const SpecialityCard = ({
  speciality,
  procedures,
  viewMoreLabel,
  viewLessLabel,
  wide = false,
  forceShowAll = false,
}) => {
  const [showAll, setShowAll] = useState(false);
  const { key, displayName, Icon, color, bgColor, description } = speciality;
  const title = displayName || key;
  const count = procedures.length;

  const isExpanded = forceShowAll || showAll;
  const hiddenCount = Math.max(count - DEFAULT_VISIBLE, 0);
  const visibleProcedures = isExpanded ? procedures : procedures.slice(0, DEFAULT_VISIBLE);

  const hasMoreToShow = hiddenCount > 0;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: { xs: 1.5, md: 2 },
          px: { xs: 2, md: 3 },
          py: 2,
        }}
      >
        <Box
          sx={{
            width: { xs: 40, md: 48 },
            height: { xs: 40, md: 48 },
            borderRadius: '50%',
            bgcolor: bgColor,
            color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={22} width={22} height={22} />
        </Box>

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            variant='h6'
            component='h2'
            fontWeight={700}
            sx={{
              lineHeight: 1.2,
              fontSize: { xs: '1.05rem', md: '1.25rem' },
            }}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                mt: 0.5,
                lineHeight: 1.4,
                fontSize: { xs: '0.82rem', md: '0.875rem' },
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          maxHeight: isExpanded && count > DEFAULT_VISIBLE ? EXPANDED_MAX_HEIGHT : 'none',
          overflowY: isExpanded && count > DEFAULT_VISIBLE ? 'auto' : 'visible',
          // Speciality-themed scrollbar (only visible when scrolling kicks in)
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
            margin: '6px 0',
          },
          '&::-webkit-scrollbar-thumb': {
            background: color,
            borderRadius: '999px',
            border: '3px solid transparent',
            backgroundClip: 'padding-box',
            transition: 'border-width 0.15s ease',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            border: '2px solid transparent',
            backgroundClip: 'padding-box',
          },
          scrollbarWidth: 'thin',
          scrollbarColor: `${color} transparent`,
          // Procedures distribute across 2 columns for the full-width "wide" card
          ...(wide && {
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gridAutoFlow: 'row',
          }),
        }}
      >
        {visibleProcedures.map((procedure) => (
          <ProcedureRow
            key={procedure.procedure_id}
            procedure={procedure}
            accentColor={color}
            accentBgColor={bgColor}
          />
        ))}
      </Box>

      {hasMoreToShow && !forceShowAll && (
        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
            py: 1,
          }}
        >
          <Button
            onClick={() => setShowAll((prev) => !prev)}
            endIcon={showAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            sx={{ textTransform: 'none', color: color, fontWeight: 600 }}
            size='small'
          >
            {showAll
              ? viewLessLabel || 'Show less'
              : viewMoreLabel
                ? viewMoreLabel(hiddenCount)
                : `View ${hiddenCount} more`}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default SpecialityCard;
