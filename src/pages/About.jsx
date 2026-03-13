import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import GlassCard from '../components/GlassCard';
import { useLanguage } from '../context/LanguageContext';

const pageContent = {
  en: {
    eyebrow: 'About Us',
    title: 'We make medical care abroad feel structured, supported, and human.',
    intro:
      'Seeking medical care abroad can be overwhelming. Patients often face language barriers, unfamiliar healthcare systems, logistical complexity, and limited post-procedure support.',
    solutionTitle: 'How MyHealth Haven responds',
    solutionIntro:
      'MyHealth Haven addresses these challenges head-on by delivering a comprehensive, patient-first experience that includes:',
    pillars: [
      'Personalized care coordination before, during, and after treatment',
      'Trusted access to world-class physicians and accredited facilities',
      'End-to-end logistical support, from travel and lodging to recovery planning',
      'Cultural and language translation services to ease every interaction',
    ],
    closingTitle: 'Our Promise',
    closing:
      "We do not just book appointments, we curate a healing experience, ensuring every patient is seen, supported, and safe at every step of their medical journey abroad.",
    supportLine:
      'From first inquiry to recovery, our role is to reduce uncertainty and make the entire process easier to navigate.',
    estimateCta: 'Free Estimate',
    contactCta: 'Speak with a Health Navigator™',
    metaTitle: 'About MyHealth Haven | Patient-First Medical Travel Support',
    metaDescription:
      'Learn how MyHealth Haven helps patients navigate medical care abroad with trusted providers, care coordination, and end-to-end support.',
  },
  es: {
    eyebrow: 'Sobre Nosotros',
    title: 'Hacemos que la atención médica en el extranjero se sienta estructurada, acompañada y humana.',
    intro:
      'Buscar atención médica en el extranjero puede ser abrumador. Los pacientes suelen enfrentar barreras de idioma, sistemas de salud desconocidos, complejidad logística y apoyo limitado después del procedimiento.',
    solutionTitle: 'Cómo responde MyHealth Haven',
    solutionIntro:
      'MyHealth Haven enfrenta estos desafíos de manera directa al ofrecer una experiencia integral, centrada en el paciente, que incluye:',
    pillars: [
      'Coordinación personalizada de la atención antes, durante y después del tratamiento',
      'Acceso confiable a médicos de clase mundial y centros acreditados',
      'Apoyo logístico de principio a fin, desde el viaje y el hospedaje hasta la planificación de la recuperación',
      'Servicios de traducción cultural y de idioma para facilitar cada interacción',
    ],
    closingTitle: 'Nuestro Compromiso',
    closing:
      'No solo programamos citas, diseñamos una experiencia de recuperación para asegurar que cada paciente sea visto, acompañado y protegido en cada etapa de su atención médica en el extranjero.',
    supportLine:
      'Desde la primera consulta hasta la recuperación, nuestra función es reducir la incertidumbre y hacer que todo el proceso sea más claro.',
    estimateCta: 'Presupuesto Gratis',
    contactCta: 'Hable con un Navegador de Salud™',
    metaTitle: 'Sobre MyHealth Haven | Apoyo centrado en el paciente',
    metaDescription:
      'Conozca cómo MyHealth Haven ayuda a los pacientes a navegar la atención médica en el extranjero con proveedores confiables, coordinación y apoyo completo.',
  },
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

      <Box sx={{ bgcolor: '#F5FAF8' }}>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            py: { xs: 10, md: 14 },
            background:
              'linear-gradient(135deg, rgba(224,247,240,0.95) 0%, rgba(255,255,255,0.98) 55%, rgba(236,245,255,0.98) 100%)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -120,
              right: -90,
              width: { xs: 220, md: 340 },
              height: { xs: 220, md: 340 },
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(0,137,123,0.18) 0%, rgba(0,137,123,0) 72%)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -120,
              left: -70,
              width: { xs: 200, md: 300 },
              height: { xs: 200, md: 300 },
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(0,105,92,0.14) 0%, rgba(0,105,92,0) 72%)',
            },
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <FadeIn>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.dark',
                  letterSpacing: 2.4,
                  fontWeight: 800,
                }}
              >
                {content.eyebrow}
              </Typography>
              <Typography variant="h1" sx={{ maxWidth: 900, mt: 1.5, mb: 3 }}>
                {content.title}
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ maxWidth: 860, lineHeight: 1.7 }}
              >
                {content.intro}
              </Typography>
            </FadeIn>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Grid container spacing={3} alignItems="stretch">
            <Grid size={{ xs: 12, md: 5 }}>
              <FadeIn>
                <GlassCard
                  sx={{
                    height: '100%',
                    p: { xs: 3, md: 4 },
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(235,248,244,0.96) 100%)',
                  }}
                >
                  <Typography variant="h3" gutterBottom>
                    {content.solutionTitle}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {content.solutionIntro}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: 'primary.dark',
                      lineHeight: 1.75,
                    }}
                  >
                    {content.supportLine}
                  </Typography>
                </GlassCard>
              </FadeIn>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <Grid container spacing={2}>
                {content.pillars.map((pillar, index) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={pillar}>
                    <FadeIn delay={120 + index * 70}>
                      <Box
                        sx={{
                          height: '100%',
                          p: 3,
                          borderRadius: 4,
                          bgcolor: 'rgba(255,255,255,0.88)',
                          border: '1px solid rgba(0,137,123,0.12)',
                          boxShadow: '0 16px 34px rgba(15,23,42,0.08)',
                        }}
                      >
                        <Typography
                          variant="overline"
                          sx={{
                            display: 'block',
                            color: 'primary.main',
                            fontWeight: 800,
                            letterSpacing: 2,
                            mb: 1,
                          }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1.7 }}>
                          {pillar}
                        </Typography>
                      </Box>
                    </FadeIn>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <FadeIn delay={320}>
            <Box
              sx={{
                mt: 5,
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                bgcolor: 'white',
                border: '1px solid rgba(0,137,123,0.12)',
                boxShadow: '0 22px 46px rgba(15,23,42,0.08)',
              }}
            >
              <Typography variant="h3" gutterBottom>
                {content.closingTitle}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 920, fontSize: '1.05rem', lineHeight: 1.8 }}
              >
                {content.closing}
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mt: 4 }}
              >
                <Button variant="contained" size="large" component={Link} to="/estimate">
                  {content.estimateCta}
                </Button>
                <Button variant="outlined" size="large" component={Link} to="/contact">
                  {content.contactCta}
                </Button>
              </Stack>
            </Box>
          </FadeIn>
        </Container>
      </Box>
    </>
  );
};

export default About;
