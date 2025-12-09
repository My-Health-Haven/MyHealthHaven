import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';

const procedures = [
  { title: "Orthopedic Surgery", slug: "orthopedic", tags: ["Knee replacement", "Hip replacement", "Spine"], body: "For patients seeking to restore movement without 6–12 month waits or unaffordable U.S. bills." },
  { title: "Bariatric & Metabolic", slug: "bariatric", tags: ["Gastric sleeve", "Gastric bypass"], body: "Accredited centers with structured pre-op evaluation and monitored recovery plans." },
  { title: "Dental & Full-Mouth", slug: "dental", tags: ["Implants", "All-on-4", "Reconstruction"], body: "From complex reconstructions to cosmetic work, coordinated in modern clinics with digital imaging." },
  { title: "Cosmetic & Reconstructive", slug: "cosmetic", tags: ["Body contouring", "Facial procedures"], body: "Board-certified surgeons in accredited facilities with realistic expectations and staged planning." },
  { title: "Fertility & Women’s Health", slug: "fertility", tags: ["IVF", "Gynecologic surgery"], body: "Centres combining evidence-based protocols with personalized emotional support." },
  { title: "Other Medical Necessities", slug: "other", tags: ["General surgery", "Urology", "Ophthalmology"], body: "For patients seeking equivalent clinical outcomes at a more sustainable cost." }
];

const Procedures = () => {
  return (
    <>
      <Helmet>
        <title>Procedures and Care Pathways | MyHealth Haven</title>
        <meta
          name="description"
          content="Explore the types of procedures supported by MyHealth Haven and how we help you evaluate if they are right for you."
        />
      </Helmet>

      {/* 1. Hero Centered */}
      <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center', bgcolor: 'background.default' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
            <Typography variant="h1" gutterBottom>Find your procedure. Keep your agency.</Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Browse procedure categories to understand typical care pathways, risks, and cost ranges. Then decide together with your Navigator what fits your goals.
            </Typography>
            <Button variant="contained" size="large" component={Link} to="/contact" sx={{ mt: 4 }}>
              Speak with a Health Navigator™
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 2. Categories Grid */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
            <Typography variant="h2" gutterBottom>Procedure categories</Typography>
            <Grid container spacing={3} sx={{ mt: 4 }}>
              {procedures.map((proc, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom fontWeight="bold">{proc.title}</Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                        {proc.tags.map(tag => <Chip key={tag} label={tag} size="small" sx={{ mb: 1 }} />)}
                      </Stack>
                      <Typography variant="body2">{proc.body}</Typography>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button component={Link} to={`/procedures/${proc.slug}`} size="small" variant="outlined">
                        View details
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

export default Procedures;
