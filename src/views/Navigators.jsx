'use client';
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Stack,
  alpha,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ForumIcon from '@mui/icons-material/Forum';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PersonIcon from '@mui/icons-material/Person';
import PlaceIcon from '@mui/icons-material/Place';
import ShieldIcon from '@mui/icons-material/Shield';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LanguageIcon from '@mui/icons-material/Language';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FadeIn from '../components/FadeIn';
import GlassCard from '../components/GlassCard';
import IconFeatureCard from '../components/IconFeatureCard';
import SectionEyebrow from '../components/SectionEyebrow';
import { useLanguage } from '../context/LanguageContext';

const Navigators = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { language, t } = useLanguage();

  const whatTheyDoList = t('navigatorsPage.whatTheyDoList') || [];
  const whatTheyDoDescriptions =
    t('navigatorsPage.whatTheyDoDescriptions') || [];

  // Reference image visual order maps to original whatTheyDoList indices.
  // The translations array is preserved as-is; we just present items in the
  // order the reference design shows them.
  const featureMap = [
    { srcIdx: 0, icon: <SupportAgentIcon />, color: 'primary' },
    { srcIdx: 2, icon: <ForumIcon />,         color: 'secondary' },
    { srcIdx: 4, icon: <DescriptionIcon />,   color: 'primary' },
    { srcIdx: 6, icon: <WorkOutlineIcon />,   color: 'secondary' },
    { srcIdx: 1, icon: <PersonIcon />,        color: 'secondary' },
    { srcIdx: 3, icon: <PlaceIcon />,         color: 'primary' },
    { srcIdx: 5, icon: <ShieldIcon />,        color: 'secondary' },
    { srcIdx: 7, icon: <PhoneInTalkIcon />,   color: 'primary' },
  ];

  const meetIndicators = [
    {
      icon: <FavoriteIcon />,
      label: t('navigatorsPage.indicatorCompassionate'),
    },
    {
      icon: <VerifiedUserIcon />,
      label: t('navigatorsPage.indicatorAdvocate'),
    },
    {
      icon: <LanguageIcon />,
      label: t('navigatorsPage.indicatorTrusted'),
    },
  ];

  return (
    <>
      {/* 1. Hero (Redesigned) */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 10, md: 14 },
          textAlign: 'center',
          overflow: 'hidden',
          color: 'white',
        }}
      >
        {/* Parallax background */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/HealthNavigatorsBG.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: isMobile ? 'scroll' : 'fixed',
            zIndex: 0,
          }}
        />
        {/* Gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(0, 53, 64, 0.78) 0%, rgba(15, 23, 42, 0.65) 100%)',
            backdropFilter: 'blur(2px)',
            zIndex: 0,
          }}
        />
        {/* Decorative dot grid */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 220,
            height: '100%',
            opacity: 0.18,
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            zIndex: 0,
            pointerEvents: 'none',
            display: { xs: 'none', md: 'block' },
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
          <Box sx={{ maxWidth: 900, mx: 'auto' }}>
            <FadeIn>
              <Typography
                variant="h1"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2.4rem', sm: '3rem', md: '3.6rem' },
                  lineHeight: 1.1,
                }}
              >
                {t('navigatorsPage.title')}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255, 255, 255, 0.92)',
                  mb: 4,
                  maxWidth: 720,
                  mx: 'auto',
                  lineHeight: 1.5,
                  fontSize: { xs: '1.05rem', md: '1.25rem' },
                }}
              >
                {t('navigatorsPage.subtitle')}
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/schedule"
                sx={{
                  mt: 2,
                  py: 1.6,
                  px: 4,
                  fontSize: '1rem',
                  borderRadius: 2,
                  boxShadow: '0 12px 30px rgba(0, 137, 123, 0.4)',
                }}
              >
                {t('navigatorsPage.cta')}
              </Button>
            </FadeIn>
          </Box>
        </Container>
      </Box>

      {/* 2. What Your Health Navigator Does (Redesigned 4x2 grid) */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 8, md: 12 },
          background:
            'linear-gradient(180deg, rgba(231, 245, 255, 0.5) 0%, rgba(247, 236, 255, 0.4) 100%)',
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
          {/* Section header */}
          <Box
            sx={{
              textAlign: 'center',
              maxWidth: 820,
              mx: 'auto',
              mb: { xs: 6, md: 8 },
            }}
          >
            <FadeIn>
              <Box
                sx={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <SectionEyebrow
                  text={t('navigatorsPage.whatYouGetEyebrow')}
                  variant="plain"
                />
              </Box>
            </FadeIn>
            <FadeIn delay={100}>
              <Typography
                variant="h2"
                sx={{
                  color: 'text.primary',
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                {t('navigatorsPage.whatYouGetTitle')}
              </Typography>
            </FadeIn>
            <FadeIn delay={200}>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                  lineHeight: 1.6,
                }}
              >
                {t('navigatorsPage.whatYouGetSubtitle')}
              </Typography>
            </FadeIn>
          </Box>

          {/* 4x2 feature grid */}
          <Grid container spacing={{ xs: 1.5, sm: 3 }}>
            {featureMap.map((entry, i) => {
              const title = whatTheyDoList[entry.srcIdx];
              const description = whatTheyDoDescriptions[entry.srcIdx];
              if (!title) return null;
              return (
                <Grid size={{ xs: 6, sm: 6, md: 3 }} key={i}>
                  <FadeIn delay={i * 80} style={{ height: '100%' }}>
                    <IconFeatureCard
                      icon={entry.icon}
                      title={title}
                      description={description}
                      color={entry.color}
                      variant={isMobile ? 'compact' : 'default'}
                      titleColor={theme.palette.text.primary}
                      sx={{
                        height: '100%',
                        '& .MuiTypography-subtitle1': {
                          fontSize: { xs: '0.79rem', sm: '1rem' },
                        },
                        '& .MuiTypography-body2': {
                          fontSize: { xs: '0.79rem', sm: '0.83rem' },
                        },
                      }}
                    />
                  </FadeIn>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* 3. Meet Your Health Navigators (Redesigned video + trust indicators) */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container
          maxWidth={false}
          sx={{ px: { xs: 2, md: 6, lg: 10 } }}
        >
          <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
            {/* Centered title with gradient underline */}
            <FadeIn>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: 6,
                }}
              >
                <Typography
                  variant="h2"
                  align="center"
                  sx={{ color: 'primary.main', mb: 1.5 }}
                >
                  {t('home.meetNavigatorsTitle')}
                </Typography>
                <Box
                  sx={{
                    width: 200,
                    height: 3,
                    borderRadius: 2,
                    background:
                      'linear-gradient(90deg, #00897B 0%, #8E24AA 100%)',
                  }}
                  aria-hidden="true"
                />
              </Box>
            </FadeIn>

            <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
              {/* LEFT: Video */}
              <Grid size={{ xs: 12, md: 7 }}>
                <FadeIn delay={100}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: '0 20px 50px rgba(0, 105, 92, 0.18)',
                      border: '1px solid',
                      borderColor: alpha('#00897B', 0.12),
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        paddingTop: '56.25%',
                        bgcolor: alpha('#00897B', 0.06),
                      }}
                    >
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
                      {/* Logo watermark badge top-left */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 14,
                          left: 14,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.75,
                          px: 1.25,
                          py: 0.5,
                          borderRadius: 2,
                          bgcolor: 'rgba(255, 255, 255, 0.92)',
                          backdropFilter: 'blur(8px)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                          pointerEvents: 'none',
                        }}
                      >
                        <Image
                          src="/logo.png"
                          width={22}
                          height={22}
                          alt=""
                          aria-hidden
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            color: 'primary.main',
                            fontSize: '0.75rem',
                          }}
                        >
                          MyHealth Haven
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </FadeIn>
              </Grid>

              {/* RIGHT: Description + 3 indicators + closer */}
              <Grid size={{ xs: 12, md: 5 }}>
                <FadeIn delay={200}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 700,
                      mb: 4,
                      lineHeight: 1.35,
                      fontSize: { xs: '1.2rem', md: '1.35rem' },
                    }}
                  >
                    {t('navigatorsPage.meetDesc')}
                  </Typography>
                </FadeIn>

                <Stack spacing={2.5} sx={{ mb: 4 }}>
                  {meetIndicators.map((item, i) => (
                    <FadeIn key={i} delay={300 + i * 100}>
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                      >
                        {React.cloneElement(item.icon, {
                          'aria-hidden': true,
                          sx: { fontSize: 34, color: 'primary.main', flexShrink: 0 },
                        })}
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Stack>
                    </FadeIn>
                  ))}
                </Stack>

                <FadeIn delay={600}>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontStyle: 'italic',
                        color: 'text.primary',
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      {t('navigatorsPage.meetCloser')}
                    </Typography>
                    <Box
                      sx={{
                        width: 120,
                        height: 2,
                        borderRadius: 2,
                        background:
                          'linear-gradient(90deg, #00897B 0%, #8E24AA 100%)',
                      }}
                      aria-hidden="true"
                    />
                  </Box>
                </FadeIn>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* 4. Final CTA (Unchanged) */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'transparent',
          textAlign: 'center',
        }}
      >
        <Container
          maxWidth={false}
          sx={{ px: { xs: 2, md: 6, lg: 10 } }}
        >
          <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
            <FadeIn>
              <Typography variant="h2" gutterBottom>
                {t('navigatorsPage.finalCtaTitle')}
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                {t('navigatorsPage.finalCtaDesc')}
              </Typography>
              <Box sx={{ mt: 4 }}>
                <FadeIn delay={300}>
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    href="/schedule"
                  >
                    {t('navigatorsPage.finalCtaButton')}
                  </Button>
                </FadeIn>
              </Box>
            </FadeIn>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Navigators;
