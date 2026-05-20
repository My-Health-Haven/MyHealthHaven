'use client';
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import GlassCard from '@/components/GlassCard';
import MedicalCareTimeline from '@/components/MedicalCareTimeline';
import { useLanguage } from '@/context/LanguageContext';

const MedicalCareTimelineSection = () => {
  const { t } = useLanguage();

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
      <Container
        maxWidth={false}
        sx={{ px: { xs: 2, md: 4, lg: 6 } }}
      >
        <FadeIn>
          <MedicalCareTimeline />
        </FadeIn>

        {/* Conclusion Section */}
        <FadeIn delay={300}>
          <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6 }}>
            <GlassCard
              sx={{
                p: 4,
                bgcolor: 'rgba(255,255,255,0.95)',
                borderLeft: 6,
                borderColor: 'primary.main',
              }}
            >
              <Typography variant="h5" gutterBottom color="primary.dark">
                {t('medicalTravelPage.timelineConclusion.title')}
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" paragraph>
                {t('medicalTravelPage.timelineConclusion.subtitle')}
              </Typography>
              <Typography variant="body1">
                {t('medicalTravelPage.timelineConclusion.description')}
              </Typography>
            </GlassCard>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              component={Link}
              href="/schedule"
              sx={{
                py: 2,
                px: 6,
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              {t('schedulePage.title')}
            </Button>
          </Box>
        </FadeIn>
      </Container>
    </Box>
  );
};

export default MedicalCareTimelineSection;
