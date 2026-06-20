import React from 'react';
import PropTypes from 'prop-types';
import { Box, alpha, useTheme } from '@mui/material';

const GlassCard = ({ children, sx = {}, noShadow = false, variant = 'gradient', ...props }) => {
  const theme = useTheme();
  const isGlass = variant === 'glass';

  // Base styles for the 'gradient' variant (Default)
  // Using primary and secondary colors for a visible but premium gradient
  const gradientStyles = {
    position: 'relative',
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    boxShadow: noShadow ? 'none' : `0px 10px 40px -10px ${alpha(theme.palette.primary.main, 0.1)}`,
    borderRadius: 4,
    overflow: 'hidden',
  };

  // Styles for the 'glass' variant (Original Glassmorphism)
  // Preserved for "Why Mexico" section
  const glassStyles = {
    position: 'relative',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  };

  return (
    <Box
      sx={{
        ...(isGlass ? glassStyles : gradientStyles),
        ...sx,
      }}
      {...props}
    >
      {/* Light Source / Glow Effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: isGlass ? '10px' : '3px',
          // Stronger accent line for gradient cards
          background: isGlass
            ? 'radial-gradient(50% 100% at 50% 0%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%)'
            : `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.5)} 50%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content wrapper */}
      <Box sx={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</Box>
    </Box>
  );
};

GlassCard.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
  noShadow: PropTypes.bool,
  variant: PropTypes.oneOf(['gradient', 'glass']),
};

export default GlassCard;
