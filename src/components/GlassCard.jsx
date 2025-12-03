import React from 'react';
import { Box, alpha } from '@mui/material';

const GlassCard = ({ children, sx = {}, noShadow = false, ...props }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        // Lighter, more subtle gradient base
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        // Thinner, more refined border
        border: '1px solid rgba(255, 255, 255, 0.4)',
        // No drop shadow, stronger inner top glow
        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
        borderRadius: 4,
        overflow: 'hidden',
        ...sx,
      }}
      {...props}
    >
      {/* Stronger top "light source" glow */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '10px', // Reduced from 60px
          background: 'radial-gradient(50% 100% at 50% 0%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%)', // Reduced opacity from 0.4
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      {/* Content wrapper to ensure z-index above the glow */}
      <Box sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default GlassCard;
