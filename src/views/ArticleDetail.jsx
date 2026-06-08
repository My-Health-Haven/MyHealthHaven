'use client';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Breadcrumbs,
  Stack,
  Grid,
} from '@mui/material';
import FadeIn from '../components/FadeIn';
import ArticlePlaceholder from '../components/library/ArticlePlaceholder';
import LibraryArticleCard from '../components/library/LibraryArticleCard';
import { getLibraryArticleBySlug } from '../data/libraryContent';

// Format an ISO date (YYYY-MM-DD) for display; returns null if absent/invalid.
const formatDate = (value) => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Maps the Markdown body to MUI typography so article bodies match the rest of
// the site. Authors write standard Markdown (## / ### headings, links, lists).
const articleBodySx = (theme) => ({
  '& h2': {
    ...theme.typography.h4,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  '& h3': {
    ...theme.typography.h5,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1.5),
    fontWeight: 700,
  },
  '& p': {
    ...theme.typography.body1,
    marginBottom: theme.spacing(2.5),
    lineHeight: 1.8,
  },
  '& ul, & ol': {
    marginBottom: theme.spacing(2.5),
    paddingLeft: theme.spacing(3),
  },
  '& li': {
    ...theme.typography.body1,
    marginBottom: theme.spacing(1),
    lineHeight: 1.8,
  },
  '& a': {
    color: theme.palette.primary.main,
    fontWeight: 600,
    textDecoration: 'underline',
  },
  '& strong': { fontWeight: 700 },
});

const ArticleDetail = ({ slug }) => {
  const article = getLibraryArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const isGettingStarted = article.categorySlug === 'getting-started';
  const metaParts = [
    article.type,
    article.author,
    formatDate(article.date),
    article.readTime,
  ].filter(Boolean);

  const related = (article.relatedArticles || [])
    .map((relatedSlug) => getLibraryArticleBySlug(relatedSlug))
    .filter(Boolean);

  return (
    <Box
      component='article'
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper', minHeight: '80vh' }}
    >
      <Container maxWidth='md'>
        <FadeIn>
          <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
            <Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
              Home
            </Link>
            <Link href='/library' style={{ textDecoration: 'none', color: 'inherit' }}>
              Library
            </Link>
            {isGettingStarted && (
              <Link
                href='/library/getting-started'
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {article.category}
              </Link>
            )}
            <Typography color='text.primary'>{article.title}</Typography>
          </Breadcrumbs>

          <Typography
            variant='overline'
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1.2 }}
          >
            {article.category}
          </Typography>

          <Typography
            variant='h2'
            component='h1'
            gutterBottom
            color='primary.main'
            sx={{ fontWeight: 700, mt: 1 }}
          >
            {article.title}
          </Typography>

          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='p'
            sx={{ fontStyle: 'italic', mb: 2 }}
          >
            {article.excerpt}
          </Typography>

          {metaParts.length > 0 && (
            <Typography variant='body2' sx={{ color: 'text.secondary', mb: 4 }}>
              {metaParts.join('  ·  ')}
            </Typography>
          )}

          {article.heroImage && (
            <ArticlePlaceholder
              image={article.heroImage}
              alt={article.heroImageAlt || article.title}
              sizes='(max-width: 900px) 100vw, 800px'
              sx={{
                mb: 5,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
              }}
            />
          )}

          <Divider sx={{ mb: 6 }} />

          {article.content ? (
            <Box sx={articleBodySx}>
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </Box>
          ) : (
            <Typography variant='body1' color='text.secondary'>
              Full content coming soon...
            </Typography>
          )}

          {article.faqs.length > 0 && (
            <Box sx={{ mt: 6 }}>
              <Typography
                variant='h4'
                component='h2'
                sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}
              >
                Frequently Asked Questions
              </Typography>
              <Stack spacing={3}>
                {article.faqs.map((faq) => (
                  <Box key={faq.question}>
                    <Typography variant='h6' component='h3' sx={{ fontWeight: 700, mb: 1 }}>
                      {faq.question}
                    </Typography>
                    <Typography variant='body1' color='text.secondary' sx={{ lineHeight: 1.8 }}>
                      {faq.answer}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {related.length > 0 && (
            <Box sx={{ mt: 8 }}>
              <Typography
                variant='h4'
                component='h2'
                sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}
              >
                Related Articles
              </Typography>
              <Grid container spacing={4}>
                {related.map((relatedArticle) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={relatedArticle.slug}>
                    <LibraryArticleCard
                      article={relatedArticle}
                      guideLabel='Guide'
                      readArticleLabel='Read Article'
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          <Divider sx={{ my: 6 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h5' component='p' gutterBottom>
              Ready to explore your options?
            </Typography>
            <Button
              variant='contained'
              size='large'
              component={Link}
              href='/schedule'
              sx={{ mt: 2 }}
            >
              Speak with a Health Navigator
            </Button>
          </Box>
        </FadeIn>
      </Container>
    </Box>
  );
};

export default ArticleDetail;
