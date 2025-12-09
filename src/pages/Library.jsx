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

const articles = [
  { title: "Is Medical Travel Right for Me?", slug: "is-medical-travel-right-for-me", summary: "A balanced guide to understanding benefits, risks, and non-obvious considerations." },
  { title: "How We Vet Hospitals and Surgeons", slug: "how-we-vet-hospitals", summary: "Our standards for selecting partners and what they mean in everyday language." },
  { title: "Talking to Your U.S. Doctor About Care in Mexico", slug: "talking-to-your-us-doctor", summary: "Suggested questions and ways to keep continuity of care front and center." }
];

const Library = () => {
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
            <Typography variant="h1" gutterBottom>Education before decisions.</Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Articles and guides to help you ask better questions, wherever you choose to receive care.
            </Typography>
            <Button variant="contained" size="large" component={Link} to="/library/is-medical-travel-right-for-me" sx={{ mt: 4 }}>
              Start with: Is Medical Travel Right for Me?
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 2. Article List */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
            <Typography variant="h2" gutterBottom>Featured topics</Typography>
            <Grid container spacing={3} sx={{ mt: 4 }}>
              {articles.map((article, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                         <ArticleIcon color="primary" sx={{ mr: 1 }} />
                         <Typography variant="caption" color="text.secondary">GUIDE</Typography>
                      </Box>
                      <Typography variant="h6" gutterBottom fontWeight="bold">{article.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{article.summary}</Typography>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button component={Link} to={`/library/${article.slug}`} size="small">
                        Read article
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
