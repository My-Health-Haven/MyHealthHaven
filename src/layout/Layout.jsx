import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import theme from '../theme';
import WhatsAppWidget from '../components/WhatsAppWidget';
import AnalyticsConsent from '../components/AnalyticsConsent';

const Layout = () => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WhatsAppWidget />
        <AnalyticsConsent />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default Layout;
