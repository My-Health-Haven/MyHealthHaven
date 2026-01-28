import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import GlassCard from '../components/GlassCard';
import { useLanguage } from '../context/LanguageContext';

const Schedule = () => {
  const { t } = useLanguage();

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
        <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
            <Typography variant="h2" align="center" gutterBottom color="primary.main">
              {t('schedulePage.title')}
            </Typography>
             <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6 }}>
               {t('schedulePage.subtitle')}
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
  );
};

export default Schedule;
