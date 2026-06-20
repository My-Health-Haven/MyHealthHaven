'use client';
import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FadeIn from '@/components/FadeIn';
import { useLanguage } from '@/context/LanguageContext';

const MedicalTravelHero = () => {
  const { t } = useLanguage();

  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 12, md: 18 },
        backgroundImage: 'url(/medicaltravel.jpg)',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        color: 'white',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0, 25, 30, 0.65) 0%, rgba(0, 53, 64, 0.5) 100%)',
          zIndex: 1,
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          px: { xs: 2, md: 6, lg: 10 },
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center' }}>
          <FadeIn>
            <Typography
              variant='h1'
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.4rem' },
                lineHeight: 1.1,
                textShadow: '0 4px 24px rgba(0, 0, 0, 0.35)',
              }}
            >
              {t('medicalTravelPage.title')}
            </Typography>
            <Typography
              variant='h5'
              sx={{
                maxWidth: 760,
                mx: 'auto',
                mb: 4,
                color: 'rgba(255, 255, 255, 0.93)',
                lineHeight: 1.5,
                fontSize: { xs: '1.05rem', md: '1.25rem' },
              }}
            >
              {t('medicalTravelPage.subtitle')}
            </Typography>
            <Button
              variant='contained'
              size='large'
              color='primary'
              component={Link}
              href='/schedule'
              startIcon={<CalendarMonthIcon />}
              sx={{
                mt: 2,
                py: 1.6,
                px: 4,
                fontSize: '1rem',
                borderRadius: 2,
                boxShadow: '0 12px 30px rgba(0, 137, 123, 0.45)',
              }}
            >
              {t('medicalTravelPage.cta')}
            </Button>
          </FadeIn>
        </Box>
      </Container>
    </Box>
  );
};

export default MedicalTravelHero;
