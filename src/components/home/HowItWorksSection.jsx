'use client';
import React from 'react';
import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FadeIn from '@/components/FadeIn';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useLanguage } from '@/context/LanguageContext';

const Squares = dynamic(() => import('@/components/Squares/Squares'), { ssr: false });

const HowItWorksSection = React.forwardRef(function HowItWorksSection({ hasMounted }, ref) {
  const { t } = useLanguage();

  return (
    <Box id="how-it-works" ref={ref} sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent', position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        {hasMounted ? (
          <React.Suspense fallback={null}>
            <ErrorBoundary fallback={null}>
              <Squares
                speed={0.5}
                squareSize={40}
                direction='down'
                borderColor='rgba(0, 137, 123, 0.1)'
                hoverFillColor='#8E24AA'
              />
            </ErrorBoundary>
          </React.Suspense>
        ) : null}
      </Box>
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 6, lg: 10 }, position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" color="primary.main" gutterBottom>{t('home.howItWorksTitle')}</Typography>
            <Typography variant="h5" color="text.secondary">{t('home.howItWorksSubtitle')}</Typography>
          </Box>
          <Grid container spacing={4}>
            {[
              { step: 1, title: t('home.step1Title'), body: t('home.step1Body'), cta: true, img: "/step1.png", width: 1000, height: 789 },
              { step: 2, title: t('home.step2Title'), body: t('home.step2Body'), img: "/step2.png", width: 1000, height: 742 },
              { step: 3, title: t('home.step3Title'), body: t('home.step3Body'), img: "/step3.png", width: 1000, height: 720 }
            ].map((item, index) => (
              <Grid container spacing={2} alignItems="center" direction={{ xs: 'column', md: index % 2 === 1 ? 'row-reverse' : 'row' }} key={index} sx={{ mb: { xs: 6, md: 8 } }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FadeIn delay={200}>
                    <Box sx={{
                      p: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      textAlign: 'center'
                    }}>
                      <Typography variant="h1" className="shiny-text-dark" sx={{ fontWeight: 900, mb: 1, color: 'text.primary', fontSize: '5rem' }}>
                        {t('home.step')} {item.step}
                      </Typography>
                      <Typography variant="h5" gutterBottom fontWeight="bold" color="text.primary">{item.title}</Typography>
                      <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 500, mx: 'auto' }}>{item.body}</Typography>
                      {item.cta && (
                        <Box sx={{ mt: 2 }}>
                          <Button component={Link} href="/schedule" variant="contained" color="primary" size="large">
                            {t('home.scheduleCall')}
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </FadeIn>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <FadeIn delay={400}>
                    <Box
                      sx={{
                        width: '100%',
                        maxWidth: { xs: '100%', md: '800px' },
                        borderRadius: 4,
                        overflow: 'hidden',
                        lineHeight: 0,
                      }}
                    >
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={item.width}
                        height={item.height}
                        sizes="(max-width: 900px) 100vw, 800px"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                      />
                    </Box>
                  </FadeIn>
                </Grid>
              </Grid>
            ))}
          </Grid>
      </Container>
    </Box>
  );
});

export default HowItWorksSection;
