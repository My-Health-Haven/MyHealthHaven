import React from 'react';
import { Box, useTheme } from '@mui/material';

const Marquee = ({ children, speed = 20, direction = 'left', pauseOnHover = true }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          minWidth: 'fit-content',
          animation: `scroll-${direction} ${speed}s linear infinite`,
          '&:hover': {
            animationPlayState: pauseOnHover ? 'paused' : 'running',
          },
          '@keyframes scroll-left': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-25%)' },
          },
          '@keyframes scroll-right': {
            '0%': { transform: 'translateX(-25%)' },
            '100%': { transform: 'translateX(0)' },
          },
          py: 2, // Add some vertical padding for shadows
        }}
      >
        {children}
        {children}
        {children}
        {children}
      </Box>
    </Box>
  );
};

export default Marquee;
