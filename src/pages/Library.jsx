import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import ArticleIcon from '@mui/icons-material/Article';
import GlassCard from '../components/GlassCard';

import { useLanguage } from '../context/LanguageContext';

const Library = () => {
  const { t } = useLanguage();
  return (
    <>
      <Helmet>
        <title>Learning Library | MyHealth Haven</title>
        <meta
          name="description"
          content="Calm, evidence-based guides to cross-border care, written by healthcare professionals."
        />
      </Helmet>

      {/* 1. Hero Centered */}
      <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center', bgcolor: 'background.default' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
            <Typography variant="h1" gutterBottom>{t('libraryPage.title')}</Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              {t('libraryPage.subtitle')}
            </Typography>
            <Button variant="contained" size="large" component={Link} to="/library/is-medical-travel-right-for-me" sx={{ mt: 4 }}>
              {t('libraryPage.cta')}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 2. Article List */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'xl', mx: 'auto' }}>
            <Typography variant="h2" gutterBottom>{t('libraryPage.featuredTopics')}</Typography>
            <Grid container spacing={3} sx={{ mt: 4 }}>
              {(t('libraryPage.articles') || []).map((article, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                         <ArticleIcon color="primary" sx={{ mr: 1 }} />
                         <Typography variant="caption" color="text.secondary">{t('libraryPage.guideLabel')}</Typography>
                      </Box>
                      <Typography variant="h6" gutterBottom fontWeight="bold">{article.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{article.summary}</Typography>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button component={Link} to={`/library/${article.slug}`} size="small">
                        {t('libraryPage.readArticle')}
                      </Button>
                    </Box>
                  </GlassCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Library;
