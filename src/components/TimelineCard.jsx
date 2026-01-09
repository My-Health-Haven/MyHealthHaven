import React from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * TimelineCard - A step card for the medical care timeline
 * Features: blue header with step number/title/timing, icon, caption
 */
const TimelineCard = ({ 
  stepNumber, 
  title, 
  timing, 
  icon, 
  caption, 
  variant = 'default', // 'default' or 'teal' for steps 5 and 10
  sx = {} 
}) => {
  const theme = useTheme();
  
  // Header gradient colors based on variant
  const headerBg = variant === 'teal' 
    ? 'linear-gradient(135deg, #0097A7 0%, #00838F 100%)'
    : 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)';

  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 160,
        maxWidth: 200,
        borderRadius: '12px',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        boxShadow: `0 4px 20px ${alpha('#000', 0.08)}`,
        background: 'linear-gradient(180deg, #F8FAFC 0%, #EDF2F7 100%)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {/* Header Bar with notch */}
      <Box
        sx={{
          background: headerBg,
          borderRadius: '12px 12px 0 0',
          pt: 1.5,
          pb: 2,
          px: 1.5,
          textAlign: 'center',
          position: 'relative',
          minHeight: 70, // Fixed minimum height for consistent sizing
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          // Create the center notch/tab
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: variant === 'teal' 
              ? '10px solid #00838F' 
              : '10px solid #0D47A1',
          },
        }}
      >
        <Typography
          sx={{
            color: 'white',
            fontWeight: 700,
            fontSize: '0.85rem',
            lineHeight: 1.3,
            mb: 0.25,
          }}
        >
          {stepNumber}. {title}
        </Typography>
        {timing && (
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '0.75rem',
              fontStyle: 'italic',
            }}
          >
            {timing}
          </Typography>
        )}
      </Box>

      {/* Card Body */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          pt: 3, // Extra padding for notch
          position: 'relative',
          // Spotlight glow behind icon
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 80,
            height: 80,
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.15)} 0%, transparent 70%)`,
            borderRadius: '50%',
            zIndex: 0,
          },
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 64,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 1.5,
            position: 'relative',
            zIndex: 1,
            '& svg': {
              fontSize: 48,
              color: theme.palette.primary.main,
            },
            '& img': {
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            },
          }}
        >
          {icon}
        </Box>

        {/* Caption */}
        <Typography
          sx={{
            fontSize: '0.8rem',
            textAlign: 'center',
            color: theme.palette.text.secondary,
            lineHeight: 1.4,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {caption}
        </Typography>
      </Box>
    </Box>
  );
};

TimelineCard.propTypes = {
  stepNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  timing: PropTypes.string,
  icon: PropTypes.node.isRequired,
  caption: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'teal']),
  sx: PropTypes.object,
};

export default TimelineCard;
