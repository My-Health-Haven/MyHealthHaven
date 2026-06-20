'use client';
import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import FadeIn from '../components/FadeIn';
import { useLanguage } from '../context/LanguageContext';

const ComingSoon = () => {
  const { t } = useLanguage();
  return (
    <>
      <Box
        sx={{
          height: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #E7F5FF 0%, #E0F2F1 100%)',
        }}
      >
        <Container maxWidth='md'>
          <FadeIn>
            <Typography variant='h1' color='primary' gutterBottom>
              {t('misc.comingSoon')}
            </Typography>
            <Typography variant='h5' color='text.secondary' paragraph>
              {t('misc.comingSoonDesc')}
            </Typography>
            <Button variant='contained' size='large' component={Link} href='/' sx={{ mt: 4 }}>
              {t('misc.returnHome')}
            </Button>
          </FadeIn>
        </Container>
      </Box>
    </>
  );
};

export default ComingSoon;
