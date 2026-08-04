'use client';
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Breadcrumbs,
  alpha,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import FadeIn from '../components/FadeIn';
import LibraryArticleCard from '../components/library/LibraryArticleCard';
import {
  LIBRARY_CATEGORY_DETAILS,
  LIBRARY_PAGE_COPY,
  getArticlesByCategory,
} from '../data/libraryContent';
import { useLanguage } from '../context/LanguageContext';

const LibraryCategory = ({ categorySlug }) => {
  const theme = useTheme();
  const { language } = useLanguage();
  const pageCopy = LIBRARY_PAGE_COPY[language] || LIBRARY_PAGE_COPY.en;
  const primaryDark = theme.palette.primary.dark;
  const secondary = theme.palette.secondary.main;

  const details = LIBRARY_CATEGORY_DETAILS[categorySlug];
  const articles = getArticlesByCategory(categorySlug);

  return (
    <>
      {/* ── Hero ── */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #e8f5f2 0%, #f4faff 48%, #f3edf7 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth='lg' sx={{ px: { xs: 2, md: 5, lg: 8 } }}>
          <FadeIn>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
              <Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                Home
              </Link>
              <Link href='/library' style={{ textDecoration: 'none', color: 'inherit' }}>
                {pageCopy.title}
              </Link>
              <Typography color='text.primary'>{details?.name}</Typography>
            </Breadcrumbs>

            <Typography variant='h1' sx={{ color: primaryDark, mb: 2 }}>
              {details?.name}
            </Typography>
            <Typography
              variant='h5'
              sx={{ color: 'text.secondary', maxWidth: 680, lineHeight: 1.7 }}
            >
              {details?.intro}
            </Typography>
          </FadeIn>
        </Container>
      </Box>

      {/* ── Articles ── */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: '#FFFFFF' }}>
        <Container maxWidth='lg' sx={{ px: { xs: 2, md: 5, lg: 8 } }}>
          <Grid container spacing={4}>
            {articles.map((article, index) => (
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

      {/* ── CTA ── */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          background: `linear-gradient(180deg, ${alpha(secondary, 0.05)} 0%, #FFFFFF 100%)`,
          textAlign: 'center',
        }}
      >
        <Container maxWidth='md'>
          <FadeIn>
            <Typography variant='h4' sx={{ fontWeight: 700, color: primaryDark, mb: 2 }}>
              {details?.ctaTitle || 'Have questions about your options?'}
            </Typography>
            <Typography
              variant='body1'
              sx={{
                color: 'text.secondary',
                mb: 4,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              A health navigator can walk you through your options and answer questions at your own
              pace.
            </Typography>
            <Button
              variant='contained'
              size='large'
              component={Link}
              href='/schedule'
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                bgcolor: primaryDark,
                color: 'white',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#004D40',
                  boxShadow: `0 6px 18px ${alpha(primaryDark, 0.28)}`,
                },
              }}
            >
              Talk to a Health Navigator
            </Button>
          </FadeIn>
        </Container>
      </Box>
    </>
  );
};

export default LibraryCategory;
