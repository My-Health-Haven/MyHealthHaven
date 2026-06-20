'use client';
import Image from 'next/image';
import { Box } from '@mui/material';

const WhyCancunIllustration = ({ pinLabel }) => (
  <Box
    sx={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
    }}
  >
    <Image
      src='/why cancun map.png'
      alt='Map showing flight path from USA to Cancún, Mexico'
      fill
      sizes='(max-width: 900px) 100vw, 50vw'
      style={{ objectFit: 'cover', objectPosition: 'center' }}
      priority
    />

    {/* Floating destination label badge */}
    <Box
      sx={{
        display: { xs: 'none', sm: 'block' },
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
        zIndex: 2,
      }}
    >
      {pinLabel}
    </Box>
  </Box>
);

export default WhyCancunIllustration;
