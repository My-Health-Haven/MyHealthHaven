import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'white', py: 6, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box component="img" src="/logo.png" alt="MyHealth Haven Logo" sx={{ height: 32, mr: 1 }} />
              <Typography variant="h6" color="primary.main" fontWeight="bold">
                MyHealth Haven
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Made In America, Made Better in Mexico
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Health Navigation™ across U.S. and Mexico
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle2" color="text.primary" gutterBottom fontWeight="bold">
              Patients
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} to="/#how-it-works" color="text.secondary" variant="body2" underline="hover">How It Works</MuiLink>
              <MuiLink component={Link} to="/procedures" color="text.secondary" variant="body2" underline="hover">Procedures</MuiLink>
              <MuiLink component={Link} to="/medical-travel" color="text.secondary" variant="body2" underline="hover">Medical Travel</MuiLink>
              <MuiLink component={Link} to="/#faqs" color="text.secondary" variant="body2" underline="hover">Frequently Asked Questions</MuiLink>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle2" color="text.primary" gutterBottom fontWeight="bold">
              Company
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} to="/about" color="text.secondary" variant="body2" underline="hover">About Us</MuiLink>
              <MuiLink component={Link} to="/employers" color="text.secondary" variant="body2" underline="hover">For Employers</MuiLink>
              <MuiLink component={Link} to="/providers" color="text.secondary" variant="body2" underline="hover">For Providers</MuiLink>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="text.primary" gutterBottom fontWeight="bold">
              Contact
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} to="/contact" color="text.secondary" variant="body2" underline="hover">Speak with a Health Navigator™</MuiLink>
              <MuiLink href="https://wa.me/0000000000" color="text.secondary" variant="body2" underline="hover" target="_blank" rel="noopener">WhatsApp</MuiLink>
              <MuiLink href="mailto:hello@myhealthhaven.com" color="text.secondary" variant="body2" underline="hover">Email</MuiLink>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5, pt: 3, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            © MyHealth Haven. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <MuiLink component={Link} to="/privacy" color="text.secondary" variant="body2" underline="hover">Privacy Policy</MuiLink>
            <MuiLink component={Link} to="/terms" color="text.secondary" variant="body2" underline="hover">Terms of Use</MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
