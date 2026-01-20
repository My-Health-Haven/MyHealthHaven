import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUserJourney } from '../context/UserJourneyContext';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { resetJourney } = useUserJourney();
  const { t } = useLanguage();
  return (
    <Box component="footer" sx={{ bgcolor: 'white', py: 6, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box component="img" src="/logo.png" alt="MyHealth Haven Logo" sx={{ height: 32, mr: 1 }} />
              <Typography variant="h6" color="primary.main" fontWeight="bold">
                MyHealth Haven
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              {t('footer.slogan')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('footer.subSlogan')}
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle2" color="text.primary" gutterBottom fontWeight="bold">
              {t('footer.patients')}
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} to="/#how-it-works" color="text.secondary" variant="body2" underline="hover">{t('footer.howItWorks')}</MuiLink>
              <MuiLink component={Link} to="/procedures" color="text.secondary" variant="body2" underline="hover">{t('footer.procedures')}</MuiLink>
              <MuiLink component={Link} to="/medical-travel" color="text.secondary" variant="body2" underline="hover">{t('footer.medicalTravel')}</MuiLink>
              <MuiLink component={Link} to="/#faq" color="text.secondary" variant="body2" underline="hover">{t('footer.faqs')}</MuiLink>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle2" color="text.primary" gutterBottom fontWeight="bold">
              {t('footer.company')}
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} to="/about" color="text.secondary" variant="body2" underline="hover">{t('footer.aboutUs')}</MuiLink>
              <MuiLink component={Link} to="/employers" color="text.secondary" variant="body2" underline="hover">{t('footer.forEmployers')}</MuiLink>
              <MuiLink component={Link} to="/providers" color="text.secondary" variant="body2" underline="hover">{t('footer.forProviders')}</MuiLink>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="text.primary" gutterBottom fontWeight="bold">
              {t('footer.contact')}
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} to="/contact" color="text.secondary" variant="body2" underline="hover">{t('footer.speakWithNavigator')}</MuiLink>
              <MuiLink href="https://wa.me/12142763928" color="text.secondary" variant="body2" underline="hover" target="_blank" rel="noopener">{t('footer.whatsapp')}</MuiLink>
              <MuiLink href="mailto:hello@myhealthhaven.com" color="text.secondary" variant="body2" underline="hover">{t('footer.email')}</MuiLink>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5, pt: 3, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            {t('footer.copyright')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <MuiLink component={Link} to="/privacy" color="text.secondary" variant="body2" underline="hover">{t('footer.privacyPolicy')}</MuiLink>
            <MuiLink component={Link} to="/terms" color="text.secondary" variant="body2" underline="hover">{t('footer.termsOfUse')}</MuiLink>
            <Button onClick={resetJourney} size="small" sx={{ color: 'text.disabled', fontSize: '0.75rem', textTransform: 'none', ml: 2 }}>
              {t('footer.resetJourney')}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
