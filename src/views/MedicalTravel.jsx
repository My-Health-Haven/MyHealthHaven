'use client';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
import Link from 'next/link';
import FadeIn from '../components/FadeIn';
import GlassCard from '../components/GlassCard';
import MedicalCareTimeline from '../components/MedicalCareTimeline';
import { useLanguage } from '../context/LanguageContext';

const MedicalTravel = () => {
  const { language, t } = useLanguage();
  const [mapActive, setMapActive] = useState(false);
  return (
    <>
      {/* 1. Hero Parallax */}
      <Box 
        sx={{ 
          py: { xs: 12, md: 20 }, 
          backgroundImage: 'url(/medicaltravel.jpg)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: 'relative',
          color: 'white',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.5)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 }, position: 'relative', zIndex: 2 }}>
          <Box sx={{ maxWidth: 'lg', mx: 'auto', textAlign: 'center' }}>
            <FadeIn>
              <Typography variant="h1" gutterBottom sx={{ color: 'white' }}>
                {t('medicalTravelPage.title')}
              </Typography>
              <Typography variant="h5" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 4, color: 'rgba(255,255,255,0.9)' }}>
                {t('medicalTravelPage.subtitle')}
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                color="success"
                component={Link}
                href="/schedule"
                sx={{ mt: 4 }}
              >
                {t('medicalTravelPage.cta')}
              </Button>
            </FadeIn>
          </Box>
        </Container>
      </Box>

      {/* 2. Locations Overview */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'xl', mx: 'auto' }}>
            <FadeIn>
              <Typography variant="h2" gutterBottom>{t('medicalTravelPage.locationsTitle')}</Typography>
              {Array.isArray(t('medicalTravelPage.locationsParagraphs')) ? (
                t('medicalTravelPage.locationsParagraphs').map((paragraph, index) => (
                  <Typography key={index} variant="body1" paragraph sx={{ maxWidth: 900, fontSize: '1.1rem', color: 'text.secondary' }}>
                    {paragraph}
                  </Typography>
                ))
              ) : (
                <Typography variant="body1" paragraph sx={{ maxWidth: 800 }}>
                  {t('medicalTravelPage.locationsDesc')}
                </Typography>
              )}
            </FadeIn>
              
            <FadeIn delay={200}>
              <Box
                onMouseLeave={() => setMapActive(false)}
                sx={{ mt: 6, position: 'relative', width: '100%', height: { xs: 400, md: 500 }, borderRadius: 4, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
              >
                <iframe
                  src="https://www.google.com/maps/d/embed?mid=1LWn2Sx3NCenBN4f_Wabr45-v7hhciJY&ehbc=2E312F&noprof=1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: mapActive ? 'auto' : 'none' }}
                  title="MyHealth Haven Operations Map"
                />
                {!mapActive && (
                  <Box
                    onClick={() => setMapActive(true)}
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'rgba(255,255,255,0.04)',
                      transition: 'background-color 0.2s',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' },
                    }}
                  >
                    <Typography
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.92)',
                        color: 'text.primary',
                        px: 2.5,
                        py: 1,
                        borderRadius: 999,
                        fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                    >
                      {t('medicalTravelPage.mapActivate') || 'Click to interact with map'}
                    </Typography>
                  </Box>
                )}
              </Box>
            </FadeIn>
          </Box>
        </Container>
      </Box>

      {/* 3. Medical Care Timeline - 2-Row Process Flow */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 4, lg: 6 } }}>
          <FadeIn>
            <MedicalCareTimeline />
          </FadeIn>
          
          {/* Conclusion Section */}
          <FadeIn delay={300}>
            <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6 }}>
              <GlassCard sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.95)', borderLeft: 6, borderColor: 'primary.main' }}>
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
                    sx={{ py: 2, px: 6, fontSize: '1.2rem', fontWeight: 'bold' }}
                >
                    {t('schedulePage.title')}
                </Button>
            </Box>
          </FadeIn>
        </Container>
      </Box>
    </>
  );
};

export default MedicalTravel;
