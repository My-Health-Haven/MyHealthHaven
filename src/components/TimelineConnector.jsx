import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * TimelineConnector - Curved connector between Row 1 and Row 2
 * Routes from end of Row 1 down and across to start of Row 2
 */
const TimelineConnector = ({ sx = {} }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 80,
        position: 'relative',
        my: 2,
        ...sx,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.15))',
          overflow: 'visible',
        }}
      >
        <defs>
          <linearGradient id="connectorGradient" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1565C0" />
            <stop offset="50%" stopColor="#42A5F5" />
            <stop offset="100%" stopColor="#0097A7" />
          </linearGradient>
        </defs>
        {/* Main curved path from right side of row 1, down, across, to left side of row 2 */}
        <path
          d="M1180 0 
             L1180 20 
             Q1180 35, 1165 35 
             L35 35 
             Q20 35, 20 50 
             L20 60"
          stroke="url(#connectorGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrowhead at bottom left - pointing DOWN */}
        <polygon
          points="10,60 20,80 30,60"
          fill="#0097A7"
        />
      </svg>
    </Box>
  );
};

TimelineConnector.propTypes = {
  sx: PropTypes.object,
};

export default TimelineConnector;
