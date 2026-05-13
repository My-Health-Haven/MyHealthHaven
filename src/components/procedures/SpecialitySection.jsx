import React from 'react';
import {
  Box,
  Typography,
  Collapse,
  IconButton,
  Paper,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ProcedureRow from './ProcedureRow';

const SpecialitySection = ({
  speciality,
  procedures,
  expanded,
  onToggle,
  countLabel,
}) => {
  const { key, displayName, Icon, color, bgColor, description } = speciality;
  const count = procedures.length;
  const title = displayName || key;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        bgcolor: 'background.paper',
      }}
    >
      <Box
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onToggle();
          }
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: { xs: 2, md: 3 },
          py: 2,
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'background-color 0.15s ease',
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: bgColor,
            color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={24} width={24} height={24} />
        </Box>

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="h6" component="h2" fontWeight={700} sx={{ lineHeight: 1.2 }}>
            {title}
          </Typography>
          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.25, lineHeight: 1.4 }}
            >
              {description}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            bgcolor: bgColor,
            color,
            fontWeight: 600,
            fontSize: '0.8rem',
            px: 1.5,
            py: 0.5,
            borderRadius: 999,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {countLabel ? countLabel(count) : `${count} procedures`}
        </Box>

        <IconButton
          size="small"
          aria-label={expanded ? 'Collapse' : 'Expand'}
          tabIndex={-1}
          sx={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box>
          {procedures.map((procedure) => (
            <ProcedureRow key={procedure.procedure_id} procedure={procedure} />
          ))}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default SpecialitySection;
