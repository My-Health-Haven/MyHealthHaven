'use client';
import React from 'react';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import FadeIn from '../components/FadeIn';
import { useLanguage } from '../context/LanguageContext';

const pageContent = {
  en: {
    eyebrow: 'About Us',
    title: 'Medical Care Abroad\u2014Structured, Supported, and Personal',
    intro:
      'Seeking medical care outside the United States can feel uncertain. Patients often face unfamiliar healthcare systems, language barriers, complex travel logistics, and questions about what happens after the procedure is complete.',
    introFollow: 'MyHealth Haven exists to remove that uncertainty.',
    sectionTitle: 'How MyHealth Haven Helps',
    sectionIntro:
      'MyHealth Haven provides a structured, patient-first navigation model designed to support every stage of the experience.',
    pillars: [
      {
        label: 'Personalized Care Coordination',
        description:
          'From the first inquiry through recovery, your Health Navigator\u2122 coordinates the process so you always know what comes next.',
      },
      {
        label: 'Trusted Physicians and Accredited Facilities',
        description:
          'We connect patients with carefully selected doctors, hospitals, and clinics that meet rigorous professional and safety standards.',
      },
      {
        label: 'End-to-End Travel and Recovery Planning',
        description:
          'Travel arrangements, lodging, scheduling, and recovery logistics are organized in advance so patients and families can focus on care.',
      },
      {
        label: 'Language and Cultural Navigation',
        description:
          'Clear communication matters in healthcare. Our team helps bridge language and cultural differences to ensure patients feel confident and understood.',
      },
    ],
    promiseTitle: 'Our Promise',
    closing:
      'MyHealth Haven is not a travel agency. We are a cross-border care navigation partner.',
    closingBody:
      'We guide patients through the entire process\u2014from first conversation to safe recovery\u2014so that medical care abroad is not only more accessible, but also more organized, transparent, and humane.',
    supportLine:
      'Our role is simple: reduce uncertainty, protect the patient experience, and help people move through care with confidence.',
    estimateCta: 'Free Estimate',
    contactCta: 'Speak with a Health Navigator\u2122',
    metaTitle: 'About MyHealth Haven | Patient-First Medical Travel Support',
    metaDescription:
      'Learn how MyHealth Haven helps patients navigate medical care abroad with trusted providers, care coordination, and end-to-end support.',
  },
  es: {
    eyebrow: 'Sobre Nosotros',
    title: 'Atencion Medica en el Extranjero\u2014Estructurada, Acompanada y Personal',
    intro:
      'Buscar atencion medica fuera de Estados Unidos puede generar incertidumbre. Los pacientes suelen enfrentar sistemas de salud desconocidos, barreras de idioma, logistica de viaje compleja y preguntas sobre que sucede despues del procedimiento.',
    introFollow: 'MyHealth Haven existe para eliminar esa incertidumbre.',
    sectionTitle: 'Como Ayuda MyHealth Haven',
    sectionIntro:
      'MyHealth Haven ofrece un modelo de navegacion estructurado, centrado en el paciente, disenado para apoyar cada etapa de la experiencia.',
    pillars: [
      {
        label: 'Coordinacion de Atencion Personalizada',
        description:
          'Desde la primera consulta hasta la recuperacion, su Health Navigator\u2122 coordina el proceso para que siempre sepa que viene despues.',
      },
      {
        label: 'Medicos de Confianza e Instalaciones Acreditadas',
        description:
          'Conectamos a los pacientes con medicos, hospitales y clinicas cuidadosamente seleccionados que cumplen rigurosos estandares profesionales y de seguridad.',
      },
      {
        label: 'Planificacion Integral de Viaje y Recuperacion',
        description:
          'Los arreglos de viaje, hospedaje, agenda y logistica de recuperacion se organizan con anticipacion para que los pacientes y sus familias puedan enfocarse en la atencion.',
      },
      {
        label: 'Navegacion Linguistica y Cultural',
        description:
          'La comunicacion clara es fundamental en la atencion medica. Nuestro equipo ayuda a superar las diferencias de idioma y cultura para que los pacientes se sientan seguros y comprendidos.',
      },
    ],
    promiseTitle: 'Nuestro Compromiso',
    closing:
      'MyHealth Haven no es una agencia de viajes. Somos un socio de navegacion de atencion transfronteriza.',
    closingBody:
      'Guiamos a los pacientes a traves de todo el proceso\u2014desde la primera conversacion hasta una recuperacion segura\u2014para que la atencion medica en el extranjero no solo sea mas accesible, sino tambien mas organizada, transparente y humana.',
    supportLine:
      'Nuestro rol es simple: reducir la incertidumbre, proteger la experiencia del paciente y ayudar a las personas a transitar su atencion con confianza.',
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
              {content.introFollow && (
                <Typography
                  variant="h5"
                  sx={{ mt: 3, fontWeight: 700, color: 'primary.dark', maxWidth: 820, mx: 'auto' }}
                >
                  {content.introFollow}
                </Typography>
              )}
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
                  <Grid size={{ xs: 12, sm: 6 }} key={pillar.label || pillar}>
                    <Box sx={featureCardSx}>
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
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 700, lineHeight: 1.7, color: 'text.primary', mb: 1 }}
                      >
                        {pillar.label || pillar}
                      </Typography>
                      {pillar.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ lineHeight: 1.7 }}
                        >
                          {pillar.description}
                        </Typography>
                      )}
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
                      sx={{ fontSize: '1.05rem', lineHeight: 1.8, mb: 2, fontWeight: 700, color: 'text.primary' }}
                    >
                      {content.closing}
                    </Typography>
                    {content.closingBody && (
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontSize: '1.05rem', lineHeight: 1.8, mb: 2 }}
                      >
                        {content.closingBody}
                      </Typography>
                    )}
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
                      <Button variant="contained" size="large" component={Link} href="/estimate">
                        {content.estimateCta}
                      </Button>
                      <Button variant="outlined" size="large" component={Link} href="/schedule">
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
