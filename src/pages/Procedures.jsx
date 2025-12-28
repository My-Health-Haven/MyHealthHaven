import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  CardContent,
  Chip,
  Stack,
  Avatar,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'; // For Fertility/Care
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import GlassCard from '../components/GlassCard';
import FadeIn from '../components/FadeIn';

import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  orthopedic: <AccessibilityNewIcon fontSize="large" color="white" />,
  bariatric: <MonitorWeightIcon fontSize="large" color="white" />,
  dental: <MedicalServicesIcon fontSize="large" color="white" />,
  cosmetic: <FaceRetouchingNaturalIcon fontSize="large" color="white" />,
  fertility: <VolunteerActivismIcon fontSize="large" color="white" />,
  other: <LocalHospitalIcon fontSize="large" color="white" />,
};

const Procedures = () => {
  const { t } = useLanguage();
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
            <Typography variant="h1" gutterBottom>{t('proceduresPage.title')}</Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              {t('proceduresPage.subtitle')}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* 2. Categories Grid */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'xl', mx: 'auto' }}>
            <Typography variant="h2" gutterBottom>{t('proceduresPage.categoriesTitle')}</Typography>
            <Grid container spacing={3} sx={{ mt: 4 }}>
              {(t('proceduresPage.items') || []).map((proc, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <FadeIn delay={index * 100} style={{ height: '100%' }}>
                    <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                      <Box sx={{ 
                        p: 3, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        background: 'linear-gradient(135deg, rgba(0,121,107,0.8), rgba(0,77,64,0.9))',
                        color: 'white'
                      }}>
                         {iconMap[proc.slug] || <LocalHospitalIcon fontSize="large" />}
                      </Box>
                      <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">{proc.title}</Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                          {proc.tags.map(tag => <Chip key={tag} label={tag} size="small" sx={{ mb: 1 }} />)}
                        </Stack>
                        <Typography variant="body2">{proc.body}</Typography>
                      </CardContent>
                      <Box sx={{ p: 2, pt: 0 }}>
                        <Button component={Link} to={`/procedures/${proc.slug}`} size="small" variant="outlined" fullWidth>
                          {t('proceduresPage.viewDetails')}
                        </Button>
                      </Box>
                    </GlassCard>
                  </FadeIn>
                </Grid>
              ))}
            </Grid>

            {/* CTA Moved Here */}
            <Box sx={{ mt: 8, textAlign: 'center' }}>
               <FadeIn delay={500}>
                 <Button variant="contained" size="large" component={Link} to="/contact" sx={{ px: 6 }}>
                   {t('proceduresPage.cta')}
                 </Button>
               </FadeIn>
            </Box>

          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Procedures;
