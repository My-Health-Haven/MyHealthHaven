import React from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import FadeIn from '../components/FadeIn';
import { useLanguage } from '../context/LanguageContext';

const GOOGLE_DOC_URL =
  'https://docs.google.com/document/d/1vlY_nuKyLar6o-xeFXDWfWcG1WzLVvddv0LeECiE2ZY/edit?usp=sharing';
const GOOGLE_DOC_PREVIEW_URL =
  'https://docs.google.com/document/d/1vlY_nuKyLar6o-xeFXDWfWcG1WzLVvddv0LeECiE2ZY/preview';

const COPY = {
  en: {
    title: 'For Employers',
    viewerTitle: 'Employer Documentation',
    sampleDoc: 'Download Sample Document',
    openFrame: 'Open Document',
  },
  es: {
    title: 'Para Empleadores',
    viewerTitle: 'Documentación para Empleadores',
    sampleDoc: 'Descargar Documento de Ejemplo',
    openFrame: 'Abrir Documento',
  },
};

const ForEmployers = () => {
  const { language } = useLanguage();
  const copy = COPY[language] || COPY.en;

  return (
    <>
      <Helmet>
        <title>{copy.title} | MyHealth Haven</title>
        <meta
          name="description"
          content="Information and documentation for employers."
        />
      </Helmet>

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
                  <Button
                    size="small"
                    variant="contained"
                    href="/employers-benefits-sample.rtf"
                    startIcon={<DownloadRoundedIcon />}
                    sx={{
                      bgcolor: '#2d2018',
                      color: 'white',
                      boxShadow: 'none',
                      '&:hover': {
                        bgcolor: '#1a120e',
                        boxShadow: '0 4px 12px rgba(45,32,24,0.2)',
                      },
                    }}
                  >
                    {copy.sampleDoc}
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
