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
import { Link } from 'react-router-dom';

import ArticleIcon from '@mui/icons-material/Article';
import GlassCard from '../components/GlassCard';
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

      {/* 1. Hero Centered */}
      <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center', bgcolor: 'background.default' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
            <Typography variant="h1" gutterBottom>{pageCopy.title}</Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              {pageCopy.subtitle}
            </Typography>
            <Button variant="contained" size="large" component={Link} to="/library/is-medical-travel-right-for-me" sx={{ mt: 4 }}>
              {pageCopy.cta}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 2. Article List */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'xl', mx: 'auto' }}>
            <Typography variant="h2" gutterBottom>{pageCopy.featuredTopics}</Typography>
            <Grid container spacing={3} sx={{ mt: 4 }}>
              {LIBRARY_ARTICLES.map((article, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                         <ArticleIcon color="primary" sx={{ mr: 1 }} />
                         <Typography variant="caption" color="text.secondary">{pageCopy.guideLabel}</Typography>
                      </Box>
                      <Typography variant="h6" gutterBottom fontWeight="bold">{article.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{article.summary}</Typography>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button component={Link} to={`/library/${article.slug}`} size="small">
                        {pageCopy.readArticle}
                      </Button>
                    </Box>
                  </GlassCard>
                </Grid>
              ))}
            </Grid>

            {/* Government Resources Section */}
            <Box sx={{ mt: 8 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">{pageCopy.governmentResourcesTitle}</Typography>
               <Typography variant="body2" color="text.secondary" paragraph>
                 {pageCopy.governmentResourcesBody}
               </Typography>
               <Grid container spacing={2}>
                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Button 
                      variant="outlined" 
                      fullWidth 
                      href="https://wwwnc.cdc.gov/travel/page/medical-tourism" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      CDC Medical Tourism
                    </Button>
                 </Grid>
                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Button 
                      variant="outlined" 
                      fullWidth 
                      href="https://travel.state.gov/content/travel/en/international-travel/before-you-go/your-health-abroad.html" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      State Dept. - Health Abroad
                    </Button>
                 </Grid>
               </Grid>
            </Box>

          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Library;
