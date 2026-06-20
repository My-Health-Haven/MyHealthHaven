'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLanguage } from '@/context/LanguageContext';

const EstimateHero = () => {
  const { t } = useLanguage();

  return (
    <>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: { xs: '-5%', md: '-8%' },
            backgroundImage: 'url(/EstimateBackgroundIMG.webp)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            transform: { xs: 'scale(1.04)', md: 'scale(1.1)' },
            filter: 'blur(5px)',
            opacity: 0.5,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(5,16,21,0.78) 0%, rgba(7,24,31,0.58) 26%, rgba(244,249,255,0.88) 100%)',
          }}
        />
      </Box>

      <Box
        sx={{
          textAlign: 'center',
          mb: 6,
          px: { xs: 3, md: 4 },
          py: { xs: 3.5, md: 4 },
          borderRadius: 5,
          color: 'common.white',
          border: '1px solid rgba(255,255,255,0.24)',
          background: 'linear-gradient(180deg, rgba(8,20,28,0.54) 0%, rgba(8,20,28,0.28) 100%)',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 24px 60px rgba(3,10,15,0.18)',
        }}
      >
        <Typography
          variant='overline'
          sx={{ letterSpacing: 2.4, fontWeight: 800, color: 'rgba(255,255,255,0.74)' }}
        >
          Email Estimate
        </Typography>
        <Typography variant='h2' gutterBottom sx={{ color: 'common.white', mt: 1 }}>
          {t('estimatePage.title')}
        </Typography>
        <Typography variant='h5' sx={{ color: 'rgba(255,255,255,0.84)' }}>
          {t('estimatePage.subtitle')}
        </Typography>
      </Box>
    </>
  );
};

export default EstimateHero;
