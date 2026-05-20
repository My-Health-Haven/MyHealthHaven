'use client';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import FadeIn from '@/components/FadeIn';
import { useLanguage } from '@/context/LanguageContext';

const OperationsMapSection = () => {
  const { t } = useLanguage();
  const [mapActive, setMapActive] = useState(false);

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'transparent' }}>
      <Container
        maxWidth={false}
        sx={{ px: { xs: 2, md: 6, lg: 10 } }}
      >
        <Box sx={{ maxWidth: 'xl', mx: 'auto' }}>
          <FadeIn delay={200}>
            <Box
              onMouseLeave={() => setMapActive(false)}
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: 400, md: 500 },
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1LWn2Sx3NCenBN4f_Wabr45-v7hhciJY&ehbc=2E312F&noprof=1"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  pointerEvents: mapActive ? 'auto' : 'none',
                }}
                title="MyHealth Haven Operations Map"
              />
              {!mapActive && (
                <Box
                  onClick={() => setMapActive(true)}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(255,255,255,0.04)',
                    transition: 'background-color 0.2s',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' },
                  }}
                >
                  <Typography
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.92)',
                      color: 'text.primary',
                      px: 2.5,
                      py: 1,
                      borderRadius: 999,
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                  >
                    {t('medicalTravelPage.mapActivate') ||
                      'Click to interact with map'}
                  </Typography>
                </Box>
              )}
            </Box>
          </FadeIn>
        </Box>
      </Container>
    </Box>
  );
};

export default OperationsMapSection;
