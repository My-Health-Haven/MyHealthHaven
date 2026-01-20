import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';

const ComingSoon = () => {
  return (
    <Box 
      sx={{ 
        height: 'calc(100vh - 64px)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #E7F5FF 0%, #E0F2F1 100%)'
      }}
    >
      <Container maxWidth="md">
        <FadeIn>
          <Typography variant="h1" color="primary" gutterBottom>
            Coming Soon
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            We are working hard to bring you this content. 
            <br />
            Please check back shortly.
          </Typography>
          <Button variant="contained" size="large" component={Link} to="/" sx={{ mt: 4 }}>
            Return Home
          </Button>
        </FadeIn>
      </Container>
    </Box>
  );
};

export default ComingSoon;
