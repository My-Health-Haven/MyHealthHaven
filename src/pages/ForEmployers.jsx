import React from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import FadeIn from '../components/FadeIn';
import { useLanguage } from '../context/LanguageContext';

const GOOGLE_DOC_URL =
  'https://docs.google.com/document/d/1vlY_nuKyLar6o-xeFXDWfWcG1WzLVvddv0LeECiE2ZY/edit?usp=sharing';
const GOOGLE_DOC_PREVIEW_URL =
  'https://docs.google.com/document/d/1vlY_nuKyLar6o-xeFXDWfWcG1WzLVvddv0LeECiE2ZY/preview';

const COPY = {
  en: {
    badge: 'Demo only - not in scoped hours',
    title: 'For Employers',
    subtitle:
      'This page intentionally shows how awkward a Word-style document embed feels inside the website.',
    reasonsTitle: 'Why this is a poor fit',
    reasons: [
      'It sits inside a boxed viewer instead of becoming part of the site layout.',
      'Typography, spacing, and buttons no longer match the rest of the website.',
      'Mobile viewing usually turns into pinching, zooming, and double scrolling.',
      'Styling control is limited compared with a real web page.',
      'It behaves more like a file preview than a proper landing page.',
    ],
    viewerTitle: 'Embedded document example',
    viewerNote:
      'This uses the actual shared Google Doc inside an embedded frame, which is closer to what a real document-first approach would feel like on the site.',
    sampleDoc: 'Download sample Word-style file',
    openFrame: 'Open Google Doc',
    openPreview: 'Open embed preview',
    belowFrame:
      'If the document sharing settings are changed or restricted, the embed can also break or show a permissions wall inside the page.',
  },
  es: {
    badge: 'Solo demostracion - fuera del alcance',
    title: 'Para Empleadores',
    subtitle:
      'Esta pagina muestra intencionalmente lo incomodo que se siente incrustar un documento tipo Word dentro del sitio.',
    reasonsTitle: 'Por que encaja mal',
    reasons: [
      'Queda atrapado dentro de un visor en lugar de integrarse al layout del sitio.',
      'La tipografia, el espaciado y los botones dejan de coincidir con el resto del sitio.',
      'En movil normalmente termina en zoom, pellizcar y doble scroll.',
      'El control visual es muy limitado comparado con una pagina real.',
      'Se siente mas como vista previa de archivo que como landing page.',
    ],
    viewerTitle: 'Ejemplo de documento incrustado',
    viewerNote:
      'Esto usa el Google Doc real compartido dentro de un marco incrustado, que se acerca mas a como se sentiria una solucion basada en documento dentro del sitio.',
    sampleDoc: 'Descargar archivo de ejemplo',
    openFrame: 'Abrir Google Doc',
    openPreview: 'Abrir vista incrustada',
    belowFrame:
      'Si cambian los permisos del documento o se restringe el acceso, la incrustacion tambien puede romperse o mostrar una barrera de permisos dentro de la pagina.',
  },
};

const ForEmployers = () => {
  const { language } = useLanguage();
  const copy = COPY[language] || COPY.en;

  return (
    <>
      <Helmet>
        <title>For Employers | Document Embed Demo | MyHealth Haven</title>
        <meta
          name="description"
          content="Demonstration page showing how awkward a document-style embed can feel inside the website."
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
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 5, lg: 8 } }}>
          <FadeIn>
            <Stack spacing={2} sx={{ maxWidth: 760, mb: 6 }}>
              <Chip
                label={copy.badge}
                icon={<WarningAmberRoundedIcon />}
                color="warning"
                sx={{ alignSelf: 'flex-start', fontWeight: 700 }}
              />
              <Typography variant="h1" sx={{ color: '#2d2018' }}>
                {copy.title}
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: 'rgba(45,32,24,0.72)', maxWidth: 680 }}
              >
                {copy.subtitle}
              </Typography>
            </Stack>
          </FadeIn>

          <Grid container spacing={4} alignItems="start">
            <Grid size={{ xs: 12, md: 4 }}>
              <FadeIn delay={100}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor: 'rgba(255,255,255,0.76)',
                    border: '1px solid rgba(60,46,37,0.12)',
                    boxShadow: '0 18px 42px rgba(51, 38, 28, 0.08)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ mb: 2, color: '#2d2018', letterSpacing: '-0.02em' }}
                  >
                    {copy.reasonsTitle}
                  </Typography>
                  <Stack spacing={1.5}>
                    {copy.reasons.map((reason) => (
                      <Typography
                        key={reason}
                        variant="body1"
                        sx={{ color: 'rgba(45,32,24,0.78)', lineHeight: 1.7 }}
                      >
                        {`- ${reason}`}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              </FadeIn>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <FadeIn delay={180}>
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: '1px solid rgba(39,39,42,0.28)',
                    boxShadow: '0 20px 50px rgba(35, 28, 20, 0.16)',
                    bgcolor: '#b8bcc4',
                  }}
                >
                  <Box
                    sx={{
                      px: 2,
                      py: 1.25,
                      bgcolor: '#404650',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {copy.viewerTitle}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Button
                        size="small"
                        variant="outlined"
                        color="inherit"
                        href={GOOGLE_DOC_URL}
                        target="_blank"
                        rel="noreferrer"
                        startIcon={<OpenInNewRoundedIcon />}
                        sx={{
                          borderColor: 'rgba(255,255,255,0.32)',
                          color: 'white',
                        }}
                      >
                        {copy.openFrame}
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="inherit"
                        href={GOOGLE_DOC_PREVIEW_URL}
                        target="_blank"
                        rel="noreferrer"
                        startIcon={<OpenInNewRoundedIcon />}
                        sx={{
                          borderColor: 'rgba(255,255,255,0.32)',
                          color: 'white',
                        }}
                      >
                        {copy.openPreview}
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        href="/employers-benefits-sample.rtf"
                        startIcon={<DownloadRoundedIcon />}
                        sx={{
                          bgcolor: '#d8e2f0',
                          color: '#233041',
                          '&:hover': { bgcolor: '#c6d3e6' },
                        }}
                      >
                        {copy.sampleDoc}
                      </Button>
                    </Stack>
                  </Box>

                  <Box sx={{ p: { xs: 1, md: 2 }, bgcolor: '#9aa1ab' }}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: 'hidden',
                        border: '1px solid rgba(40,40,40,0.32)',
                        bgcolor: '#d7d9de',
                      }}
                    >
                      <Box
                        component="iframe"
                        title={copy.viewerTitle}
                        src={GOOGLE_DOC_PREVIEW_URL}
                        sx={{
                          display: 'block',
                          width: '100%',
                          minHeight: { xs: 560, md: 860 },
                          border: 0,
                          bgcolor: '#d7d9de',
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </FadeIn>

              <FadeIn delay={250}>
                <Typography
                  variant="body2"
                  sx={{ mt: 2, color: 'rgba(45,32,24,0.72)', lineHeight: 1.7 }}
                >
                  {copy.viewerNote}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: 'rgba(45,32,24,0.72)', lineHeight: 1.7 }}
                >
                  {copy.belowFrame}
                </Typography>
              </FadeIn>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ForEmployers;
