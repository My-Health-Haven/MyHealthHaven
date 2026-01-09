import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * TimelineArrow - Right-pointing arrow between timeline cards
 * Blue gradient with soft shadow
 */
const TimelineArrow = ({ sx = {} }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 0.5,
        flexShrink: 0,
        ...sx,
      }}
    >
      <svg
        width="32"
        height="24"
        viewBox="0 0 32 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.1))' }}
      >
        <defs>
          <linearGradient id="arrowGradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#90CAF9" />
            <stop offset="100%" stopColor="#1565C0" />
          </linearGradient>
        </defs>
        <path
          d="M0 8 L22 8 L22 3 L32 12 L22 21 L22 16 L0 16 Z"
          fill="url(#arrowGradient)"
        />
      </svg>
    </Box>
  );
};

TimelineArrow.propTypes = {
  sx: PropTypes.object,
};

export default TimelineArrow;
