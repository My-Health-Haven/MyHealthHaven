'use client';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  alpha,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import PublicIcon from '@mui/icons-material/Public';
import FlightIcon from '@mui/icons-material/Flight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ShieldIcon from '@mui/icons-material/Shield';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FadeIn from '../components/FadeIn';
import GlassCard from '../components/GlassCard';
import MedicalCareTimeline from '../components/MedicalCareTimeline';
import IconFeatureCard from '../components/IconFeatureCard';
import { UsFlagIcon } from './Home';
import { useLanguage } from '../context/LanguageContext';

// Stylized illustration of the US → Cancún route.
// PLACEHOLDER: swap with a real designed illustration when available.
const WhyCancunIllustration = ({ pinLabel }) => (
  <Box
    sx={{
      position: 'relative',
      width: '100%',
      mb: 3,
      borderRadius: 3,
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #E8F4FE 0%, #DCEEF9 100%)',
      border: '1px solid',
      borderColor: alpha('#00897B', 0.1),
    }}
  >
    <Box
      component="svg"
      viewBox="0 0 400 220"
      sx={{ width: '100%', height: 'auto', display: 'block' }}
      aria-hidden="true"
    >
      {/* Soft clouds */}
      <ellipse cx="60" cy="36" rx="32" ry="9" fill="#FFFFFF" opacity="0.7" />
      <ellipse cx="330" cy="48" rx="36" ry="10" fill="#FFFFFF" opacity="0.6" />
      <ellipse cx="200" cy="28" rx="24" ry="7" fill="#FFFFFF" opacity="0.55" />

      {/* USA — simplified shape */}
      <path
        d="M 28 78 Q 28 68 42 68 L 165 68 Q 178 68 180 82 L 182 128 Q 182 144 168 144 L 92 144 Q 72 144 64 134 L 28 100 Z"
        fill="#A8D5BA"
        opacity="0.85"
      />
      <text
        x="102"
        y="112"
        textAnchor="middle"
        fill="#1F2933"
        fontSize="14"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
      >
        USA
      </text>

      {/* Mexico — simplified with Yucatán peninsula */}
      <path
        d="M 180 142 Q 180 138 192 138 L 258 142 Q 282 148 292 162 L 308 174 Q 320 178 326 172 L 348 162 Q 360 160 362 168 Q 362 178 356 184 L 330 196 Q 308 200 282 196 L 228 196 Q 202 190 184 178 Z"
        fill="#FFE0A1"
        opacity="0.95"
      />
      <text
        x="240"
        y="178"
        textAnchor="middle"
        fill="#1F2933"
        fontSize="12"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
      >
        Mexico
      </text>

      {/* Dashed flight-path arc */}
      <path
        d="M 100 96 Q 220 18 332 172"
        stroke="#00897B"
        strokeWidth="2.5"
        strokeDasharray="6,5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Plane along the path */}
      <g transform="translate(220, 50) rotate(-12)">
        <path
          d="M -11 0 L -3 -3 L 8 -3 L 14 -8 L 17 -8 L 13 -3 L 13 3 L 17 8 L 14 8 L 8 3 L -3 3 L -11 0 Z"
          fill="#00897B"
        />
      </g>

      {/* Cancún pin marker */}
      <g transform="translate(332, 172)">
        <circle
          cx="0"
          cy="-14"
          r="10"
          fill="#00897B"
          stroke="#FFFFFF"
          strokeWidth="2.5"
        />
        <path d="M -6 -8 L 0 4 L 6 -8 Z" fill="#00897B" />
        <circle cx="0" cy="-14" r="3.5" fill="#FFFFFF" />
      </g>
    </Box>

    {/* Floating destination label badge */}
    <Box
      sx={{
        position: 'absolute',
        right: 16,
        top: 14,
        bgcolor: 'primary.main',
        color: 'white',
        px: 1.5,
        py: 0.5,
        borderRadius: 1.5,
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: 0.3,
        boxShadow: '0 4px 12px rgba(0, 137, 123, 0.35)',
      }}
    >
      {pinLabel}
    </Box>
  </Box>
);

