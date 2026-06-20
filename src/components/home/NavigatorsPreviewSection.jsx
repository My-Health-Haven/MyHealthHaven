'use client';
import React from 'react';
import { Box, Container, Typography, Button, Card } from '@mui/material';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { useLanguage } from '@/context/LanguageContext';
import LinkNav from '@/components/home/LinkNav';

const NavigatorsPreviewSection = React.forwardRef(function NavigatorsPreviewSection(props, ref) {
  const { t } = useLanguage();

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        pt: { xs: 8, md: 12 },
        pb: { xs: 3, md: 6 },
        bgcolor: 'transparent',
        overflow: 'hidden',
      }}
    >
      <Container
        maxWidth={false}
        sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 6, lg: 10 } }}
      >
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant='h2' color='primary.main' gutterBottom>
            <LinkNav text={t('home.meetNavigatorsTitle')} />
          </Typography>
          <Typography variant='h5' color='text.secondary'>
            {t('home.meetNavigatorsSubtitle')}
          </Typography>
        </Box>

        {/* Navigator Video */}
        <Box sx={{ mb: 8, maxWidth: 800, mx: 'auto' }}>
          <Card
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: 'none',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ position: 'relative', paddingTop: '56.25%', bgcolor: 'grey.200' }}>
              <Box
                component='video'
                controls
                preload='none'
                playsInline
                poster='/HealthNavigatorsBG.webp'
                src='/Meet Your Health Navigator.mp4'
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Card>
        </Box>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <FadeIn delay={300}>
            <Button component={Link} href='/schedule' variant='outlined'>
              {t('home.seeHowNavigatorsWork')}
            </Button>
          </FadeIn>
        </Box>
      </Container>
    </Box>
  );
});

export default NavigatorsPreviewSection;
