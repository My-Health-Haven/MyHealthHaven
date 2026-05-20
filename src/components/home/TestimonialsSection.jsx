'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  Container,
  Typography,
  Grid,
} from '@mui/material';
import FadeIn from '@/components/FadeIn';
import GlassCard from '@/components/GlassCard';
import { useLanguage } from '@/context/LanguageContext';

const Marquee = dynamic(() => import('@/components/Marquee'), { ssr: false });

const TestimonialsContent = ({ hasMounted }) => {
  const [shuffled, setShuffled] = React.useState(null);
  const { t, language } = useLanguage();

  useEffect(() => {
     // Verified Reviews only - fetched from translations
    const allTestimonials = t('home.testimonials') || [];
    if (allTestimonials.length > 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShuffled([...allTestimonials].sort(() => 0.5 - Math.random()));
    }
  }, [language, t]); // Re-run when language/content changes

  if (!shuffled || shuffled.length === 0) return null; // or a loading skeleton

  const gridItems = shuffled.slice(0, 2);
  const carouselItems = shuffled.slice(2);

  return (
    <>
      {/* Top 2 - Grid Layout */}
      <Grid container spacing={4} sx={{ mb: 8 }} justifyContent="center">
        {gridItems.map((testi, i) => (
          <Grid size={{ xs: 12, md: 6 }} key={i} sx={{ display: 'flex' }}>
            <FadeIn delay={i * 200} style={{ width: '100%' }}>
              <GlassCard sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)' }
              }}>
                <Typography variant="h6" paragraph fontStyle="italic">"{testi.quote}"</Typography>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">{testi.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{testi.meta}</Typography>
                </Box>
              </GlassCard>
            </FadeIn>
          </Grid>
        ))}
      </Grid>

      {/* Remaining - Marquee Carousel */}
      <FadeIn delay={400}>
        {hasMounted ? (
          <React.Suspense fallback={<Box sx={{ minHeight: 200 }} />}>
            <Marquee speed={40} pauseOnHover={true}>
              {carouselItems.map((testi, i) => (
                <Box key={i} sx={{ width: 400, flexShrink: 0 }}>
                  <GlassCard sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    mx: 2 // Margin for spacing in marquee
                  }}>
                    <Typography variant="body1" paragraph fontStyle="italic">"{testi.quote}"</Typography>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">{testi.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{testi.meta}</Typography>
                    </Box>
                  </GlassCard>
                </Box>
              ))}
            </Marquee>
          </React.Suspense>
        ) : null}
      </FadeIn>
    </>
  );
};

const TestimonialsSection = React.forwardRef(function TestimonialsSection({ hasMounted }, ref) {
  const { t } = useLanguage();

  return (
    <Box ref={ref} sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Typography variant="h2" color="primary.main" align="center" gutterBottom>{t('home.testimonialsTitle')}</Typography>
          <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 8 }}>{t('home.testimonialsSubtitle')}</Typography>

          <TestimonialsContent hasMounted={hasMounted} />
      </Container>
    </Box>
  );
});

export default TestimonialsSection;
