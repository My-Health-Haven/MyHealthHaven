import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FadeIn from '../components/FadeIn';
import GlassCard from '../components/GlassCard';


import { useLanguage } from '../context/LanguageContext';

const MedicalTravel = () => {
  const { t } = useLanguage();
  return (
    <>
      <Helmet>
        <title>Medical Travel with Guidance | MyHealth Haven</title>
        <meta
          name="description"
          content="Understand how travel, safety, and logistics work when you receive care in Mexico with MyHealth Haven."
        />
      </Helmet>

      {/* 1. Hero Split */}
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
                component={Link} 
                to="/contact"
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    borderColor: 'rgba(255, 255, 255, 0.5)'
                  }
                }}
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
              <Box sx={{ mt: 6, width: '100%', height: { xs: 400, md: 500 }, borderRadius: 4, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                <iframe 
                  src="https://www.google.com/maps/d/embed?mid=1LWn2Sx3NCenBN4f_Wabr45-v7hhciJY&ehbc=2E312F&noprof=1" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  title="MyHealth Haven Operations Map"
                />
              </Box>
            </FadeIn>
          </Box>
        </Container>
      </Box>

      {/* 3. Travel Flow (Vertical Steps) */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
            <FadeIn>

              <Typography variant="h2" align="center" gutterBottom>{t('medicalTravelPage.timelineTitle')}</Typography>
              <Typography variant="h5" align="center" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
                {t('medicalTravelPage.timelineSubtitle')}
              </Typography>
            </FadeIn>
              <Stack spacing={4} sx={{ mt: 6, position: 'relative' }}>
                {/* Vertical Line */}
                <Box sx={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 2, bgcolor: 'primary.light', zIndex: 0, display: { xs: 'none', md: 'block' } }} />
                
                {(t('medicalTravelPage.timelineSteps') || []).map((step, i) => (
                  <FadeIn key={i} delay={i * 100}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        bgcolor: 'primary.main', 
                        color: 'white', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        flexShrink: 0,
                        mr: 3
                      }}>
                        {i + 1}
                      </Box>
                      <GlassCard sx={{ flexGrow: 1, p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                           <Typography variant="h6" fontWeight="bold" color="primary.main">
                             {typeof step === 'string' ? step : step.title}
                           </Typography>
                           {step.duration && (
                             <Box sx={{ bgcolor: 'primary.light', color: 'white', px: 1.5, py: 0.5, borderRadius: 2, fontSize: '0.875rem', fontWeight: 500 }}>
                               {step.duration}
                             </Box>
                           )}
                        </Box>
                        
                        {typeof step === 'string' ? (
                          <Typography variant="body1">{step}</Typography> 
                        ) : (
                          <>
                            <Typography variant="body1" paragraph color="text.secondary">
                              {step.description}
                            </Typography>
                            
                            {step.points && (
                              <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                                {step.points.map((point, idx) => (
                                  <Typography key={idx} component="li" variant="body1" color="text.primary" sx={{ mb: 0.5 }}>
                                    {point}
                                  </Typography>
                                ))}
                              </Box>
                            )}

                            {step.footer && (
                              <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'primary.main', fontWeight: 500, mt: 2 }}>
                                {step.footer}
                              </Typography>
                            )}
                          </>
                        )}
                      </GlassCard>
                    </Box>
                  </FadeIn>
                ))}

              {/* Conclusion Section */}
               <FadeIn delay={800}>
                 <Box sx={{ ml: { md: '64px' }, mt: 4 }}>
                    <GlassCard sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.9)', borderLeft: 6, borderColor: 'primary.main' }}>
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
               </FadeIn>
              </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MedicalTravel;
