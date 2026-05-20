'use client';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Box, Container, Typography, Button, Divider, Breadcrumbs } from '@mui/material';
import FadeIn from '../components/FadeIn';
import { getLibraryArticleBySlug } from '../data/libraryContent';

const renderArticleContent = (content) => {
  const paragraphs = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return paragraphs.map((block, index) => {
    if (block.startsWith('## ')) {
      return (
        <Typography
          key={index}
          variant="h4"
          component="h2"
          sx={{ mt: 5, mb: 2, fontWeight: 700, color: 'primary.main' }}
        >
          {block.slice(3).trim()}
        </Typography>
      );
    }
    if (block.startsWith('### ')) {
      return (
        <Typography
          key={index}
          variant="h5"
          component="h3"
          sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}
        >
          {block.slice(4).trim()}
        </Typography>
      );
    }
    return (
      <Typography
        key={index}
        variant="body1"
        component="p"
        sx={{ mb: 2.5, lineHeight: 1.8 }}
      >
        {block.split('\n').map((line, lineIndex, arr) => (
          <React.Fragment key={lineIndex}>
            {line}
            {lineIndex < arr.length - 1 ? <br /> : null}
          </React.Fragment>
        ))}
      </Typography>
    );
  });
};

const ArticleDetail = ({ slug }) => {
  const article = getLibraryArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <Box
      component="article"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper', minHeight: '80vh' }}
    >
      <Container maxWidth="md">
        <FadeIn>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Home
            </Link>
            <Link href="/library" style={{ textDecoration: 'none', color: 'inherit' }}>
              Library
            </Link>
            <Typography color="text.primary">{article.title}</Typography>
          </Breadcrumbs>

          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            color="primary.main"
            sx={{ fontWeight: 700 }}
          >
            {article.title}
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="p"
            sx={{ fontStyle: 'italic', mb: 4 }}
          >
            {article.summary}
          </Typography>

          <Divider sx={{ mb: 6 }} />

          {article.content ? (
            <Box>{renderArticleContent(article.content)}</Box>
          ) : (
            <Typography variant="body1" color="text.secondary">
              Full content coming soon...
            </Typography>
          )}

          <Divider sx={{ my: 6 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="p" gutterBottom>
              Ready to explore your options?
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/schedule"
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

