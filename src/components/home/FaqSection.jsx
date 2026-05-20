'use client';
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FadeIn from '@/components/FadeIn';
import { useLanguage } from '@/context/LanguageContext';

const FaqSection = () => {
  const { t } = useLanguage();

  return (
    <Box id="faq" sx={{ pt: { xs: 2, md: 3 }, pb: { xs: 3, md: 6 }, bgcolor: 'transparent' }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
        <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
          <Typography variant="h2" color="primary.main" align="center" gutterBottom>{t('home.faqTitle')}</Typography>
          <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6 }}>{t('home.faqSubtitle')}</Typography>
          <Stack spacing={1}>
            {Array.from({ length: 13 }, (_, i) => ({
              q: t(`home.faq${i + 1}Q`),
              a: t(`home.faq${i + 1}A`)
            })).map((faq, i) => (
              <FadeIn key={i} delay={i * 100}>
                <Accordion sx={{
                  // mb: 1, // Handled by Stack
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07), inset 0 0 20px rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px !important', // Force rounded corners
                  '&:before': { display: 'none' }, // Remove default divider
                }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" fontWeight="bold">{faq.q}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">{faq.a}</Typography>
                  </AccordionDetails>
                </Accordion>
              </FadeIn>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default FaqSection;
