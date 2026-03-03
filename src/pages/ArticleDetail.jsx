import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import FadeIn from '../components/FadeIn';

const ArticleDetail = () => {
  const { slug } = useParams();
  const { t } = useLanguage();

  // Retrieve the full list of articles from translation context
  const articles = t('libraryPage.articles', { returnObjects: true });
  
  // Find the matching article
  const article = articles?.find(a => a.slug === slug);

  // If not found, redirect to library (or could show a 404 component)
  if (!article) {
    return <Navigate to="/library" replace />;
  }

  return (
    <>
    <Helmet>
      <title>{`${article.title} | MyHealth Haven Library`}</title>
      <meta
        name="description"
        content={article.summary || 'Expert guidance and educational content from MyHealth Haven.'}
      />
    </Helmet>
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper', minHeight: '80vh' }}>
      <Container maxWidth="md">
        <FadeIn>
          <Button component={Link} to="/library" sx={{ mb: 4 }}>
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
             <Button variant="contained" size="large" component={Link} to="/contact" sx={{ mt: 2 }}>
                Speak with a Health Navigator™
             </Button>
          </Box>

        </FadeIn>
      </Container>
    </Box>
    </>
  );
};

export default ArticleDetail;
