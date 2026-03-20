import React from 'react';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import { useLanguage } from '../context/LanguageContext';

const pageContent = {
  en: {
    eyebrow: 'About Us',
    title: 'We make medical care abroad feel structured, supported, and human.',
    intro:
      'Seeking medical care abroad can be overwhelming. Patients often face language barriers, unfamiliar healthcare systems, logistical complexity, and limited post-procedure support.',
    sectionTitle: 'How MyHealth Haven responds',
    sectionIntro:
      'MyHealth Haven addresses these challenges head-on by delivering a comprehensive, patient-first experience that includes:',
    pillars: [
      'Personalized care coordination before, during, and after treatment',
      'Trusted access to world-class physicians and accredited facilities',
      'End-to-end logistical support, from travel and lodging to recovery planning',
      'Cultural and language translation services to ease every interaction',
    ],
    promiseTitle: 'Our Promise',
    closing:
      'We do not just book consultations, we curate a healing experience, ensuring every patient is seen, supported, and safe at every step of their medical journey abroad.',
    supportLine:
      'From first inquiry to recovery, our role is to reduce uncertainty and make the full process easier to navigate.',
    estimateCta: 'Free Estimate',
    contactCta: 'Speak with a Health Navigator\u2122',
    metaTitle: 'About MyHealth Haven | Patient-First Medical Travel Support',
    metaDescription:
      'Learn how MyHealth Haven helps patients navigate medical care abroad with trusted providers, care coordination, and end-to-end support.',
  },
  es: {
    eyebrow: 'Sobre Nosotros',
    title: 'Hacemos que la atencion medica en el extranjero se sienta estructurada, acompanada y humana.',
    intro:
      'Buscar atencion medica en el extranjero puede ser abrumador. Los pacientes suelen enfrentar barreras de idioma, sistemas de salud desconocidos, complejidad logistica y apoyo limitado despues del procedimiento.',
    sectionTitle: 'Como responde MyHealth Haven',
    sectionIntro:
      'MyHealth Haven enfrenta estos desafios de manera directa al ofrecer una experiencia integral, centrada en el paciente, que incluye:',
    pillars: [
      'Coordinacion personalizada de la atencion antes, durante y despues del tratamiento',
      'Acceso confiable a medicos de clase mundial y centros acreditados',
      'Apoyo logistico de principio a fin, desde el viaje y el hospedaje hasta la planificacion de la recuperacion',
      'Servicios de traduccion cultural y de idioma para facilitar cada interaccion',
    ],
    promiseTitle: 'Nuestro Compromiso',
    closing:
      'No solo programamos citas, diseniamos una experiencia de recuperacion para asegurar que cada paciente sea visto, acompanado y protegido en cada etapa de su atencion medica en el extranjero.',
    supportLine:
      'Desde la primera consulta hasta la recuperacion, nuestra funcion es reducir la incertidumbre y hacer que todo el proceso sea mas claro.',
    estimateCta: 'Presupuesto Gratis',
    contactCta: 'Hable con un Navegador de Salud\u2122',
    metaTitle: 'Sobre MyHealth Haven | Apoyo centrado en el paciente',
    metaDescription:
      'Conozca como MyHealth Haven ayuda a los pacientes a navegar la atencion medica en el extranjero con proveedores confiables, coordinacion y apoyo completo.',
  },
};

const featureCardSx = {
  height: '100%',
  minHeight: { xs: 150, md: 176 },
  p: { xs: 2.5, md: 3 },
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(244,250,247,0.98) 100%)',
  border: '1px solid rgba(0,137,123,0.12)',
  boxShadow: '0 16px 34px rgba(15,23,42,0.07)',
};

const About = () => {
  const { language } = useLanguage();
  const content = pageContent[language] || pageContent.en;

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
      </Helmet>

      <Box
        sx={{
          minHeight: '100vh',
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #EEF7F4 0%, #F6FBFF 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -140,
            right: -80,
            width: { xs: 260, md: 420 },
            height: { xs: 260, md: 420 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,137,123,0.16) 0%, rgba(0,137,123,0) 74%)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -180,
            left: -120,
            width: { xs: 300, md: 460 },
            height: { xs: 300, md: 460 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,105,92,0.1) 0%, rgba(0,105,92,0) 72%)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <Box sx={{ textAlign: 'center', maxWidth: 860, mx: 'auto', mb: { xs: 5, md: 7 } }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.dark',
                  letterSpacing: 2.6,
                  fontWeight: 800,
                }}
              >
                {content.eyebrow}
              </Typography>
              <Typography variant="h1" sx={{ mt: 1.5, mb: 3 }}>
                {content.title}
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ lineHeight: 1.75, maxWidth: 820, mx: 'auto' }}
              >
                {content.intro}
              </Typography>
            </Box>
          </FadeIn>

          <FadeIn delay={120}>
            <Box
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 5,
                background: 'rgba(255,255,255,0.72)',
                border: '1px solid rgba(255,255,255,0.7)',
                backdropFilter: 'blur(18px)',
                boxShadow: '0 24px 60px rgba(15,23,42,0.1)',
              }}
            >
              <Box sx={{ maxWidth: 760, mb: { xs: 3, md: 4 } }}>
                <Typography variant="h3" gutterBottom>
                  {content.sectionTitle}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontSize: '1.05rem', lineHeight: 1.8 }}
                >
                  {content.sectionIntro}
                </Typography>
              </Box>

              <Grid container spacing={2.5}>
                {content.pillars.map((pillar, index) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={pillar}>
                    <Box sx={featureCardSx}>
                      <Typography
                        variant="overline"
                        sx={{
                          display: 'block',
                          color: 'primary.main',
                          fontWeight: 800,
                          letterSpacing: 2,
                          mb: 2,
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 700, lineHeight: 1.7, color: 'text.primary' }}
                      >
                        {pillar}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box
                sx={{
                  mt: { xs: 4, md: 5 },
                  pt: { xs: 4, md: 5 },
                  borderTop: '1px solid rgba(0,137,123,0.12)',
                }}
              >
                <Grid container spacing={3} alignItems="center">
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Typography variant="h3" gutterBottom>
                      {content.promiseTitle}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontSize: '1.05rem', lineHeight: 1.8, mb: 2 }}
                    >
                      {content.closing}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: 'primary.dark', fontWeight: 700, lineHeight: 1.75 }}
                    >
                      {content.supportLine}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row', md: 'column' }}
                      spacing={2}
                      sx={{ height: '100%', justifyContent: 'center' }}
                    >
                      <Button variant="contained" size="large" component={Link} to="/estimate">
                        {content.estimateCta}
                      </Button>
                      <Button variant="outlined" size="large" component={Link} to="/contact">
                        {content.contactCta}
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </FadeIn>
        </Container>
      </Box>
    </>
  );
};

export default About;
