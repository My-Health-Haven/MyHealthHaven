import React from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import FadeIn from '../components/FadeIn';
import Seo from '../seo/Seo';
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from '../seo/siteSeo';
import { useLanguage } from '../context/LanguageContext';

const GOOGLE_DOC_URL =
  'https://docs.google.com/document/d/1jWAls4pNKGwofLfdTIMVhhCrZvdIfwFF9vjJShqG7qs/edit?usp=sharing';
const GOOGLE_DOC_PREVIEW_URL =
  'https://docs.google.com/document/d/1jWAls4pNKGwofLfdTIMVhhCrZvdIfwFF9vjJShqG7qs/preview';

const COPY = {
  en: {
    title: 'For Employers',
    viewerTitle: 'Employer Documentation',
    openFrame: 'Open Document',
    metaDescription:
      'Employer resources for evaluating guided cross-border care, cost transparency, and patient support through MyHealth Haven.',
    intro:
      'Review employer-facing information about how MyHealth Haven supports teams exploring structured, guided access to care in Mexico.',
    highlights: [
      'Program overview and employer-facing documentation',
      'How care coordination, travel support, and patient guidance work',
      'A sample resource your team can download and review offline',
    ],
  },
  es: {
    title: 'Para Empleadores',
    viewerTitle: 'Documentacion para Empleadores',
    openFrame: 'Abrir Documento',
    metaDescription:
      'Recursos para empleadores sobre atencion transfronteriza guiada, claridad de costos y acompanamiento al paciente con MyHealth Haven.',
    intro:
      'Revise informacion orientada a empleadores sobre como MyHealth Haven apoya a equipos que exploran acceso estructurado y guiado a atencion en Mexico.',
    highlights: [
      'Resumen del programa y documentacion orientada a empleadores',
      'Como funcionan la coordinacion de atencion, el apoyo de viaje y el acompanamiento al paciente',
      'Un recurso de ejemplo que su equipo puede descargar y revisar sin conexion',
    ],
  },
};

const ForEmployers = () => {
  const { language } = useLanguage();
  const copy = COPY[language] || COPY.en;

  return (
    <>
      <Seo
        title={`${copy.title} | MyHealth Haven`}
        description={copy.metaDescription}
        canonicalPath="/employers"
        image="/Corporate Medical Plaza.jpg"
        schema={[
          createWebPageSchema({
            path: '/employers',
            name: `${copy.title} | MyHealth Haven`,
            description: copy.metaDescription,
            image: '/Corporate Medical Plaza.jpg',
          }),
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: copy.title, path: '/employers' },
          ]),
        ]}
      />

      <Box
        sx={{
          minHeight: '100vh',
          py: { xs: 8, md: 12 },
          background:
            'linear-gradient(180deg, #f5efe5 0%, #ece6da 36%, #f8f6f1 100%)',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 5, lg: 8 } }}>
          <FadeIn>
            <Typography variant="h1" sx={{ color: '#2d2018', mb: 6, textAlign: 'center' }}>
              {copy.title}
            </Typography>
          </FadeIn>

          <FadeIn delay={60}>
            <Box sx={{ maxWidth: 840, mx: 'auto', mb: 5, textAlign: 'center' }}>
              <Typography variant="body1" sx={{ color: '#4a3b30', lineHeight: 1.8 }}>
                {copy.intro}
              </Typography>
              <Stack spacing={1.5} sx={{ mt: 3, textAlign: 'left' }}>
                {copy.highlights.map((item) => (
                  <Typography key={item} variant="body2" sx={{ color: '#4a3b30' }}>
                    - {item}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </FadeIn>

          <FadeIn delay={100}>
            <Box
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 24px 64px rgba(35, 28, 20, 0.12)',
                bgcolor: 'white',
              }}
            >
              {/* Header bar */}
              <Box
                sx={{
                  px: 3,
                  py: 2,
                  bgcolor: '#ffffff',
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2d2018' }}>
                  {copy.viewerTitle}
                </Typography>
                <Stack direction="row" spacing={1.5} flexWrap="wrap">
                  <Button
                    size="small"
                    variant="outlined"
                    href={GOOGLE_DOC_URL}
                    target="_blank"
                    rel="noreferrer"
                    startIcon={<OpenInNewRoundedIcon />}
                    sx={{
                      borderColor: 'rgba(45,32,24,0.2)',
                      color: '#2d2018',
                      '&:hover': {
                        borderColor: 'rgba(45,32,24,0.4)',
                        bgcolor: 'rgba(45,32,24,0.04)',
                      },
                    }}
                  >
                    {copy.openFrame}
                  </Button>
                </Stack>
              </Box>

              {/* Iframe container */}
              <Box
                sx={{
                  width: '100%',
                  bgcolor: '#f8f9fa',
                  position: 'relative',
                  pt: '100%', // Fallback ratio
                  height: { xs: '70vh', md: '80vh' },
                  minHeight: 600,
                  p: 0,
                  m: 0,
                }}
              >
                <Box
                  component="iframe"
                  title={copy.viewerTitle}
                  src={GOOGLE_DOC_PREVIEW_URL}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                />
              </Box>
            </Box>
          </FadeIn>
        </Container>
      </Box>
    </>
  );
};

export default ForEmployers;

