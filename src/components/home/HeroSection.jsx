'use client';
import React from 'react';
import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  Card,
  alpha,
} from '@mui/material';
import Link from 'next/link';
import ShieldIcon from '@mui/icons-material/Shield';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalculateIcon from '@mui/icons-material/Calculate';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import LanguageIcon from '@mui/icons-material/Language';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AddIcon from '@mui/icons-material/Add';
import FadeIn from '@/components/FadeIn';
import SectionEyebrow from '@/components/SectionEyebrow';
import { useLanguage } from '@/context/LanguageContext';

const HeroSection = ({ isHeroVideoPlaying, setIsHeroVideoPlaying, isMobile }) => {
  const { t, getLocalizedHomeContent } = useLanguage();
  const activeContent = getLocalizedHomeContent();
  const heroContent = activeContent.hero;

  return (
    <Box
      sx={{
        position: 'relative',
        background:
          'linear-gradient(135deg, #F0F9FF 0%, #F7ECFF 55%, #E7F5FF 100%)',
        minHeight: { xs: 'auto', md: 'calc(100vh - 64px)' },
        display: { xs: 'block', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'center',
        pt: { xs: 9, md: 6 },
        pb: { xs: 2, md: 6 },
        overflow: 'hidden',
      }}
    >
      {/* Decorative teal bloom (top left) */}
      <Box
        sx={{
          position: 'absolute',
          top: -140,
          left: -140,
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha('#00897B', 0.18)} 0%, transparent 70%)`,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {/* Decorative purple bloom (bottom right) — desktop only (extends below on mobile and creates a gap) */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          bottom: -160,
          right: -160,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha('#8E24AA', 0.12)} 0%, transparent 70%)`,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {/* Subtle dot grid pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          backgroundImage: 'radial-gradient(circle, #00897B 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <Container
        maxWidth={false}
        sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 6, lg: 10 } }}
      >
        <Grid container spacing={{ xs: 5, md: 6 }} alignItems="center">
          {/* LEFT: Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FadeIn delay={0}>
              <Typography
                variant="overline"
                sx={{
                  color: 'secondary.main',
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  fontSize: '0.78rem',
                  mb: 1.5,
                  display: 'block',
                }}
              >
                {t('home.madeInAmerica')}
              </Typography>
            </FadeIn>

            <FadeIn delay={100}>
              <Box sx={{ mb: 3 }}>
                <SectionEyebrow
                  text={t('home.heroTitleBadge')}
                  icon={<LanguageIcon />}
                  variant="pill"
                />
              </Box>
            </FadeIn>

            <FadeIn delay={200}>
              <Typography
                variant="h1"
                sx={{
                  color: 'text.primary',
                  maxWidth: 560,
                  lineHeight: { xs: 1.15, md: 1.1 },
                  mb: 3,
                  fontSize: { xs: '2.1rem', sm: '2.4rem', md: '3.4rem' },
                }}
              >
                {heroContent.title}
              </Typography>
            </FadeIn>

            <FadeIn delay={300}>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  maxWidth: 520,
                  mb: 4,
                  fontSize: '1.05rem',
                }}
              >
                {heroContent.subtitle}
              </Typography>
            </FadeIn>

            <FadeIn delay={400}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mb: 4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/schedule"
                  startIcon={<CalendarMonthIcon />}
                  sx={{
                    py: 1.4,
                    px: 3,
                    fontSize: '1rem',
                    borderRadius: 2,
                    boxShadow: '0 8px 24px rgba(0, 137, 123, 0.25)',
                  }}
                >
                  {t('home.scheduleConsultation')}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  href="/estimate"
                  startIcon={<CalculateIcon />}
                  sx={{
                    py: 1.4,
                    px: 3,
                    fontSize: '1rem',
                    borderRadius: 2,
                    borderColor: 'primary.main',
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: alpha('#00897B', 0.05), borderColor: 'primary.dark' },
                  }}
                >
                  {t('home.getEstimate')}
                </Button>
              </Stack>
            </FadeIn>

            <FadeIn delay={500}>
              <Box
                sx={{
                  borderTop: '1px solid',
                  borderColor: alpha('#00897B', 0.18),
                  pt: 2.5,
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 700,
                    letterSpacing: 1.3,
                    fontSize: '0.7rem',
                    display: 'block',
                    textAlign: 'center',
                    mb: 2,
                  }}
                >
                  {t('home.whyAmericansTrustUs')}
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { icon: <VerifiedUserIcon />, label: t('home.usFounded') },
                    { icon: <ApartmentIcon />, label: t('home.vettedHospitals') },
                    { icon: <GroupsIcon />, label: t('home.bilingualSupport') },
                  ].map((item, i) => (
                    <Grid size={{ xs: 12, sm: 4 }} key={i}>
                      <Stack direction="row" spacing={1.75} alignItems="center">
                        <Box
                          sx={{
                            width: 52,
                            height: 52,
                            borderRadius: '50%',
                            background: `radial-gradient(circle at 50% 35%, ${alpha(
                              '#FFFFFF',
                              0.9
                            )} 0%, ${alpha('#00897B', 0.18)} 70%, ${alpha(
                              '#00897B',
                              0.22
                            )} 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: `inset 0 2px 4px ${alpha(
                              '#00897B',
                              0.18
                            )}, inset 0 -2px 4px rgba(255, 255, 255, 0.55), 0 4px 10px ${alpha(
                              '#00897B',
                              0.1
                            )}`,
                          }}
                          aria-hidden="true"
                        >
                          {React.cloneElement(item.icon, {
                            sx: { fontSize: 26, color: 'primary.main' },
                          })}
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            lineHeight: 1.3,
                            color: 'text.primary',
                            fontSize: '0.9rem',
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </FadeIn>
          </Grid>

          {/* RIGHT: Video card + huge in-frame overlay that slides on play/pause */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FadeIn delay={200}>
              {/* Mobile-only "Partnering with…" badge ABOVE the video card */}
              <Box
                sx={{
                  display: { xs: 'inline-flex', md: 'none' },
                  alignItems: 'center',
                  gap: 1,
                  mb: 1.5,
                  px: 1.75,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: 'rgba(31, 41, 51, 0.92)',
                  maxWidth: '100%',
                }}
              >
                <ApartmentIcon
                  sx={{ fontSize: 18, color: 'white', flexShrink: 0 }}
                  aria-hidden="true"
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    lineHeight: 1.3,
                    fontSize: '0.74rem',
                  }}
                >
                  {t('home.partneringWith')}
                </Typography>
              </Box>
              <Card
                sx={{
                  position: 'relative',
                  borderRadius: 4,
                  overflow: 'visible',
                  boxShadow: '0 24px 60px rgba(0, 105, 92, 0.22)',
                  border: '1px solid',
                  borderColor: alpha('#00897B', 0.14),
                  // Reserve room for the overlay's bottom edge that sticks out
                  mb: { xs: 0, md: 0 },
                }}
              >
                {/* Video frame — taller (4:3-ish) on desktop, true 16:9 on mobile so it isn't trimmed */}
                <Box
                  sx={{
                    position: 'relative',
                    paddingTop: { xs: '56.25%', md: '75%' },
                    bgcolor: alpha('#00897B', 0.06),
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    component="video"
                    controls
                    preload="metadata"
                    playsInline
                    poster="/HealthNavigatorsBG.webp"
                    src="/Supported Journey.mp4"
                    onPlay={() => setIsHeroVideoPlaying(true)}
                    onPause={() => setIsHeroVideoPlaying(false)}
                    onEnded={() => setIsHeroVideoPlaying(false)}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Floating top-left badge — desktop only (mobile shows it below) */}
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'inline-flex' },
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      alignItems: 'center',
                      gap: 1,
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      bgcolor: 'rgba(31, 41, 51, 0.78)',
                      backdropFilter: 'blur(10px)',
                      maxWidth: '70%',
                      pointerEvents: 'none',
                      zIndex: 3,
                      transition: 'opacity 0.4s ease',
                      opacity: isHeroVideoPlaying ? 0 : 1,
                    }}
                  >
                    <ApartmentIcon
                      sx={{ fontSize: 18, color: 'white' }}
                      aria-hidden="true"
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        lineHeight: 1.3,
                        fontSize: '0.74rem',
                      }}
                    >
                      {t('home.partneringWith')}
                    </Typography>
                  </Box>
                </Box>
                {/* Compact in-frame 3-stat overlay — desktop only (mobile shows it below the card) */}
                <Box
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute',
                    left: 16,
                    right: 16,
                    bottom: 16,
                    background:
                      'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    borderRadius: 2.5,
                    boxShadow:
                      '0 18px 44px rgba(17, 24, 39, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    p: 1.75,
                    zIndex: 2,
                    transition:
                      'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.45s ease',
                    transform: isHeroVideoPlaying
                      ? 'translateY(calc(100% + 40px))'
                      : 'translateY(0)',
                    opacity: isHeroVideoPlaying ? 0 : 1,
                    pointerEvents: isHeroVideoPlaying ? 'none' : 'auto',
                  }}
                >
                  <Grid container spacing={{ xs: 1, md: 1.5 }}>
                    {[
                      {
                        icon: <ShieldIcon />,
                        title: t('home.heroOverlayItem1Title'),
                        desc: t('home.heroOverlayItem1Desc'),
                      },
                      {
                        icon: <PersonIcon />,
                        title: t('home.heroOverlayItem2Title'),
                        desc: t('home.heroOverlayItem2Desc'),
                      },
                      {
                        icon: <ChatBubbleOutlineIcon />,
                        title: t('home.heroOverlayItem3Title'),
                        desc: t('home.heroOverlayItem3Desc'),
                      },
                    ].map((item, i) => (
                      <Grid size={{ xs: 12, sm: 4 }} key={i}>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="flex-start"
                        >
                          <Box
                            sx={{
                              width: 34,
                              height: 34,
                              borderRadius: '50%',
                              background: `radial-gradient(circle at 50% 35%, ${alpha(
                                '#FFFFFF',
                                0.9
                              )} 0%, ${alpha('#00897B', 0.18)} 70%, ${alpha(
                                '#00897B',
                                0.22
                              )} 100%)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              mt: 0.25,
                              boxShadow: `inset 0 1px 2px ${alpha(
                                '#00897B',
                                0.18
                              )}, inset 0 -1px 2px rgba(255, 255, 255, 0.55)`,
                            }}
                            aria-hidden="true"
                          >
                            {React.cloneElement(item.icon, {
                              sx: { fontSize: 17, color: 'primary.main' },
                            })}
                          </Box>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                color: 'text.primary',
                                lineHeight: 1.2,
                                fontSize: { xs: '0.74rem', md: '0.78rem' },
                              }}
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              sx={{
                                color: 'text.primary',
                                display: 'block',
                                mt: 0.25,
                                lineHeight: 1.35,
                                fontSize: { xs: '0.66rem', md: '0.68rem' },
                              }}
                            >
                              {item.desc}
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Card>
              {/* Mobile-only 3-stat block BELOW the video card (replaces the in-video overlay) */}
              <Box
                sx={{
                  display: { xs: 'block', md: 'none' },
                  mt: 2,
                  p: 1.75,
                  borderRadius: 2.5,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: alpha('#00897B', 0.14),
                  boxShadow: '0 6px 20px rgba(17, 24, 39, 0.06)',
                }}
              >
                <Stack spacing={1.25}>
                  {[
                    {
                      icon: <ShieldIcon />,
                      title: t('home.heroOverlayItem1Title'),
                      desc: t('home.heroOverlayItem1Desc'),
                    },
                    {
                      icon: <PersonIcon />,
                      title: t('home.heroOverlayItem2Title'),
                      desc: t('home.heroOverlayItem2Desc'),
                    },
                    {
                      icon: <ChatBubbleOutlineIcon />,
                      title: t('home.heroOverlayItem3Title'),
                      desc: t('home.heroOverlayItem3Desc'),
                    },
                  ].map((item, i) => (
                    <Stack key={i} direction="row" spacing={1.25} alignItems="flex-start">
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: '50%',
                          background: `radial-gradient(circle at 50% 35%, ${alpha('#FFFFFF', 0.9)} 0%, ${alpha('#00897B', 0.18)} 70%, ${alpha('#00897B', 0.22)} 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          mt: 0.2,
                          boxShadow: `inset 0 1px 2px ${alpha('#00897B', 0.18)}, inset 0 -1px 2px rgba(255, 255, 255, 0.55)`,
                        }}
                        aria-hidden="true"
                      >
                        {React.cloneElement(item.icon, {
                          sx: { fontSize: 17, color: 'primary.main' },
                        })}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: 'text.primary',
                            lineHeight: 1.2,
                            fontSize: '0.78rem',
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'text.secondary',
                            display: 'block',
                            mt: 0.25,
                            lineHeight: 1.35,
                            fontSize: '0.7rem',
                          }}
                        >
                          {item.desc}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </FadeIn>
          </Grid>
        </Grid>

        {/* Bottom trust strip — partner badges + endorsement (frosted glass) */}
        <FadeIn delay={600}>
          <Box
            sx={{
              mt: { xs: 6, md: 8 },
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.3) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderRadius: 3,
              border: '1px solid rgba(255, 255, 255, 0.55)',
              py: { xs: 3, md: 3.5 },
              px: { xs: 3, md: 6 },
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 3, md: 6 },
              boxShadow:
                '0 12px 40px rgba(17, 24, 39, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
            }}
          >
            <Stack direction="row" spacing={1.75} alignItems="center">
              <VerifiedUserIcon
                sx={{ color: 'primary.main', fontSize: 36 }}
                aria-hidden="true"
              />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  lineHeight: 1.2,
                  fontSize: '0.95rem',
                }}
              >
                Trusted by patients.
                <br />
                Backed by partners.
              </Typography>
            </Stack>
            <Box
              sx={{
                display: { xs: 'none', sm: 'block' },
                width: '1px',
                height: 44,
                bgcolor: alpha('#1F2933', 0.12),
              }}
            />
            {/* PLACEHOLDER: swap with real Hospitales Acreditados logo */}
            <Stack direction="row" spacing={1.75} alignItems="center">
              <AddIcon
                sx={{ color: 'secondary.main', fontSize: 40, strokeWidth: 2 }}
                aria-hidden="true"
              />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  lineHeight: 1.2,
                  fontSize: '0.95rem',
                }}
              >
                Hospitales
                <br />
                Acreditados
              </Typography>
            </Stack>
          </Box>
        </FadeIn>
      </Container>
    </Box>
  );
};

export default HeroSection;
