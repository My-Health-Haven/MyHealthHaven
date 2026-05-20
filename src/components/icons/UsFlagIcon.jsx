'use client';
import { Box } from '@mui/material';

const UsFlagIcon = ({ sx = {} }) => (
  <Box
    component="svg"
    viewBox="0 0 24 16"
    sx={{ width: 26, height: 18, borderRadius: 0.5, display: 'block', ...sx }}
    aria-hidden="true"
  >
    <rect width="24" height="16" fill="#B22234" />
    <g fill="#FFFFFF">
      <rect y="1.23" width="24" height="1.23" />
      <rect y="3.69" width="24" height="1.23" />
      <rect y="6.15" width="24" height="1.23" />
      <rect y="8.62" width="24" height="1.23" />
      <rect y="11.08" width="24" height="1.23" />
      <rect y="13.54" width="24" height="1.23" />
    </g>
    <rect width="9.6" height="8.62" fill="#3C3B6E" />
  </Box>
);

export default UsFlagIcon;