const MedicalTravel = () => {
  const theme = useTheme();
  const { language, t } = useLanguage();
  const [mapActive, setMapActive] = useState(false);

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

  const locationsParagraphs = Array.isArray(
    t('medicalTravelPage.locationsParagraphs')
  )
    ? t('medicalTravelPage.locationsParagraphs')
    : [t('medicalTravelPage.locationsDesc')];

  return (
    <>
      {/* 1. Hero (Redesigned) */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 12, md: 18 },
          backgroundImage: 'url(/medicaltravel.jpg)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          color: 'white',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0, 25, 30, 0.65) 0%, rgba(0, 53, 64, 0.5) 100%)',
            zIndex: 1,
          },
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            px: { xs: 2, md: 6, lg: 10 },
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center' }}>
            <FadeIn>
              <Typography
                variant="h1"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.4rem' },
                  lineHeight: 1.1,
                  textShadow: '0 4px 24px rgba(0, 0, 0, 0.35)',
                }}
              >
                {t('medicalTravelPage.title')}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  maxWidth: 760,
                  mx: 'auto',
                  mb: 4,
                  color: 'rgba(255, 255, 255, 0.93)',
                  lineHeight: 1.5,
                  fontSize: { xs: '1.05rem', md: '1.25rem' },
                }}
              >
                {t('medicalTravelPage.subtitle')}
              </Typography>
              <Button
                variant="contained"
                size="large"
                color="primary"
                component={Link}
                href="/schedule"
                startIcon={<CalendarMonthIcon />}
                sx={{
                  mt: 2,
                  py: 1.6,
                  px: 4,
                  fontSize: '1rem',
                  borderRadius: 2,
                  boxShadow: '0 12px 30px rgba(0, 137, 123, 0.45)',
                }}
              >
                {t('medicalTravelPage.cta')}
              </Button>
            </FadeIn>
          </Box>
        </Container>
      </Box>

      {/* 2. Where we operate + Why Cancún (Redesigned two-card layout) */}
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
            backgroundImage:
              'radial-gradient(circle, #00897B 1px, transparent 1px)',
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
          <Grid container spacing={4} alignItems="stretch">
            {/* LEFT: Where we operate */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
              <FadeIn delay={100} style={{ width: '100%', display: 'flex' }}>
                <Box
                  sx={{
                    flex: 1,
                    p: { xs: 3, md: 4 },
                    bgcolor: 'background.paper',
                    borderRadius: 4,
                    boxShadow: '0 8px 32px rgba(17, 24, 39, 0.06)',
                    border: '1px solid',
                    borderColor: alpha('#00897B', 0.08),
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 3 }}
                  >
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
                      aria-hidden="true"
                    >
                      <PublicIcon
                        sx={{ fontSize: 28, color: 'primary.main' }}
                      />
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        fontSize: { xs: '1.4rem', md: '1.7rem' },
                      }}
                    >
                      {t('medicalTravelPage.locationsTitle')}
                    </Typography>
                  </Stack>

                  <Stack spacing={2}>
                    {locationsParagraphs.map((para, i) => (
                      <Typography
                        key={i}
                        variant="body1"
                        style={{ fontSize: '0.9rem' }}
                        sx={{
                          color: 'text.secondary',
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
                    p: { xs: 3, md: 4 },
                    bgcolor: 'background.paper',
                    borderRadius: 4,
                    boxShadow: '0 8px 32px rgba(17, 24, 39, 0.06)',
                    border: '1px solid',
                    borderColor: alpha('#00897B', 0.08),
                  }}
                >
                  {/* Centered title with gradient underline */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      mb: 3,
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        fontSize: { xs: '1.4rem', md: '1.7rem' },
                        mb: 1,
                      }}
                    >
                      {t('medicalTravelPage.whyCancunTitle')}
                    </Typography>
                    <Box
                      sx={{
                        width: 64,
                        height: 2,
                        borderRadius: 2,
                        background:
                          'linear-gradient(90deg, #00897B 0%, #8E24AA 100%)',
                      }}
                      aria-hidden="true"
                    />
                  </Box>

                  {/* Map illustration with cards overlapping the bottom half */}
                  <Box sx={{ position: 'relative' }}>
                    <WhyCancunIllustration
                      pinLabel={t('medicalTravelPage.whyCancunPin')}
                    />
                    {/* 2x2 compact horizontal cards positioned over map bottom */}
                    <Box
                      sx={{
                        position: { xs: 'static', sm: 'absolute' },
                        bottom: { sm: 10 },
                        left: { sm: 10 },
                        right: { sm: 10 },
                        mt: { xs: 1.5, sm: 0 },
                      }}
                    >
                      <Grid container spacing={1.25}>
                        {whyCancunCards.map((card, i) => (
                          <Grid size={{ xs: 12, sm: 6 }} key={i}>
                            <FadeIn delay={300 + i * 80} style={{ height: '100%' }}>
                              <Stack
                                direction="row"
                                spacing={1.25}
                                alignItems="flex-start"
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
                                  aria-hidden="true"
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
                </Box>
              </FadeIn>
            </Grid>
          </Grid>

          {/* 3-column trust row */}
          <FadeIn delay={400}>
            <Box
              sx={{
                mt: { xs: 5, md: 6 },
                bgcolor: 'background.paper',
                borderRadius: 3,
                py: { xs: 3, md: 4 },
                px: { xs: 2, md: 4 },
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 6px 24px rgba(17, 24, 39, 0.04)',
              }}
            >
              <Grid container spacing={{ xs: 3, md: 4 }}>
                {trustRow.map((badge, i) => (
                  <Grid size={{ xs: 12, md: 4 }} key={i}>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="flex-start"
                    >
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
                        aria-hidden="true"
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
                          variant="subtitle1"
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
                          variant="body2"
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

      {/* 3. Operations Map (Unchanged — interactive Google Map kept below new sections) */}
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

      {/* 4. Medical Care Timeline (Unchanged) */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
        <Container
          maxWidth={false}
          sx={{ px: { xs: 2, md: 4, lg: 6 } }}
        >
          <FadeIn>
            <MedicalCareTimeline />
          </FadeIn>

          {/* Conclusion Section */}
          <FadeIn delay={300}>
            <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6 }}>
              <GlassCard
                sx={{
                  p: 4,
                  bgcolor: 'rgba(255,255,255,0.95)',
                  borderLeft: 6,
                  borderColor: 'primary.main',
                }}
              >
                <Typography variant="h5" gutterBottom color="primary.dark">
                  {t('medicalTravelPage.timelineConclusion.title')}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" paragraph>
                  {t('medicalTravelPage.timelineConclusion.subtitle')}
                </Typography>
                <Typography variant="body1">
                  {t('medicalTravelPage.timelineConclusion.description')}
                </Typography>
              </GlassCard>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                component={Link}
                href="/schedule"
                sx={{
                  py: 2,
                  px: 6,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}
              >
                {t('schedulePage.title')}
              </Button>
            </Box>
          </FadeIn>
        </Container>
      </Box>
    </>
  );
};

export default MedicalTravel;
