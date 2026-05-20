'use client';
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { useLanguage } from '@/context/LanguageContext';
import LinkNav from '@/components/home/LinkNav';

const FinalCtaSection = React.forwardRef(function FinalCtaSection(props, ref) {
  const { t } = useLanguage();

  return (
    <Box ref={ref} sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent', textAlign: 'center' }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
        <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
          <FadeIn>
            <Typography variant="overline" color="primary.main" fontWeight="bold">{t('home.ctaBadge')}</Typography>
            <Typography variant="h2" gutterBottom sx={{ mt: 2 }}><LinkNav text={t('home.ctaTitle')} /></Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              {t('home.ctaDesc')}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 4 }}>
              <Button variant="contained" size="large" component={Link} href="/schedule">{t('home.scheduleConsultation')}</Button>
              <Button variant="outlined" size="large" component={Link} href="/estimate">{t('home.getEstimate')}</Button>
            </Stack>

          </FadeIn>
        </Box>
      </Container>
    </Box>
  );
});

export default FinalCtaSection;
