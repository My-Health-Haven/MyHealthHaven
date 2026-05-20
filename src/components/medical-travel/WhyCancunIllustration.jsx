'use client';
import { Box, alpha } from '@mui/material';

const WhyCancunIllustration = ({ pinLabel }) => (
  <Box
    sx={{
      position: 'relative',
      width: '100%',
      mb: 3,
      borderRadius: 3,
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #E8F4FE 0%, #DCEEF9 100%)',
      border: '1px solid',
      borderColor: alpha('#00897B', 0.1),
    }}
  >
    <Box
      component="svg"
      viewBox="0 0 400 220"
      sx={{ width: '100%', height: 'auto', display: 'block' }}
      aria-hidden="true"
    >
      {/* Soft clouds */}
      <ellipse cx="60" cy="36" rx="32" ry="9" fill="#FFFFFF" opacity="0.7" />
      <ellipse cx="330" cy="48" rx="36" ry="10" fill="#FFFFFF" opacity="0.6" />
      <ellipse cx="200" cy="28" rx="24" ry="7" fill="#FFFFFF" opacity="0.55" />

      {/* USA — simplified shape */}
      <path
        d="M 28 78 Q 28 68 42 68 L 165 68 Q 178 68 180 82 L 182 128 Q 182 144 168 144 L 92 144 Q 72 144 64 134 L 28 100 Z"
        fill="#A8D5BA"
        opacity="0.85"
      />
      <text
        x="102"
        y="112"
        textAnchor="middle"
        fill="#1F2933"
        fontSize="14"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
      >
        USA
      </text>

      {/* Mexico — simplified with Yucatán peninsula */}
      <path
        d="M 180 142 Q 180 138 192 138 L 258 142 Q 282 148 292 162 L 308 174 Q 320 178 326 172 L 348 162 Q 360 160 362 168 Q 362 178 356 184 L 330 196 Q 308 200 282 196 L 228 196 Q 202 190 184 178 Z"
        fill="#FFE0A1"
        opacity="0.95"
      />
      <text
        x="240"
        y="178"
        textAnchor="middle"
        fill="#1F2933"
        fontSize="12"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
      >
        Mexico
      </text>

      {/* Dashed flight-path arc */}
      <path
        d="M 100 96 Q 220 18 332 172"
        stroke="#00897B"
        strokeWidth="2.5"
        strokeDasharray="6,5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Plane along the path */}
      <g transform="translate(220, 50) rotate(-12)">
        <path
          d="M -11 0 L -3 -3 L 8 -3 L 14 -8 L 17 -8 L 13 -3 L 13 3 L 17 8 L 14 8 L 8 3 L -3 3 L -11 0 Z"
          fill="#00897B"
        />
      </g>

      {/* Cancún pin marker */}
      <g transform="translate(332, 172)">
        <circle
          cx="0"
          cy="-14"
          r="10"
          fill="#00897B"
          stroke="#FFFFFF"
          strokeWidth="2.5"
        />
        <path d="M -6 -8 L 0 4 L 6 -8 Z" fill="#00897B" />
        <circle cx="0" cy="-14" r="3.5" fill="#FFFFFF" />
      </g>
    </Box>

    {/* Floating destination label badge */}
    <Box
      sx={{
        position: 'absolute',
        right: 16,
        top: 14,
        bgcolor: 'primary.main',
        color: 'white',
        px: 1.5,
        py: 0.5,
        borderRadius: 1.5,
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: 0.3,
        boxShadow: '0 4px 12px rgba(0, 137, 123, 0.35)',
      }}
    >
      {pinLabel}
    </Box>
  </Box>
);

export default WhyCancunIllustration;
