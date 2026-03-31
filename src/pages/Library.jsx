import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  CardContent,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';

import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import GlassCard from '../components/GlassCard';
import FadeIn from '../components/FadeIn';
import Seo from '../seo/Seo';
import {
  createBreadcrumbSchema,
  createCollectionPageSchema,
} from '../seo/siteSeo';
import { LIBRARY_ARTICLES, LIBRARY_PAGE_COPY } from '../data/libraryContent';
import { useLanguage } from '../context/LanguageContext';

const Library = () => {
  const { language } = useLanguage();
  const pageCopy = LIBRARY_PAGE_COPY[language] || LIBRARY_PAGE_COPY.en;
  const seoTitle =
    language === 'es'
      ? 'Biblioteca de Aprendizaje | MyHealth Haven'
      : 'Learning Library | MyHealth Haven';
  const seoDescription =
    language === 'es'
      ? 'Guias claras y basadas en evidencia sobre atencion transfronteriza, escritas para ayudarle a tomar decisiones con confianza.'
      : 'Calm, evidence-based guides to cross-border care, written by healthcare professionals.';

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/library"
        image="/cancun-skyline.jpg"
        schema={[
          createCollectionPageSchema({
            path: '/library',
            name: seoTitle,
            description: seoDescription,
            image: '/cancun-skyline.jpg',
          }),
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: language === 'es' ? 'Biblioteca' : 'Library', path: '/library' },
          ]),
        ]}
      />

      {/* ── Hero ── */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          textAlign: 'center',
          background:
            'linear-gradient(180deg, #f5efe5 0%, #ece6da 36%, #f8f6f1 100%)',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 5, lg: 8 } }}>
          <FadeIn>
            <Typography
              variant="h1"
              sx={{ color: '#2d2018', mb: 2 }}
            >
              {pageCopy.title}
            </Typography>
          </FadeIn>

          <FadeIn delay={80}>
            <Typography
              variant="h5"
              sx={{
                color: '#4a3b30',
                maxWidth: 640,
                mx: 'auto',
                lineHeight: 1.7,
                mb: 5,
              }}
            >
              {pageCopy.subtitle}
            </Typography>
          </FadeIn>

          <FadeIn delay={160}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/library/is-medical-travel-right-for-me"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                bgcolor: '#2d2018',
                color: 'white',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#1a120e',
                  boxShadow: '0 4px 16px rgba(45,32,24,0.2)',
                },
              }}
            >
              {pageCopy.cta}
            </Button>
          </FadeIn>
        </Container>
      </Box>

      {/* ── Article Cards ── */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#faf8f5' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 5, lg: 8 } }}>
          <FadeIn>
            <Typography
              variant="h2"
              sx={{ color: '#2d2018', mb: 1 }}
            >
              {pageCopy.featuredTopics}
            </Typography>
            <Box
              sx={{
                width: 48,
                height: 3,
                borderRadius: 2,
                bgcolor: '#2d2018',
                mb: 5,
              }}
            />
          </FadeIn>

          <Grid container spacing={4}>
            {LIBRARY_ARTICLES.map((article, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={article.slug}>
                <FadeIn delay={index * 120}>
                  <GlassCard
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 16px 48px rgba(45,32,24,0.10)',
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      {/* Badge */}
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.75,
                          bgcolor: 'rgba(45,32,24,0.06)',
                          borderRadius: 6,
                          px: 1.5,
                          py: 0.5,
                          mb: 2.5,
                        }}
                      >
                        <AutoStoriesRoundedIcon
                          sx={{ fontSize: 16, color: '#6b5744' }}
                        />
                        <Typography
                          variant="caption"
                          sx={{ color: '#6b5744', fontWeight: 600, letterSpacing: 0.5 }}
                        >
                          {pageCopy.guideLabel}
                        </Typography>
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: '#2d2018',
                          mb: 1.5,
                          lineHeight: 1.4,
                        }}
                      >
                        {article.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: '#6b5744', lineHeight: 1.7 }}
                      >
                        {article.summary}
                      </Typography>
                    </CardContent>

                    <Box sx={{ px: 3, pb: 3, pt: 0 }}>
                      <Button
                        component={Link}
                        to={`/library/${article.slug}`}
                        endIcon={<ArrowForwardRoundedIcon />}
                        sx={{
                          color: '#2d2018',
                          fontWeight: 600,
                          px: 0,
                          '&:hover': {
                            bgcolor: 'transparent',
                            color: '#6b5744',
                          },
                        }}
                      >
                        {pageCopy.readArticle}
                      </Button>
                    </Box>
                  </GlassCard>
                </FadeIn>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Government Resources ── */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          background:
            'linear-gradient(180deg, #f5efe5 0%, #f8f6f1 100%)',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 5, lg: 8 } }}>
          <FadeIn>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: '#2d2018', mb: 1 }}
            >
              {pageCopy.governmentResourcesTitle}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#4a3b30', mb: 4, maxWidth: 700, lineHeight: 1.7 }}
            >
              {pageCopy.governmentResourcesBody}
            </Typography>
          </FadeIn>

          <FadeIn delay={100}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="outlined"
                href="https://wwwnc.cdc.gov/travel/page/medical-tourism"
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNewRoundedIcon />}
                sx={{
                  borderColor: 'rgba(45,32,24,0.2)',
                  color: '#2d2018',
                  px: 3,
                  py: 1.2,
                  '&:hover': {
                    borderColor: 'rgba(45,32,24,0.4)',
                    bgcolor: 'rgba(45,32,24,0.04)',
                  },
                }}
              >
                CDC Medical Tourism
              </Button>
              <Button
                variant="outlined"
                href="https://travel.state.gov/content/travel/en/international-travel/before-you-go/your-health-abroad.html"
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNewRoundedIcon />}
                sx={{
                  borderColor: 'rgba(45,32,24,0.2)',
                  color: '#2d2018',
                  px: 3,
                  py: 1.2,
                  '&:hover': {
                    borderColor: 'rgba(45,32,24,0.4)',
                    bgcolor: 'rgba(45,32,24,0.04)',
                  },
                }}
              >
                State Dept. - Health Abroad
              </Button>
            </Stack>
          </FadeIn>
        </Container>
      </Box>
    </>
  );
};

export default Library;
