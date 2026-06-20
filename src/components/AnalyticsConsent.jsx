import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

const CONSENT_KEY = 'analyticsConsent';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-NN6Q7KNR';

const loadGtm = () => {
  if (!GTM_ID || document.querySelector(`script[data-gtm-id="${GTM_ID}"]`)) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  script.dataset.gtmId = GTM_ID;
  document.head.appendChild(script);
};

const AnalyticsConsent = () => {
  const [isReady, setIsReady] = useState(false);
  const [consent, setConsent] = useState('pending');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedConsent = window.localStorage.getItem(CONSENT_KEY);
    if (savedConsent === 'granted' || savedConsent === 'denied') {
      setConsent(savedConsent);
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady && consent === 'granted') {
      loadGtm();
    }
  }, [consent, isReady]);

  const handleConsent = (nextConsent) => {
    window.localStorage.setItem(CONSENT_KEY, nextConsent);
    setConsent(nextConsent);
  };

  if (!isReady || consent !== 'pending') {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 12000,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        boxShadow: 3,
        p: 2,
      }}
    >
      <Typography variant='subtitle2' fontWeight={700}>
        Analytics Consent
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
        We use analytics cookies to understand site usage and improve the experience. You can accept
        or decline.
      </Typography>
      <Stack direction='row' spacing={1.5} sx={{ mt: 2 }}>
        <Button variant='contained' onClick={() => handleConsent('granted')}>
          Accept
        </Button>
        <Button variant='outlined' onClick={() => handleConsent('denied')}>
          Decline
        </Button>
      </Stack>
    </Box>
  );
};

export default AnalyticsConsent;
