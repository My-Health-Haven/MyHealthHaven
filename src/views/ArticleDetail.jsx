'use client';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Box, Container, Typography, Button, Divider } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import FadeIn from '../components/FadeIn';
import { getLibraryArticleBySlug } from '../data/libraryContent';

const ArticleDetail = ({ slug }) => {
  const { language } = useLanguage();
  const article = getLibraryArticleBySlug(slug);

  // If not found, show 404
  if (!article) {
    notFound();
  }

  return (
    <>
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper', minHeight: '80vh' }}>
        <Container maxWidth="md">
          <FadeIn>
            <Button component={Link} href="/library" sx={{ mb: 4 }}>
              &larr; Back to Library
            </Button>

          <Typography variant="h2" component="h1" gutterBottom color="primary.main">
            {article.title}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" paragraph sx={{ fontStyle: 'italic', mb: 4 }}>
            {article.summary}
          </Typography>

          <Divider sx={{ mb: 6 }} />

          {/* 
            Render content with line breaks. 
            We split by newline and map to Typography paragraphs for better formatting.
          */}
          {article.content ? (
            <Box>
              {article.content.split('\n').map((line, index) => (
                <Typography key={index} paragraph variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                  {line}
                </Typography>
              ))}
            </Box>
          ) : (
             <Typography variant="body1" color="text.secondary">
                Full content coming soon...
             </Typography>
          )}

            <Divider sx={{ my: 6 }} />
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>Ready to explore your options?</Typography>
              <Button variant="contained" size="large" component={Link} href="/schedule" sx={{ mt: 2 }}>
                Speak with a Health Navigator
              </Button>
            </Box>

          </FadeIn>
        </Container>
      </Box>
    </>
  );
};

export default ArticleDetail;

