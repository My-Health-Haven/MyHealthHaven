'use client';
import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import GlassCard from '../components/GlassCard';
import { useLanguage } from '../context/LanguageContext';

const Schedule = () => {
  const { language, t } = useLanguage();
  return (
    <>
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
              <Typography variant="h2" align="center" gutterBottom color="primary.main">
                {t('schedulePage.title')}
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6 }}>
                 {t('schedulePage.subtitle')}
              </Typography>
              <Typography
                variant="body1"
                align="center"
                color="text.secondary"
                sx={{ maxWidth: 760, mx: 'auto', mb: 4 }}
              >
                {language === 'es'
                  ? 'Use el calendario en vivo para elegir un horario que le permita revisar opciones de procedimientos, logistica de viaje y el mejor siguiente paso con nuestro equipo.'
                  : 'Use the live calendar below to pick a time to review procedure options, travel logistics, and the best next step with our team.'}
              </Typography>

              <GlassCard sx={{ p: 0, overflow: 'hidden', height: '1200px' }}>
                  {/* Google Calendar Appointment Scheduling begin */}
              <iframe 
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ16B63n7brNHN9Y_vqxeKi7ymLdMa1b9atimdbiYwKA4RNY6mRKB1ilUFJq6E0X1VGcWuKloAdk?gv=true" 
                  style={{ border: 0, width: '100%', height: '100%' }} 
                  frameBorder="0"
              ></iframe>
              {/* end Google Calendar Appointment Scheduling */}
              </GlassCard>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Schedule;
