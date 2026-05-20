'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  Card,
  CardContent,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  alpha,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Link from 'next/link';
import ShieldIcon from '@mui/icons-material/Shield';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalculateIcon from '@mui/icons-material/Calculate';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import LanguageIcon from '@mui/icons-material/Language';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LockIcon from '@mui/icons-material/Lock';
import AddIcon from '@mui/icons-material/Add';

const Squares = dynamic(() => import('../components/Squares/Squares'), { ssr: false });
import FadeIn from '../components/FadeIn';
import StarBorder from '../components/StarBorder';
import GlassCard from '../components/GlassCard';
import ErrorBoundary from '../components/ErrorBoundary';
import IconFeatureCard from '../components/IconFeatureCard';
import SectionEyebrow from '../components/SectionEyebrow';
import { useLanguage } from '../context/LanguageContext';

// Inline US flag icon (placeholder until real partner logos provided)
const UsFlagIcon = ({ sx = {} }) => (
  <Box
    component="svg"
    viewBox="0 0 24 16"
    sx={{ width: 26, height: 18, borderRadius: 0.5, display: 'block', ...sx }}
    aria-hidden="true"
  >
    <rect width="24" height="16" fill="#B22234" />
    <g fill="#FFFFFF">
      <rect y="1.23" width="24" height="1.23" />
      <rect y="3.69" width="24" height="1.23" />
      <rect y="6.15" width="24" height="1.23" />
      <rect y="8.62" width="24" height="1.23" />
      <rect y="11.08" width="24" height="1.23" />
      <rect y="13.54" width="24" height="1.23" />
    </g>
    <rect width="9.6" height="8.62" fill="#3C3B6E" />
  </Box>
);

export { UsFlagIcon };

const Marquee = dynamic(() => import('../components/Marquee'), { ssr: false });

