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
  'https://docs.google.com/document/d/1nIfNNsPdV0ZApVAkHKaeWnFv-oR8EI9YqQSOMeCWFTY/edit?usp=sharing';
const GOOGLE_DOC_PREVIEW_URL =
  'https://docs.google.com/document/d/1nIfNNsPdV0ZApVAkHKaeWnFv-oR8EI9YqQSOMeCWFTY/preview';

const COPY = {
  en: {
    title: 'For Providers',
    viewerTitle: 'Provider Documentation',
    openFrame: 'Open Document',
    metaDescription:
      'Provider resources for partnering with MyHealth Haven on guided cross-border care, patient coordination, and quality standards.',
    intro:
      'Review provider-facing information about how MyHealth Haven partners with medical professionals and facilities to deliver structured, guided cross-border care.',
    highlights: [
      'Partnership overview and provider-facing documentation',
      'How care coordination, quality standards, and patient handoff work',
      'Details on credentialing, vetting, and ongoing performance review',
    ],
  },
  es: {
    title: 'Para Proveedores',
    viewerTitle: 'Documentacion para Proveedores',
    openFrame: 'Abrir Documento',
    metaDescription:
      'Recursos para proveedores sobre la asociacion con MyHealth Haven en atencion transfronteriza guiada, coordinacion de pacientes y estandares de calidad.',
    intro:
      'Revise informacion orientada a proveedores sobre como MyHealth Haven se asocia con profesionales medicos e instalaciones para brindar atencion transfronteriza estructurada y guiada.',
    highlights: [
      'Resumen de la asociacion y documentacion orientada a proveedores',
      'Como funcionan la coordinacion de atencion, los estandares de calidad y la transferencia de pacientes',
      'Detalles sobre acreditacion, verificacion y revision continua de desempeno',
    ],
  },
};

const ForProviders = () => {
  const { language } = useLanguage();
  const copy = COPY[language] || COPY.en;

  return (
    <>
      <Seo
        title={`${copy.title} | MyHealth Haven`}
        description={copy.metaDescription}
        canonicalPath="/providers"
        image="/Corporate Medical Plaza.jpg"
        schema={[
          createWebPageSchema({
            path: '/providers',
            name: `${copy.title} | MyHealth Haven`,
            description: copy.metaDescription,
            image: '/Corporate Medical Plaza.jpg',
          }),
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: copy.title, path: '/providers' },
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
                  pt: '100%',
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

export default ForProviders;
