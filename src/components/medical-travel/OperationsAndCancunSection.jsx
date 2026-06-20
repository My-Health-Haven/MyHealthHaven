'use client';
import React from 'react';
import { Box, Container, Typography, Grid, Stack, alpha } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import FlightIcon from '@mui/icons-material/Flight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ShieldIcon from '@mui/icons-material/Shield';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import FadeIn from '@/components/FadeIn';
import UsFlagIcon from '@/components/icons/UsFlagIcon';
import WhyCancunIllustration from '@/components/medical-travel/WhyCancunIllustration';
import { useLanguage } from '@/context/LanguageContext';

const OperationsAndCancunSection = () => {
  const { t } = useLanguage();

  const whyCancunCards = [
    {
      icon: <VerifiedUserIcon />,
      title: t('medicalTravelPage.whyCancunCard1Title'),
      description: t('medicalTravelPage.whyCancunCard1Desc'),
    },
    {
      icon: <FlightIcon />,
      title: t('medicalTravelPage.whyCancunCard2Title'),
      description: t('medicalTravelPage.whyCancunCard2Desc'),
    },
    {
      icon: <AccessTimeIcon />,
      title: t('medicalTravelPage.whyCancunCard3Title'),
      description: t('medicalTravelPage.whyCancunCard3Desc'),
    },
    {
      icon: <GroupsIcon />,
      title: t('medicalTravelPage.whyCancunCard4Title'),
      description: t('medicalTravelPage.whyCancunCard4Desc'),
    },
  ];

  const trustRow = [
    {
      icon: <UsFlagIcon />,
      title: t('medicalTravelPage.trustUsFoundedTitle'),
      desc: t('medicalTravelPage.trustUsFoundedDesc'),
    },
    {
      icon: <GpsFixedIcon />,
      title: t('medicalTravelPage.trustFocusedTitle'),
      desc: t('medicalTravelPage.trustFocusedDesc'),
    },
    {
      icon: <ShieldIcon />,
      title: t('medicalTravelPage.trustQualityTitle'),
      desc: t('medicalTravelPage.trustQualityDesc'),
    },
  ];

  const locationsParagraphs = Array.isArray(t('medicalTravelPage.locationsParagraphs'))
    ? t('medicalTravelPage.locationsParagraphs')
    : [t('medicalTravelPage.locationsDesc')];

  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        background:
          'linear-gradient(180deg, rgba(231, 245, 255, 0.45) 0%, rgba(247, 236, 255, 0.4) 100%)',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.13,
          backgroundImage: 'radial-gradient(circle, #00897B 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />

      <Container
        maxWidth={false}
        sx={{
          position: 'relative',
          zIndex: 1,
          px: { xs: 2, md: 6, lg: 10 },
        }}
      >
        <Grid container spacing={2} alignItems='stretch'>
          {/* LEFT: Where we operate */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
            <FadeIn delay={100} style={{ width: '100%', display: 'flex' }}>
              <Box
                sx={{
                  flex: 1,
                  p: { xs: 0, md: 4 },
                  bgcolor: { xs: 'transparent', md: 'background.paper' },
                  borderRadius: { xs: 0, md: 4 },
                  boxShadow: { xs: 'none', md: '0 8px 32px rgba(17, 24, 39, 0.06)' },
                  border: { xs: 'none', md: '1px solid' },
                  borderColor: alpha('#00897B', 0.08),
                }}
              >
                <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      bgcolor: alpha('#00897B', 0.12),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                    aria-hidden='true'
                  >
                    <PublicIcon sx={{ fontSize: 28, color: 'primary.main' }} />
                  </Box>
                  <Typography
                    variant='h3'
                    sx={{
                      fontWeight: 700,
                      color: 'text.primary',
                      fontSize: { xs: '1.26rem', md: '1.53rem' },
                    }}
                  >
                    {t('medicalTravelPage.locationsTitle')}
                  </Typography>
                </Stack>

                <Stack spacing={2}>
                  {locationsParagraphs.map((para, i) => (
                    <Typography
                      key={i}
                      variant='body1'
                      style={{ fontSize: '0.855rem' }}
                      sx={{
                        color: '#4A5568',
                        lineHeight: 1.7,
                      }}
                    >
                      {para}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </FadeIn>
          </Grid>

          {/* RIGHT: Why Cancún */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
            <FadeIn delay={200} style={{ width: '100%', display: 'flex' }}>
              <Box
                sx={{
                  flex: 1,
                  borderRadius: 4,
                  boxShadow: '0 8px 32px rgba(17, 24, 39, 0.06)',
                  border: '1px solid',
                  borderColor: alpha('#00897B', 0.08),
                  overflow: 'hidden',
                  position: 'relative',
                  minHeight: { xs: 480, md: 520 },
                }}
              >
                {/* Illustration fills entire card as absolute background */}
                <WhyCancunIllustration pinLabel={t('medicalTravelPage.whyCancunPin')} />

                {/* Title + underline overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: 12, sm: 16 },
                    left: 0,
                    right: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
                >
                  <Typography
                    variant='h3'
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      fontSize: { xs: '1.4rem', md: '1.7rem' },
                      mb: 0.75,
                      textShadow: '0 1px 8px rgba(255,255,255,0.8)',
                    }}
                  >
                    {t('medicalTravelPage.whyCancunTitle')}
                  </Typography>
                  <Box
                    sx={{
                      width: 128,
                      height: 2,
                      borderRadius: 2,
                      background: 'linear-gradient(90deg, #00897B 0%, #8E24AA 100%)',
                    }}
                    aria-hidden='true'
                  />
                </Box>

                {/* 2x2 compact cards always pinned to bottom */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 12,
                    left: 12,
                    right: 12,
                    zIndex: 2,
                  }}
                >
                  <Grid container spacing={1.25}>
                    {whyCancunCards.map((card, i) => (
                      <Grid size={{ xs: 12, sm: 6 }} key={i}>
                        <FadeIn delay={300 + i * 80} style={{ height: '100%' }}>
                          <Stack
                            direction='row'
                            spacing={1.25}
                            alignItems='flex-start'
                            sx={{
                              height: '100%',
                              bgcolor: 'rgba(255,255,255,0.95)',
                              backdropFilter: 'blur(4px)',
                              borderRadius: 2,
                              p: 1.25,
                              border: '1px solid',
                              borderColor: alpha('#00897B', 0.12),
                              boxShadow: '0 4px 14px rgba(17, 24, 39, 0.08)',
                            }}
                          >
                            <Box
                              sx={{
                                width: 36,
                                height: 36,
                                borderRadius: '50%',
                                background: `radial-gradient(circle at 45% 30%, ${alpha('#FFFFFF', 0.9)} 0%, ${alpha('#00897B', 0.16)} 60%, ${alpha('#00897B', 0.24)} 100%)`,
                                border: `1px solid ${alpha('#00897B', 0.25)}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                              aria-hidden='true'
                            >
                              {React.isValidElement(card.icon)
                                ? React.cloneElement(card.icon, {
                                    sx: { fontSize: 18, color: 'primary.main' },
                                  })
                                : card.icon}
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  fontSize: '0.78rem',
                                  lineHeight: 1.25,
                                  color: 'text.primary',
                                  mb: 0.4,
                                }}
                              >
                                {card.title}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: '0.68rem',
                                  lineHeight: 1.35,
                                  color: 'text.secondary',
                                }}
                              >
                                {card.description}
                              </Typography>
                            </Box>
                          </Stack>
                        </FadeIn>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </FadeIn>
          </Grid>
        </Grid>

        {/* 3-column trust row */}
        <FadeIn delay={400}>
          <Box
            sx={{
              mt: { xs: 5, md: 6 },
              bgcolor: { xs: 'transparent', md: 'background.paper' },
              borderRadius: { xs: 0, md: 3 },
              py: { xs: 0, md: 4 },
              px: { xs: 0, md: 4 },
              border: { xs: 'none', md: '1px solid' },
              borderColor: 'divider',
              boxShadow: { xs: 'none', md: '0 6px 24px rgba(17, 24, 39, 0.04)' },
            }}
          >
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {trustRow.map((badge, i) => (
                <Grid size={{ xs: 12, md: 4 }} key={i}>
                  <Stack direction='row' spacing={2} alignItems='flex-start'>
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: '50%',
                        bgcolor: alpha('#8E24AA', 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        mt: 0.3,
                      }}
                      aria-hidden='true'
                    >
                      {React.isValidElement(badge.icon)
                        ? React.cloneElement(badge.icon, {
                            sx: {
                              fontSize: 26,
                              color: 'secondary.main',
                              ...(badge.icon.props?.sx || {}),
                            },
                          })
                        : badge.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant='subtitle1'
                        sx={{
                          fontWeight: 700,
                          color: 'secondary.main',
                          lineHeight: 1.2,
                          mb: 0.5,
                        }}
                      >
                        {badge.title}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.5,
                        }}
                      >
                        {badge.desc}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </FadeIn>
      </Container>
    </Box>
  );
};

export default OperationsAndCancunSection;
