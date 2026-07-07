'use client';
import React, { useMemo, useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, Stack, alpha, useTheme } from '@mui/material';
import Link from 'next/link';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';

import FadeIn from '../components/FadeIn';
import SectionEyebrow from '../components/SectionEyebrow';
import IconFeatureCard from '../components/IconFeatureCard';
import LibraryArticleCard from '../components/library/LibraryArticleCard';
import {
  LIBRARY_PAGE_COPY,
  LIBRARY_HERO_PILLS,
  LIBRARY_CATEGORIES,
  getNormalizedArticles,
  getLibraryArticlePath,
} from '../data/libraryContent';
import { useLanguage } from '../context/LanguageContext';

// How many articles the rotating "Featured Topics" grid shows per visit.
const FEATURED_COUNT = 3;

// Fisher–Yates shuffle (returns a new array). Runs client-side only, so it
// never affects the server-rendered HTML.
const shuffleArray = (input) => {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const Library = () => {
  const theme = useTheme();
  const { language } = useLanguage();
  const pageCopy = LIBRARY_PAGE_COPY[language] || LIBRARY_PAGE_COPY.en;
  const primary = theme.palette.primary.main;
  const primaryDark = theme.palette.primary.dark;
  const secondary = theme.palette.secondary.main;

  const articles = useMemo(() => getNormalizedArticles(), []);
  const curatedFeatured = articles.filter((article) => article.featured);
  // Stable "start here" target for the hero button (never randomized).
  const firstArticle = curatedFeatured[0] || articles[0];

  // Rotating "Featured Topics": the server renders a stable, curated set (good
  // for SEO and to avoid a hydration mismatch); after mount we reshuffle so each
  // visit surfaces a different mix of articles as the library grows.
  const initialFeatured = (curatedFeatured.length ? curatedFeatured : articles).slice(
    0,
    FEATURED_COUNT
  );
  const [displayedArticles, setDisplayedArticles] = useState(initialFeatured);
  useEffect(() => {
    setDisplayedArticles(shuffleArray(articles).slice(0, FEATURED_COUNT));
  }, [articles]);

  return (
    <>
      {/* ── Hero ── */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          textAlign: 'center',
          background: 'linear-gradient(180deg, #e8f5f2 0%, #f4faff 48%, #f3edf7 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth='lg' sx={{ px: { xs: 2, md: 5, lg: 8 }, position: 'relative' }}>
          <FadeIn>
            <Typography variant='h1' sx={{ color: primaryDark, mb: 2 }}>
              {pageCopy.title}
            </Typography>
          </FadeIn>

          <FadeIn delay={80}>
            <Typography
              variant='h5'
              sx={{
                color: 'text.secondary',
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
              variant='contained'
              size='large'
              component={Link}
              href={getLibraryArticlePath(firstArticle)}
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                bgcolor: primaryDark,
                color: 'white',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                boxShadow: 'none',
                mb: 4,
                '&:hover': {
                  bgcolor: '#004D40',
                  boxShadow: `0 6px 18px ${alpha(primaryDark, 0.28)}`,
                },
              }}
            >
              {pageCopy.cta}
            </Button>
          </FadeIn>

          <FadeIn delay={220}>
            <Stack
              direction='row'
              flexWrap='wrap'
              justifyContent='center'
              gap={1.25}
              sx={{ mb: 3 }}
            >
              {LIBRARY_HERO_PILLS.map((pill) => {
                const PillIcon = pill.Icon;
                return (
                  <Box
                    key={pill.key}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.75,
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: alpha(primary, 0.18),
                      borderRadius: 999,
                      px: 2,
                      py: 1,
                      cursor: 'default',
                      boxShadow: `0 2px 8px ${alpha(primary, 0.06)}`,
                    }}
                  >
                    <PillIcon sx={{ fontSize: 18, color: primary }} />
                    <Typography
                      variant='body2'
                      sx={{ color: primaryDark, fontWeight: 600, fontSize: '0.92rem' }}
                    >
                      {pageCopy[pill.labelKey]}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </FadeIn>

          <FadeIn delay={280}>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='center'
              gap={0.75}
              sx={{ color: 'text.secondary' }}
            >
              <VerifiedUserRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant='body2' sx={{ color: 'text.secondary', fontSize: '0.88rem' }}>
                {pageCopy.trustLine}
              </Typography>
            </Stack>
          </FadeIn>
        </Container>
      </Box>

      {/* ── Featured Topics ── */}
      <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 2, md: 3 }, bgcolor: '#FFFFFF' }}>
        <Container maxWidth='lg' sx={{ px: { xs: 2, md: 5, lg: 8 } }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent='space-between'
            alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
            spacing={2}
            sx={{ mb: 5 }}
          >
            <FadeIn>
              <Box>
                <Typography variant='h2' sx={{ color: primaryDark, mb: 1 }}>
                  {pageCopy.featuredTopics}
                </Typography>
                <Box
                  sx={{
                    width: 56,
                    height: 3,
                    borderRadius: 2,
                    background: `linear-gradient(90deg, ${primary} 0%, ${secondary} 100%)`,
                  }}
                  aria-hidden='true'
                />
              </Box>
            </FadeIn>
            <FadeIn delay={80}>
              <Button
                component={Link}
                href='/library/getting-started'
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  color: primary,
                  fontWeight: 600,
                  px: 0,
                  '&:hover': { bgcolor: 'transparent', color: primaryDark },
                }}
              >
                {pageCopy.viewAllArticles}
              </Button>
            </FadeIn>
          </Stack>

          <Grid container spacing={4}>
            {displayedArticles.map((article, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={article.slug}>
                <FadeIn delay={index * 120}>
                  <LibraryArticleCard
                    article={article}
                    guideLabel={pageCopy.guideLabel}
                    readArticleLabel={pageCopy.readArticle}
                  />
                </FadeIn>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Explore by Category ── */}
      <Box
        id='explore'
        sx={{
          pt: { xs: 2, md: 3 },
          pb: { xs: 8, md: 10 },
          background: `linear-gradient(180deg, #FFFFFF 0%, ${alpha(secondary, 0.05)} 100%)`,
        }}
      >
        <Container maxWidth='lg' sx={{ px: { xs: 2, md: 5, lg: 8 } }}>
          <FadeIn>
            <Box sx={{ mb: 5 }}>
              <Typography variant='h2' sx={{ color: primaryDark, mb: 1 }}>
                {pageCopy.exploreByCategory}
              </Typography>
              <Box
                sx={{
                  width: 56,
                  height: 3,
                  borderRadius: 2,
                  background: `linear-gradient(90deg, ${primary} 0%, ${secondary} 100%)`,
                }}
                aria-hidden='true'
              />
            </Box>
          </FadeIn>

          <Grid container spacing={3} alignItems='stretch'>
            {LIBRARY_CATEGORIES.map((cat, index) => {
              const CatIcon = cat.Icon;
              // Only "Getting Started" currently has a category landing page.
              const categoryHref = cat.key === 'gettingStarted' ? '/library/getting-started' : null;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={cat.key} sx={{ display: 'flex' }}>
                  <FadeIn delay={index * 100} style={{ height: '100%', width: '100%' }}>
                    <Box
                      {...(categoryHref ? { component: Link, href: categoryHref } : {})}
                      sx={{
                        position: 'relative',
                        height: '100%',
                        display: 'block',
                        textDecoration: 'none',
                        color: 'inherit',
                        cursor: categoryHref ? 'pointer' : 'default',
                      }}
                    >
                      <IconFeatureCard
                        variant='compact'
                        color='secondary'
                        titleColor={primaryDark}
                        disableBubble
                        icon={<CatIcon />}
                        title={pageCopy[cat.titleKey]}
                        description={pageCopy[cat.descKey]}
                        sx={{ pr: 5 }}
                      />
                      <ArrowForwardRoundedIcon
                        aria-hidden='true'
                        sx={{
                          position: 'absolute',
                          right: 16,
                          bottom: 16,
                          fontSize: 20,
                          color: primary,
                          pointerEvents: 'none',
                          opacity: categoryHref ? 1 : 0.4,
                        }}
                      />
                    </Box>
                  </FadeIn>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* ── Government Resources ── */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          background: `linear-gradient(180deg, ${alpha(primary, 0.04)} 0%, #FFFFFF 100%)`,
        }}
      >
        <Container maxWidth='lg' sx={{ px: { xs: 2, md: 5, lg: 8 } }}>
          <FadeIn>
            <Typography variant='h4' sx={{ fontWeight: 700, color: primaryDark, mb: 1 }}>
              {pageCopy.governmentResourcesTitle}
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: 'text.secondary', mb: 4, maxWidth: 700, lineHeight: 1.7 }}
            >
              {pageCopy.governmentResourcesBody}
            </Typography>
          </FadeIn>

          <FadeIn delay={100}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant='outlined'
                href='https://wwwnc.cdc.gov/travel/page/medical-tourism'
                target='_blank'
                rel='noopener noreferrer'
                endIcon={<OpenInNewRoundedIcon />}
                sx={{
                  borderColor: alpha(primary, 0.3),
                  color: primaryDark,
                  px: 3,
                  py: 1.2,
                  '&:hover': {
                    borderColor: primary,
                    bgcolor: alpha(primary, 0.06),
                  },
                }}
              >
                CDC Medical Tourism
              </Button>
              <Button
                variant='outlined'
                href='https://travel.state.gov/content/travel/en/international-travel/before-you-go/your-health-abroad.html'
                target='_blank'
                rel='noopener noreferrer'
                endIcon={<OpenInNewRoundedIcon />}
                sx={{
                  borderColor: alpha(primary, 0.3),
                  color: primaryDark,
                  px: 3,
                  py: 1.2,
                  '&:hover': {
                    borderColor: primary,
                    bgcolor: alpha(primary, 0.06),
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
