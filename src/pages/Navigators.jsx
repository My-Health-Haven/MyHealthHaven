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
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Navigators = () => {
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
      <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center', bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Typography variant="h1" gutterBottom>Your advocate across borders.</Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Health Navigators™ are experienced healthcare professionals who coordinate options, answer questions, and stay with you from first contact through recovery.
          </Typography>
          <Button variant="contained" size="large" component={Link} to="/contact" sx={{ mt: 4 }}>
            Speak with a Health Navigator™
          </Button>
        </Container>
      </Box>

      {/* 2. What they do (Feature List) */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>What your Health Navigator™ does for you</Typography>
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
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <CheckCircleIcon color="primary" />
                  <Typography variant="body1">{item}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 3. Team Grid */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F9FAFB' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>A bilingual team that understands both systems</Typography>
          <Grid container spacing={4} sx={{ mt: 6 }}>
            {[
              { name: "Health Navigator 1", role: "Senior Health Navigator™", creds: "Certified Medical Professional", bio: "Helps patients understand their options and prepare safely for surgery abroad.", img: "/healthnav1.png" },
              { name: "Health Navigator 2", role: "Medical Travel Strategist", creds: "Healthcare Specialist", bio: "Focuses on aligning U.S. quality expectations with Mexican clinical partners.", img: "/healthnav2.png" },
              { name: "Health Navigator 3", role: "Patient Coordinator", creds: "Bilingual Support Specialist", bio: "Ensures smooth communication between you and the hospital staff." }
            ].map((profile, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card sx={{ textAlign: 'center', p: 4, height: '100%', boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                  <Avatar src={profile.img} sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'secondary.main' }}>{profile.name[0]}</Avatar>
                  <Typography variant="h6" fontWeight="bold">{profile.name}</Typography>
                  <Typography variant="subtitle2" color="primary.main">{profile.role}</Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 2, fontStyle: 'italic' }}>{profile.creds}</Typography>
                  <Typography variant="body2">{profile.bio}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. CTA */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom>Start with a 15-minute conversation.</Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            No pressure, no commitment just clear answers from someone who knows the terrain.
          </Typography>
          <Button variant="contained" size="large" component={Link} to="/contact" sx={{ mt: 4 }}>
            Schedule your call
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default Navigators;