const LinkNav = ({ text }) => {
  if (!text) return null;
  const regex = /(Health Navigators?™)/g;
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? 
        <Link key={i} href="/navigators" style={{ color: 'inherit', textDecoration: 'underline' }}>{part}</Link> : 
        part
      )}
    </>
  );
};

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { defaultMatches: true });
  const { language, t, getLocalizedHomeContent } = useLanguage();
  const [hasMounted, setHasMounted] = useState(false);
  const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState(false);

  const activeContent = getLocalizedHomeContent();

  // Home content is resolved per language in LanguageContext.
  const heroContent = activeContent.hero;
  const problemContent = activeContent.problem;
  const solutionContent = activeContent.solution;


  const howItWorksRef = useRef(null);
  const navigatorsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const triggerPoint = windowHeight / 2;

          const getOffset = (ref) => ref.current ? ref.current.offsetTop : 0;

          const howItWorksTop = getOffset(howItWorksRef);
          const navigatorsTop = getOffset(navigatorsRef);
          const testimonialsTop = getOffset(testimonialsRef);
          const ctaTop = getOffset(ctaRef);

          let newColor = '#ffffff';

          if (scrollY + triggerPoint >= ctaTop) {
            newColor = '#ffffff';
          } else if (scrollY + triggerPoint >= testimonialsTop) {
            newColor = '#E0F2F1'; // Pastel Green
          } else if (scrollY + triggerPoint >= navigatorsTop) {
            newColor = '#ffffff';
          } else if (scrollY + triggerPoint >= howItWorksTop) {
            newColor = '#F3E5F5'; // Pastel Purple
          } else {
            newColor = '#ffffff';
          }

          document.body.style.backgroundColor = newColor;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <>
      {/* 1. Hero Section (Redesigned) */}
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

      {/* 2. Why Guided Medical Travel (Unified — replaces Problem/Solution + Pillars) */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 'auto', md: 'calc(100vh - 64px)' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pt: { xs: 4, md: 4 },
          pb: { xs: 8, md: 8 },
          background:
            'linear-gradient(180deg, rgba(231, 245, 255, 0.45) 0%, rgba(247, 236, 255, 0.4) 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Subtle dot pattern */}
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
          sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 6, lg: 10 } }}
        >
          {/* Section header */}
          <Box
            sx={{
              textAlign: 'center',
              maxWidth: 820,
              mx: 'auto',
              mb: { xs: 3, md: 4 },
            }}
          >
            <FadeIn>
              <Box
                sx={{
                  display: 'inline-flex',
                  mb: 3,
                  justifyContent: 'center',
                }}
              >
                <SectionEyebrow
                  text={t('home.whyGuidedBadge')}
                  icon={<ShieldIcon />}
                />
              </Box>
            </FadeIn>
            <FadeIn delay={100}>
              <Typography
                variant="h2"
                sx={{ color: 'text.primary', mb: 2, lineHeight: 1.2 }}
              >
                {t('home.whyGuidedTitlePrefix')}{' '}
                <Box
                  component="em"
                  sx={{
                    color: 'primary.main',
                    fontStyle: 'italic',
                    fontWeight: 700,
                  }}
                >
                  {t('home.whyGuidedTitleEmphasis')}
                </Box>{' '}
                {t('home.whyGuidedTitleSuffix')}
              </Typography>
            </FadeIn>
            <FadeIn delay={200}>
              <Typography
                variant="h5"
                style={{ fontSize: '1rem', lineHeight: 1.6 }}
                sx={{ color: 'text.secondary' }}
              >
                {t('home.whyGuidedSubtitle')}
              </Typography>
            </FadeIn>
          </Box>

          {/* Comparison cards */}
          <Box sx={{ position: 'relative', mb: { xs: 3, md: 5 } }}>
          <Grid
            container
            alignItems="stretch"
            rowSpacing={{ xs: 3, md: 0 }}
            columnSpacing={{ xs: 0, md: 2 }}
          >
            {/* LEFT: Problem card */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
              <FadeIn
                delay={100}
                style={{ width: '100%', display: 'flex' }}
              >
                <Box
                  sx={{
                    flex: 1,
                    p: { xs: 3, md: 4 },
                    borderRadius: 4,
                    background:
                      'linear-gradient(135deg, rgba(142, 36, 170, 0.05) 0%, rgba(247, 236, 255, 0.7) 100%)',
                    border: '1px solid',
                    borderColor: 'rgba(206, 147, 216, 0.55)',
                  }}
                >
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
                    {/* Icon fixed on the left */}
                    <Box
                      sx={{
                        width: 59,
                        height: 59,
                        borderRadius: '50%',
                        background: `radial-gradient(circle at 40% 32%, rgba(255,255,255,0.96) 0%, rgba(206,147,216,0.28) 55%, rgba(142,36,170,0.2) 100%)`,
                        border: `1.5px solid rgba(206,147,216,0.52)`,
                        boxShadow: `inset 0 2px 6px rgba(142,36,170,0.08), inset 0 -2px 5px rgba(255,255,255,0.7), 0 4px 16px rgba(142,36,170,0.12)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      <WarningIcon
                        sx={{
                          fontSize: 29,
                          color: '#CE93D8',
                          '& path': {
                            stroke: '#8E24AA',
                            strokeWidth: '0.8px',
                            strokeLinejoin: 'round',
                          },
                        }}
                      />
                    </Box>
                    {/* All text content to the right */}
                    <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                      <Typography
                        variant="h5"
                        style={{ fontSize: isMobile ? '1.1rem' : '1.425rem', lineHeight: 1.25 }}
                        sx={{ fontWeight: 700, color: 'text.primary', mb: 1.5 }}
                      >
                        {problemContent.title}
                      </Typography>
                      <Typography
                        paragraph
                        style={{ fontSize: isMobile ? '0.8rem' : '0.903rem' }}
                        sx={{ color: 'text.primary', opacity: 0.65, mb: 2.5 }}
                      >
                        {problemContent.desc}
                      </Typography>
                      <Box
                        sx={{ pt: 2.5 }}
                        style={{ borderTop: '2px solid #CE93D8' }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}
                        >
                          {t('home.withoutGuidance')}
                        </Typography>
                        <Stack spacing={1.5}>
                          {[
                            t('home.unpredictableBills'),
                            t('home.unclearCredentials'),
                            t('home.languageBarriers'),
                          ].map((item, i) => (
                            <FadeIn key={i} delay={i * 100}>
                              <Stack direction="row" spacing={1.5} alignItems={{ xs: 'center', md: 'flex-start' }} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                                <Box
                                  sx={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: '50%',
                                    bgcolor: '#6A0080',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    mt: 0.2,
                                  }}
                                  aria-hidden="true"
                                >
                                  <PriorityHighIcon sx={{ fontSize: 13, color: 'white' }} />
                                </Box>
                                <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.78rem' }}>
                                  {item}
                                </Typography>
                              </Stack>
                            </FadeIn>
                          ))}
                        </Stack>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              </FadeIn>
            </Grid>

            {/* RIGHT: Solution card */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
              <FadeIn
                delay={200}
                style={{ width: '100%', display: 'flex' }}
              >
                <Box
                  sx={{
                    flex: 1,
                    p: { xs: 3, md: 4 },
                    borderRadius: 4,
                    background:
                      'linear-gradient(135deg, rgba(0, 137, 123, 0.06) 0%, rgba(231, 245, 255, 0.7) 100%)',
                    borderTop: `1px solid ${alpha('#00897B', 0.2)}`,
                    borderRight: `1px solid ${alpha('#00897B', 0.2)}`,
                    borderBottom: `1px solid ${alpha('#00897B', 0.2)}`,
                    borderLeft: '4px solid #00897B',
                  }}
                >
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        background: `radial-gradient(circle at 45% 30%, ${alpha('#FFFFFF', 0.88)} 0%, ${alpha('#00897B', 0.16)} 58%, ${alpha('#00897B', 0.26)} 100%)`,
                        border: `1px solid ${alpha('#00897B', 0.18)}`,
                        boxShadow: `inset 0 2px 5px ${alpha('#00897B', 0.14)}, inset 0 -2px 5px rgba(255,255,255,0.65), 0 4px 14px ${alpha('#00897B', 0.13)}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      <VerifiedUserIcon sx={{ fontSize: 28, color: 'primary.main' }} />
                    </Box>
                    <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                      <Typography
                        variant="h5"
                        style={{ fontSize: isMobile ? '1.05rem' : '1.354rem', lineHeight: 1.25 }}
                        sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5 }}
                      >
                        {solutionContent.title}
                      </Typography>
                      <Typography
                        paragraph
                        style={{ fontSize: isMobile ? '0.8rem' : '0.95rem' }}
                        sx={{ color: 'text.secondary', mb: 2 }}
                      >
                        {solutionContent.desc}
                      </Typography>
                      <Typography
                        paragraph
                        style={{ fontSize: isMobile ? '0.8rem' : '0.903rem' }}
                        sx={{ color: 'text.secondary', mb: 3 }}
                      >
                        Every patient is paired with a dedicated{' '}
                        <span style={{ color: '#00897B' }}><LinkNav text="Health Navigator™" /></span>{' '}a single point of
                        contact who manages options, pricing, logistics, and
                        post-procedure support.
                      </Typography>
                    </Box>{/* end flex right Box */}
                  </Stack>{/* end icon+content Stack */}
                  {/* What you can expect — full card width */}
                  <Box
                    sx={{
                      bgcolor: 'background.paper',
                      borderRadius: 3,
                      p: 2.5,
                      boxShadow: '0 4px 16px rgba(17, 24, 39, 0.05)',
                      mt: 2,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700, color: 'primary.main', mb: 2, textAlign: 'center' }}
                    >
                      {t('home.whatCanExpect')}
                    </Typography>
                    <Divider sx={{ mb: 2, borderColor: alpha('#00897B', 0.2) }} />
                    <Grid container spacing={1.5}>
                      {[
                        t('home.expectSafety'),
                        t('home.expectPersonalized'),
                        t('home.expectClarity'),
                        t('home.expectContinuity'),
                      ].map((item, i) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={i}>
                          <FadeIn delay={i * 100}>
                            <Stack direction="row" spacing={1} alignItems={{ xs: 'center', md: 'flex-start' }} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                              <CheckCircleIcon
                                sx={{ fontSize: 22, color: 'primary.main', mt: 0.1 }}
                                aria-hidden="true"
                              />
                              <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.83rem' }}>
                                {item}
                              </Typography>
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

          {/* Arrow overlay centered on the card boundary */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid',
              borderColor: alpha('#00897B', 0.2),
              boxShadow: '0 8px 24px rgba(0, 137, 123, 0.2)',
            }}
            aria-hidden="true"
          >
            <ArrowForwardIcon sx={{ color: 'primary.main', fontSize: 24 }} />
          </Box>
          </Box>

          {/* 4 Pillar cards */}
          <Grid container spacing={3} sx={{ mb: { xs: 3, md: 4 } }}>
            {[
              {
                icon: <ShieldIcon />,
                title: t('home.safetyTitle'),
                body: t('home.safetyBody'),
              },
              {
                icon: <PersonIcon />,
                title: t('home.navigatorsTitle'),
                body: t('home.navigatorsBody'),
              },
              {
                icon: <AttachMoneyIcon />,
                title: t('home.clarityTitle'),
                body: t('home.clarityBody'),
              },
              {
                icon: <FavoriteIcon />,
                title: t('home.continuityTitle'),
                body: t('home.continuityBody'),
              },
            ].map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <FadeIn delay={index * 100} style={{ height: '100%' }}>
                  <IconFeatureCard
                    icon={feature.icon}
                    title={<LinkNav text={feature.title} />}
                    description={feature.body}
                    color="primary"
                    align="center"
                  />
                </FadeIn>
              </Grid>
            ))}
          </Grid>

          {/* Bottom 4-column trust badge row */}
          <FadeIn delay={300}>
            <Box
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 3,
                py: { xs: 3, md: 3.5 },
                px: { xs: 2, md: 4 },
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 6px 24px rgba(17, 24, 39, 0.04)',
              }}
            >
              <Grid container spacing={{ xs: 3, md: 0 }}>
                {[
                  {
                    icon: <UsFlagIcon sx={{ width: 38, height: 26 }} />,
                    title: t('home.trustUsFoundedTitle'),
                    desc: t('home.trustUsFoundedDesc'),
                  },
                  {
                    icon: <HandshakeIcon />,
                    title: t('home.trustMexicoPartneredTitle'),
                    desc: t('home.trustMexicoPartneredDesc'),
                  },
                  {
                    icon: <GroupsIcon />,
                    title: t('home.trustPatientFocusedTitle'),
                    desc: t('home.trustPatientFocusedDesc'),
                  },
                  {
                    icon: <LockIcon />,
                    title: t('home.trustPrivateSecureTitle'),
                    desc: t('home.trustPrivateSecureDesc'),
                  },
                ].map((badge, i) => (
                  <Grid
                    size={{ xs: 12, sm: 6, md: 3 }}
                    key={i}
                    sx={{
                      borderLeft: {
                        xs: 'none',
                        md: i > 0 ? '1px solid' : 'none',
                      },
                      borderColor: { md: alpha('#1F2933', 0.1) },
                      pl: { md: i > 0 ? 3 : 0 },
                      pr: { md: i < 3 ? 3 : 0 },
                    }}
                  >
                    <Stack direction="row" spacing={1.75} alignItems="center">
                      {React.isValidElement(badge.icon)
                        ? React.cloneElement(badge.icon, {
                            sx: {
                              ...(badge.icon.props?.sx || {}),
                              fontSize: 34,
                              color: 'secondary.main',
                            },
                          })
                        : badge.icon}
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            color: 'secondary.main',
                            lineHeight: 1.2,
                          }}
                        >
                          {badge.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'text.secondary',
                            display: 'block',
                            mt: 0.3,
                            lineHeight: 1.4,
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

      {/* 4. How It Works */}
      <Box id="how-it-works" ref={howItWorksRef} sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent', position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          {hasMounted ? (
            <React.Suspense fallback={null}>
              <ErrorBoundary fallback={null}>
                <Squares
                  speed={0.5}
                  squareSize={40}
                  direction='down'
                  borderColor='rgba(0, 137, 123, 0.1)'
                  hoverFillColor='#8E24AA'
                />
              </ErrorBoundary>
            </React.Suspense>
          ) : null}
        </Box>
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 6, lg: 10 }, position: 'relative', zIndex: 1 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" color="primary.main" gutterBottom>{t('home.howItWorksTitle')}</Typography>
              <Typography variant="h5" color="text.secondary">{t('home.howItWorksSubtitle')}</Typography>
            </Box>
            <Grid container spacing={4}>
              {[
                { step: 1, title: t('home.step1Title'), body: t('home.step1Body'), cta: true, img: "/step1.png", width: 1000, height: 789 },
                { step: 2, title: t('home.step2Title'), body: t('home.step2Body'), img: "/step2.png", width: 1000, height: 742 },
                { step: 3, title: t('home.step3Title'), body: t('home.step3Body'), img: "/step3.png", width: 1000, height: 720 }
              ].map((item, index) => (
                <Grid container spacing={2} alignItems="center" direction={{ xs: 'column', md: index % 2 === 1 ? 'row-reverse' : 'row' }} key={index} sx={{ mb: { xs: 6, md: 8 } }}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FadeIn delay={200}>
                      <Box sx={{ 
                        p: 2, 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center'
                      }}>
                        <Typography variant="h1" className="shiny-text-dark" sx={{ fontWeight: 900, mb: 1, color: 'text.primary', fontSize: '5rem' }}>
                          {t('home.step')} {item.step}
                        </Typography>
                        <Typography variant="h5" gutterBottom fontWeight="bold" color="text.primary">{item.title}</Typography>
                        <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 500, mx: 'auto' }}>{item.body}</Typography>
                        {item.cta && (
                          <Box sx={{ mt: 2 }}>
                            <Button component={Link} href="/schedule" variant="contained" color="primary" size="large">
                              {t('home.scheduleCall')}
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </FadeIn>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <FadeIn delay={400}>
                      <Box
                        sx={{
                          width: '100%',
                          maxWidth: { xs: '100%', md: '800px' },
                          borderRadius: 4,
                          overflow: 'hidden',
                          lineHeight: 0,
                        }}
                      >
                        <Image
                          src={item.img}
                          alt={item.title}
                          width={item.width}
                          height={item.height}
                          sizes="(max-width: 900px) 100vw, 800px"
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </Box>
                    </FadeIn>
                  </Grid>
                </Grid>
              ))}
            </Grid>
        </Container>
      </Box>

      {/* 5. Testimonials */}
      {/* 5. Testimonials */}
      <Box ref={testimonialsRef} sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
            <Typography variant="h2" color="primary.main" align="center" gutterBottom>{t('home.testimonialsTitle')}</Typography>
            <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 8 }}>{t('home.testimonialsSubtitle')}</Typography>
            
            <TestimonialsContent hasMounted={hasMounted} />
        </Container>
      </Box>


      {/* 6. Why Mexico */}
      <Box sx={{ position: 'relative', py: { xs: 8, md: 12 }, overflow: 'hidden' }}>
        {/* Parallax Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/cancun-skyline.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: isMobile ? 'scroll' : 'fixed',
            zIndex: 0,
          }}
        />
        {/* Darkening & Blur Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(3px)',
            zIndex: 0,
          }}
        />
        
        <Container maxWidth={false} sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 6, lg: 10 } }}>
            <Grid container spacing={8} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h2" sx={{ color: 'white', mb: 2 }}>{t('home.whyMexicoTitle')}</Typography>
                <Typography variant="h5" sx={{ color: 'grey.300', mb: 3 }}>{t('home.whyMexicoSubtitle')}</Typography>
                <Typography paragraph sx={{ color: 'grey.300' }}>
                  {t('home.whyMexicoDesc1')}
                </Typography>
                <Typography paragraph sx={{ color: 'grey.300' }}>
                  {t('home.whyMexicoDesc2')}
                </Typography>
                <Stack spacing={1} sx={{ mt: 3 }}>
                  {[t('home.whyMexicoPoint1'), t('home.whyMexicoPoint2'), t('home.whyMexicoPoint3')].map((item, i) => (
                    <FadeIn key={i} delay={i * 100}>
                      <Typography variant="body2" fontWeight={500} sx={{ color: 'white' }}>• {item}</Typography>
                    </FadeIn>
                  ))}
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={3}>
                  {[
                    { label: t('home.costEfficiency'), value: "30–60%", desc: t('home.costEfficiencyDesc') },
                    { label: t('home.languageAccess'), value: "Bilingual", desc: t('home.languageAccessDesc') },
                    { label: t('home.supportCities'), value: "Cancún +", desc: t('home.supportCitiesDesc') }
                  ].map((stat, i) => (
                    <Grid size={{ xs: 12 }} key={i}>
                      <FadeIn delay={i * 150}>
                        <GlassCard 
                          variant="glass"
                          sx={{ 
                          p: 3, 
                          borderLeft: '4px solid', 
                          borderLeftColor: 'primary.light', // Ensure this overrides or merges correctly
                          // The GlassCard has its own border, we might want to keep the left border accent
                        }}>
                          <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>{stat.value}</Typography>
                          <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold' }}>{stat.label}</Typography>
                          <Typography variant="body2" sx={{ color: 'grey.300' }}>{stat.desc}</Typography>
                        </GlassCard>
                      </FadeIn>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ mt: 4 }}>
                   <FadeIn delay={500}>
                     <Button component={Link} href="/medical-travel" variant="contained" color="secondary">{t('home.learnMedicalTravel')}</Button>
                   </FadeIn>
                </Box>
              </Grid>
            </Grid>
        </Container>
      </Box>

      {/* 7. Navigators Preview */}
      <Box ref={navigatorsRef} sx={{ position: 'relative', pt: { xs: 8, md: 12 }, pb: { xs: 3, md: 6 }, bgcolor: 'transparent', overflow: 'hidden' }}>
        <Container maxWidth={false} sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 6, lg: 10 } }}>

            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" color="primary.main" gutterBottom><LinkNav text={t('home.meetNavigatorsTitle')} /></Typography>
              <Typography variant="h5" color="text.secondary">{t('home.meetNavigatorsSubtitle')}</Typography>
            </Box>

            {/* Navigator Video */}
            <Box sx={{ mb: 8, maxWidth: 800, mx: 'auto' }}>
               <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ position: 'relative', paddingTop: '56.25%', bgcolor: 'grey.200' }}>
                  <Box
                    component="video"
                    controls
                    preload="none"
                    playsInline
                    poster="/HealthNavigatorsBG.webp"
                    src="/Meet Your Health Navigator.mp4"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </Card>
            </Box>

            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <FadeIn delay={300}>
                <Button component={Link} href="/schedule" variant="outlined">{t('home.seeHowNavigatorsWork')}</Button>
              </FadeIn>
            </Box>
        </Container>
      </Box>

      

      {/* 8. FAQs */}
      <Box id="faq" sx={{ pt: { xs: 2, md: 3 }, pb: { xs: 3, md: 6 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
            <Typography variant="h2" color="primary.main" align="center" gutterBottom>{t('home.faqTitle')}</Typography>
            <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6 }}>{t('home.faqSubtitle')}</Typography>
            <Stack spacing={1}>
              {Array.from({ length: 13 }, (_, i) => ({
                q: t(`home.faq${i + 1}Q`),
                a: t(`home.faq${i + 1}A`)
              })).map((faq, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <Accordion sx={{ 
                    // mb: 1, // Handled by Stack
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07), inset 0 0 20px rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px !important', // Force rounded corners
                    '&:before': { display: 'none' }, // Remove default divider
                  }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1" fontWeight="bold">{faq.q}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">{faq.a}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </FadeIn>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* 9. Final CTA */}
      <Box ref={ctaRef} sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent', textAlign: 'center' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
            <FadeIn>
              <Typography variant="overline" color="primary.main" fontWeight="bold">{t('home.ctaBadge')}</Typography>
              <Typography variant="h2" gutterBottom sx={{ mt: 2 }}><LinkNav text={t('home.ctaTitle')} /></Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                {t('home.ctaDesc')}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                <Button variant="contained" size="large" component={Link} href="/schedule">{t('home.scheduleConsultation')}</Button>
                <Button variant="outlined" size="large" component={Link} href="/estimate">{t('home.getEstimate')}</Button>
              </Stack>

            </FadeIn>
          </Box>
        </Container>
      </Box>
    </>
  );
};

const TestimonialsContent = ({ hasMounted }) => {
  const [shuffled, setShuffled] = React.useState(null);
  const { t, language } = useLanguage();

  useEffect(() => {
     // Verified Reviews only - fetched from translations
    const allTestimonials = t('home.testimonials') || [];
    if (allTestimonials.length > 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShuffled([...allTestimonials].sort(() => 0.5 - Math.random()));
    }
  }, [language, t]); // Re-run when language/content changes

  if (!shuffled || shuffled.length === 0) return null; // or a loading skeleton

  const gridItems = shuffled.slice(0, 2);
  const carouselItems = shuffled.slice(2);

  return (
    <>
      {/* Top 2 - Grid Layout */}
      <Grid container spacing={4} sx={{ mb: 8 }} justifyContent="center">
        {gridItems.map((testi, i) => (
          <Grid size={{ xs: 12, md: 6 }} key={i} sx={{ display: 'flex' }}>
            <FadeIn delay={i * 200} style={{ width: '100%' }}>
              <GlassCard sx={{ 
                p: 4, 
                height: '100%', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)' }
              }}>
                <Typography variant="h6" paragraph fontStyle="italic">"{testi.quote}"</Typography>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">{testi.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{testi.meta}</Typography>
                </Box>
              </GlassCard>
            </FadeIn>
          </Grid>
        ))}
      </Grid>

      {/* Remaining - Marquee Carousel */}
      <FadeIn delay={400}>
        {hasMounted ? (
          <React.Suspense fallback={<Box sx={{ minHeight: 200 }} />}>
            <Marquee speed={40} pauseOnHover={true}>
              {carouselItems.map((testi, i) => (
                <Box key={i} sx={{ width: 400, flexShrink: 0 }}>
                  <GlassCard sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    mx: 2 // Margin for spacing in marquee
                  }}>
                    <Typography variant="body1" paragraph fontStyle="italic">"{testi.quote}"</Typography>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">{testi.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{testi.meta}</Typography>
                    </Box>
                  </GlassCard>
                </Box>
              ))}
            </Marquee>
          </React.Suspense>
        ) : null}
      </FadeIn>
    </>
  );
};

export default Home;


