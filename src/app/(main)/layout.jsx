'use client';

import { Box } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import AnalyticsConsent from '@/components/AnalyticsConsent';

export default function MainLayout({ children }) {
  return (
    <>
      <WhatsAppWidget />
      <AnalyticsConsent />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component='main' sx={{ flexGrow: 1 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  );
}
