import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Divider } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import FadeIn from '../components/FadeIn';
import Seo from '../seo/Seo';
import {
  createArticleSchema,
  createBreadcrumbSchema,
} from '../seo/siteSeo';
import { getLibraryArticleBySlug } from '../data/libraryContent';

const ArticleDetail = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const article = getLibraryArticleBySlug(slug);

  // If not found, redirect to library (or could show a 404 component)
  if (!article) {
    return <Navigate to="/library" replace />;
  }

  return (
    <>
      <Seo
        title={`${article.title} | ${language === 'es' ? 'Biblioteca MyHealth Haven' : 'MyHealth Haven Library'}`}
        description={article.summary || 'Expert guidance and educational content from MyHealth Haven.'}
        canonicalPath={`/library/${article.slug}`}
        image="/cancun-skyline.jpg"
        type="article"
        schema={[
          createArticleSchema({
            path: `/library/${article.slug}`,
            headline: article.title,
            description: article.summary || 'Expert guidance and educational content from MyHealth Haven.',
            image: '/cancun-skyline.jpg',
          }),
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: language === 'es' ? 'Biblioteca' : 'Library', path: '/library' },
            { name: article.title, path: `/library/${article.slug}` },
          ]),
        ]}
      />
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

