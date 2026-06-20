'use client';
import React from 'react';
import { Box, Container, Typography, Button, Grid, Stack } from '@mui/material';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import GlassCard from '@/components/GlassCard';
import { useLanguage } from '@/context/LanguageContext';

const WhyMexicoSection = ({ isMobile }) => {
  const { t } = useLanguage();

  return (
    <Box sx={{ position: 'relative', py: { xs: 8, md: 12 }, overflow: 'hidden' }}>
      {/* Parallax Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/cancun-skyline.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed',
          zIndex: 0,
        }}
      />
      {/* Darkening & Blur Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(3px)',
          zIndex: 0,
        }}
      />

      <Container
        maxWidth={false}
        sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 6, lg: 10 } }}
      >
        <Grid container spacing={8} alignItems='center'>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant='h2' sx={{ color: 'white', mb: 2 }}>
              {t('home.whyMexicoTitle')}
            </Typography>
            <Typography variant='h5' sx={{ color: 'grey.300', mb: 3 }}>
              {t('home.whyMexicoSubtitle')}
            </Typography>
            <Typography paragraph sx={{ color: 'grey.300' }}>
              {t('home.whyMexicoDesc1')}
            </Typography>
            <Typography paragraph sx={{ color: 'grey.300' }}>
              {t('home.whyMexicoDesc2')}
            </Typography>
            <Stack spacing={1} sx={{ mt: 3 }}>
              {[
                t('home.whyMexicoPoint1'),
                t('home.whyMexicoPoint2'),
                t('home.whyMexicoPoint3'),
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <Typography variant='body2' fontWeight={500} sx={{ color: 'white' }}>
                    • {item}
                  </Typography>
                </FadeIn>
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={3}>
              {[
                {
                  label: t('home.costEfficiency'),
                  value: '30–60%',
                  desc: t('home.costEfficiencyDesc'),
                },
                {
                  label: t('home.languageAccess'),
                  value: 'Bilingual',
                  desc: t('home.languageAccessDesc'),
                },
                {
                  label: t('home.supportCities'),
                  value: 'Cancún +',
                  desc: t('home.supportCitiesDesc'),
                },
              ].map((stat, i) => (
                <Grid size={{ xs: 12 }} key={i}>
                  <FadeIn delay={i * 150}>
                    <GlassCard
                      variant='glass'
                      sx={{
                        p: 3,
                        borderLeft: '4px solid',
                        borderLeftColor: 'primary.light', // Ensure this overrides or merges correctly
                        // The GlassCard has its own border, we might want to keep the left border accent
                      }}
                    >
                      <Typography variant='h4' sx={{ color: 'white', fontWeight: 'bold' }}>
                        {stat.value}
                      </Typography>
                      <Typography variant='subtitle1' sx={{ color: 'white', fontWeight: 'bold' }}>
                        {stat.label}
                      </Typography>
                      <Typography variant='body2' sx={{ color: 'grey.300' }}>
                        {stat.desc}
                      </Typography>
                    </GlassCard>
                  </FadeIn>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4 }}>
              <FadeIn delay={500}>
                <Button
                  component={Link}
                  href='/medical-travel'
                  variant='contained'
                  color='secondary'
                >
                  {t('home.learnMedicalTravel')}
                </Button>
              </FadeIn>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyMexicoSection;
