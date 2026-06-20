'use client';
import React from 'react';
import { Box, Container, Typography, Grid, Stack, Divider, alpha } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GroupsIcon from '@mui/icons-material/Groups';
import LanguageIcon from '@mui/icons-material/Language';
import WarningIcon from '@mui/icons-material/Warning';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LockIcon from '@mui/icons-material/Lock';
import FadeIn from '@/components/FadeIn';
import SectionEyebrow from '@/components/SectionEyebrow';
import IconFeatureCard from '@/components/IconFeatureCard';
import { useLanguage } from '@/context/LanguageContext';
import UsFlagIcon from '@/components/icons/UsFlagIcon';
import LinkNav from '@/components/home/LinkNav';

const ProblemSolutionSection = ({ isMobile }) => {
  const { t, getLocalizedHomeContent } = useLanguage();
  const { problem: problemContent, solution: solutionContent } = getLocalizedHomeContent();

  return (
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
          backgroundImage: 'radial-gradient(circle, #00897B 1px, transparent 1px)',
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
              <SectionEyebrow text={t('home.whyGuidedBadge')} icon={<ShieldIcon />} />
            </Box>
          </FadeIn>
          <FadeIn delay={100}>
            <Typography variant='h2' sx={{ color: 'text.primary', mb: 2, lineHeight: 1.2 }}>
              {t('home.whyGuidedTitlePrefix')}{' '}
              <Box
                component='em'
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
              variant='h5'
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
            alignItems='stretch'
            rowSpacing={{ xs: 3, md: 0 }}
            columnSpacing={{ xs: 0, md: 2 }}
          >
            {/* LEFT: Problem card */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
              <FadeIn delay={100} style={{ width: '100%', display: 'flex' }}>
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
                  <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    alignItems={{ xs: 'center', md: 'flex-start' }}
                  >
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
                      aria-hidden='true'
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
                        variant='h5'
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
                      <Box sx={{ pt: 2.5 }} style={{ borderTop: '2px solid #CE93D8' }}>
                        <Typography
                          variant='subtitle1'
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
                              <Stack
                                direction='row'
                                spacing={1.5}
                                alignItems='flex-start'
                                justifyContent='flex-start'
                              >
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
                                  aria-hidden='true'
                                >
                                  <PriorityHighIcon sx={{ fontSize: 13, color: 'white' }} />
                                </Box>
                                <Typography
                                  variant='body2'
                                  sx={{ color: 'text.primary', fontSize: '0.78rem' }}
                                >
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
              <FadeIn delay={200} style={{ width: '100%', display: 'flex' }}>
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
                  <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    alignItems={{ xs: 'center', md: 'flex-start' }}
                  >
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
                      aria-hidden='true'
                    >
                      <VerifiedUserIcon sx={{ fontSize: 28, color: 'primary.main' }} />
                    </Box>
                    <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                      <Typography
                        variant='h5'
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
                        <span style={{ color: '#00897B' }}>
                          <LinkNav text='Health Navigator™' />
                        </span>{' '}
                        a single point of contact who manages options, pricing, logistics, and
                        post-procedure support.
                      </Typography>
                    </Box>
                    {/* end flex right Box */}
                  </Stack>
                  {/* end icon+content Stack */}
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
                      variant='subtitle1'
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
                            <Stack
                              direction='row'
                              spacing={1}
                              alignItems='flex-start'
                              justifyContent='flex-start'
                            >
                              <CheckCircleIcon
                                sx={{ fontSize: 22, color: 'primary.main', mt: 0.1 }}
                                aria-hidden='true'
                              />
                              <Typography
                                variant='body2'
                                sx={{ color: 'text.primary', fontSize: '0.83rem' }}
                              >
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
            aria-hidden='true'
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
                  color='primary'
                  align='center'
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
                  <Stack direction='row' spacing={1.75} alignItems='center'>
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
                        variant='subtitle2'
                        sx={{
                          fontWeight: 700,
                          color: 'secondary.main',
                          lineHeight: 1.2,
                        }}
                      >
                        {badge.title}
                      </Typography>
                      <Typography
                        variant='caption'
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
  );
};

export default ProblemSolutionSection;
