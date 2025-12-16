import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  Stack,
  Fade,
  Grid,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import WcIcon from '@mui/icons-material/Wc'; // Gender neutral/Other

import { useUserJourney } from '../context/UserJourneyContext';
import GlassCard from './GlassCard';
import { useLanguage } from '../context/LanguageContext';
import ErrorBoundary from './ErrorBoundary';

const CATEGORIES = [
  { id: 'ortho', icon: <AccessibilityNewIcon fontSize="large" />, color: '#1E88E5' },
  { id: 'plastic', icon: <FaceRetouchingNaturalIcon fontSize="large" />, color: '#E91E63' },
  { id: 'dental', icon: <VerifiedUserIcon fontSize="large" />, color: '#43A047' },
  { id: 'bariatric', icon: <MonitorHeartIcon fontSize="large" />, color: '#FB8C00' },
  { id: 'general', icon: <AirlineSeatFlatIcon fontSize="large" />, color: '#757575' },
];

const AGE_RANGES = [
  { id: '18-29', label: '18 - 29' },
  { id: '30-45', label: '30 - 45' },
  { id: '46-60', label: '46 - 60' },
  { id: '60+', label: '60+' },
];

const GENDERS = [
  { id: 'female', icon: <WomanIcon fontSize="large" /> },
  { id: 'male', icon: <ManIcon fontSize="large" /> },
  { id: 'other', icon: <WcIcon fontSize="large" /> },
];

const JourneyWizard = () => {
  const { showWizard, saveJourney, setShowWizard } = useUserJourney();
  const { t } = useLanguage();
  
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({ gender: null, age: null, category: null });

  const handleGenderSelect = (id) => {
    setSelections(prev => ({ ...prev, gender: id }));
    setStep(2);
  };

  const handleAgeSelect = (id) => {
    setSelections(prev => ({ ...prev, age: id }));
    setStep(3);
  };

  const handleCategorySelect = (id) => {
    const finalData = { ...selections, category: id };
    saveJourney(finalData);
  };

  const handleClose = () => {
    setShowWizard(false);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  useEffect(() => {
    if (showWizard) {
      setStep(1);
    }
  }, [showWizard]);

  return (
    <Dialog
      open={showWizard}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') handleClose();
      }}
      maxWidth="md"
      fullWidth
      sx={{ zIndex: 10000 }}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
        },
      }}
    >
      <Fade in={showWizard}>
        <ErrorBoundary fallback={null}>
          <Box sx={{ position: 'relative' }}>
             <IconButton 
                onClick={handleClose}
                sx={{ position: 'absolute', right: 0, top: -40, color: 'text.secondary' }}
             >
               <CloseIcon />
             </IconButton>

            <GlassCard sx={{ 
                p: { xs: 3, md: 6 }, 
                textAlign: 'center',
                // Removed explicit background override to let GlassCard default 'gradient' variant take over
                // Removed border override
             }}>
              
              {/* Step 1: Gender */}
              {step === 1 && (
                <Box>
                  <Typography variant="overline" color="primary" fontWeight="bold">
                    {t('journeyWizard.profileStep')}
                  </Typography>
                  <Typography variant="h3" gutterBottom sx={{ mt: 1, mb: 4, fontWeight: 800 }}>
                    {t('journeyWizard.genderQuestion')}
                  </Typography>

                  <Grid container spacing={3} justifyContent="center" maxWidth="sm" mx="auto">
                    {GENDERS.map((g) => (
                      <Grid item xs={4} key={g.id}>
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={() => handleGenderSelect(g.id)}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2,
                            gap: 1,
                            height: 160, // Fixed height for uniformity
                            borderColor: 'divider',
                            color: 'text.primary',
                            '&:hover': {
                                borderColor: 'primary.main',
                                bgcolor: 'primary.50'
                            }
                          }}
                        >
                          <Box color="primary.main">{g.icon}</Box>
                          <Typography variant="h6">{t(`journeyWizard.genders.${g.id}`)}</Typography>
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Step 2: Age */}
              {step === 2 && (
                <Box>
                  <Typography variant="overline" color="primary" fontWeight="bold">
                    {t('journeyWizard.profileStep')}
                  </Typography>
                  <Typography variant="h3" gutterBottom sx={{ mt: 1, mb: 4, fontWeight: 800 }}>
                    {t('journeyWizard.ageQuestion')}
                  </Typography>

                  <Grid container spacing={2} justifyContent="center" maxWidth="sm" mx="auto">
                    {AGE_RANGES.map((range) => (
                      <Grid item xs={6} key={range.id}>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="large"
                          onClick={() => handleAgeSelect(range.id)}
                          sx={{
                            height: 80, // Fixed height
                            borderColor: 'divider',
                            fontSize: '1.2rem',
                            '&:hover': {
                                borderColor: 'primary.main',
                                bgcolor: 'primary.50'
                            }
                          }}
                        >
                          {range.label}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                  <Button onClick={handleBack} sx={{ mt: 4, color: 'text.secondary' }}>{t('journeyWizard.back')}</Button>
                </Box>
              )}

              {/* Step 3: Category (Formerly Step 1) */}
              {step === 3 && (
                <Box>
                  <Typography variant="overline" color="secondary" fontWeight="bold">
                    {t('journeyWizard.personalizationStep')}
                  </Typography>
                  <Typography variant="h3" gutterBottom sx={{ mt: 1, mb: 4, fontWeight: 800 }}>
                    {t('journeyWizard.categoryQuestion')}
                  </Typography>

                  <Grid container spacing={2} justifyContent="center">
                    {CATEGORIES.map((cat) => (
                      <Grid item xs={6} md={4} key={cat.id}>
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={() => handleCategorySelect(cat.id)}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2,
                            height: 180, // Fixed height
                            width: '100%',
                            gap: 2,
                            borderColor: 'divider',
                            color: 'text.primary',
                            transition: 'all 0.2s',
                            '&:hover': {
                                borderColor: cat.color,
                                bgcolor: `${cat.color}10`,
                                transform: 'translateY(-4px)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                            }
                          }}
                        >
                          <Box sx={{ color: cat.color }}>{cat.icon}</Box>
                          <Typography variant="h6" fontWeight="bold">{t(`journeyWizard.categories.${cat.id}`)}</Typography>
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                   <Button onClick={handleBack} sx={{ mt: 4, color: 'text.secondary' }}>{t('journeyWizard.back')}</Button>
                </Box>
              )}

            </GlassCard>
            
          </Box>
        </ErrorBoundary>
      </Fade>
    </Dialog>
  );
};

export default JourneyWizard;
