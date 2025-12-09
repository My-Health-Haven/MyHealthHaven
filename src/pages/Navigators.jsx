import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FadeIn from '../components/FadeIn';
import GlassCard from '../components/GlassCard';

const Navigators = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Helmet>
        <title>Personal Health Navigators™ | MyHealth Haven</title>
        <meta
          name="description"
          content="Meet the bilingual professionals who guide you through every step of your cross-border care journey."
        />
      </Helmet>

      {/* 1. Hero Centered */}
      <Box sx={{ position: 'relative', py: { xs: 8, md: 12 }, textAlign: 'center', overflow: 'hidden' }}>
        {/* Parallax Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/HealthNavigatorsBG.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: isMobile ? 'scroll' : 'fixed',
            zIndex: 0,
          }}
        />
        {/* Darkening & Blur Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(3px)',
            zIndex: 0,
          }}
        />
        
        <Container maxWidth={false} sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
            <FadeIn>
              <Typography variant="h1" gutterBottom sx={{ color: 'white' }}>Your advocate across borders.</Typography>
              <Typography variant="h5" sx={{ color: 'grey.300', mb: 3 }}>
                Health Navigators™ are experienced healthcare professionals who coordinate options, answer questions, and stay with you from first contact through recovery.
              </Typography>
              <Button variant="contained" size="large" component={Link} to="/contact" sx={{ mt: 4 }}>
                Speak with a Health Navigator™
              </Button>
            </FadeIn>
          </Box>
        </Container>
      </Box>

      {/* 2. What they do (Feature List) */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
            <FadeIn>
              <Typography variant="h2" align="center" gutterBottom>What your Health Navigator™ does for you</Typography>
            </FadeIn>
              <Grid container spacing={2} sx={{ mt: 4 }}>
                {[
                  "Listens to your goals, medical history, and concerns.",
                  "Explains which procedures and locations may be appropriate.",
                  "Coordinates medical records, imaging, and pre-op requirements.",
                  "Presents vetted hospital and surgeon options with clear pricing.",
                  "Helps you prepare for travel, surgery, and recovery planning.",
                  "Stays reachable via secure messaging, phone, or video."
                ].map((item, i) => (
                <Grid size={{ xs: 12, md: 6 }} key={i}>
                    <FadeIn delay={i * 100}>
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <CheckCircleIcon color="primary" />
                        <Typography variant="body1">{item}</Typography>
                      </Stack>
                    </FadeIn>
                  </Grid>
                ))}
              </Grid>
          </Box>
        </Container>
      </Box>

      {/* 3. Team Grid */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
            <FadeIn>
              <Typography variant="h2" align="center" gutterBottom>A bilingual team that understands both systems</Typography>
            </FadeIn>
              <Grid container spacing={4} sx={{ mt: 6 }}>
                {[
                  { name: "Health Navigator 1", role: "Senior Health Navigator™", creds: "Certified Medical Professional", bio: "Helps patients understand their options and prepare safely for surgery abroad.", img: "/healthnav1.png" },
                  { name: "Health Navigator 2", role: "Medical Travel Strategist", creds: "Healthcare Specialist", bio: "Focuses on aligning U.S. quality expectations with Mexican clinical partners.", img: "/healthnav2.png" },
                  { name: "Health Navigator 3", role: "Patient Coordinator", creds: "Bilingual Support Specialist", bio: "Ensures smooth communication between you and the hospital staff." }
                ].map((profile, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                    <FadeIn delay={index * 200}>
                      <GlassCard sx={{ textAlign: 'center', p: 4, height: '100%' }}>
                        <Avatar src={profile.img} sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'secondary.main' }}>{profile.name[0]}</Avatar>
                        <Typography variant="h6" fontWeight="bold">{profile.name}</Typography>
                        <Typography variant="subtitle2" color="primary.main">{profile.role}</Typography>
                        <Typography variant="caption" display="block" sx={{ mb: 2, fontStyle: 'italic' }}>{profile.creds}</Typography>
                        <Typography variant="body2">{profile.bio}</Typography>
                      </GlassCard>
                    </FadeIn>
                  </Grid>
                ))}
              </Grid>
          </Box>
        </Container>
      </Box>

      {/* 4. CTA */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent', textAlign: 'center' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
            <FadeIn>
              <Typography variant="h2" gutterBottom>Start with a 15-minute conversation.</Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                No pressure, no commitment just clear answers from someone who knows the terrain.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <FadeIn delay={300}>
                  <Button variant="contained" size="large" component={Link} to="/contact">
                    Schedule your call
                  </Button>
                </FadeIn>
              </Box>
            </FadeIn>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Navigators;
