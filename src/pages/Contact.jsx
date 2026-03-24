import React from 'react';
import { Container, Typography, Box, Button, TextField, Stack } from '@mui/material';
import GlassCard from '../components/GlassCard';
import Seo from '../seo/Seo';
import {
  createBreadcrumbSchema,
  createContactPageSchema,
  createOrganizationSchema,
} from '../seo/siteSeo';

import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { language, t } = useLanguage();
  const seoTitle =
    language === 'es'
      ? 'Contacte a un Navegador de Salud | MyHealth Haven'
      : 'Contact a Health Navigator | MyHealth Haven';
  const seoDescription =
    language === 'es'
      ? 'Contacte a MyHealth Haven para hablar sobre opciones de procedimientos, logistica y apoyo personalizado para atencion transfronteriza.'
      : 'Contact MyHealth Haven to discuss procedure options, logistics, and personalized cross-border care support.';
  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/contact"
        image="/logo.jpg"
        schema={[
          createContactPageSchema({
            path: '/contact',
            name: seoTitle,
            description: seoDescription,
            image: '/logo.jpg',
          }),
          createOrganizationSchema(),
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: language === 'es' ? 'Contacto' : 'Contact', path: '/contact' },
          ]),
        ]}
      />

      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
            <Typography variant="h2" gutterBottom color="primary.main">{t('contactPage.title')}</Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              {t('contactPage.subtitle')}
            </Typography>

            <GlassCard sx={{ mt: 4, width: '100%', p: 4 }}>
              <Box component="form" noValidate autoComplete="off">
              <Stack spacing={3}>
                  <TextField label={t('contactPage.formName')} variant="outlined" fullWidth />
                  <TextField label={t('contactPage.formEmail')} variant="outlined" fullWidth />
                  <TextField label={t('contactPage.formPhone')} variant="outlined" fullWidth />
                  <TextField label={t('contactPage.formMessage')} variant="outlined" multiline rows={4} fullWidth />
                  <Button variant="contained" size="large" sx={{ alignSelf: 'start' }}>
                      {t('contactPage.submitButton')}
                  </Button>
              </Stack>
              </Box>
            </GlassCard>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Contact;
