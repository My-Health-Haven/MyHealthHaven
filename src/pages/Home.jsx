import React, { useEffect, useRef } from 'react';
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
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShieldIcon from '@mui/icons-material/Shield';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Squares = React.lazy(() => import('../components/Squares/Squares'));
import FadeIn from '../components/FadeIn';
import StarBorder from '../components/StarBorder';
import GlassCard from '../components/GlassCard';
import ErrorBoundary from '../components/ErrorBoundary';
import { useUserJourney } from '../context/UserJourneyContext';
import { useLanguage } from '../context/LanguageContext';

const Threads = React.lazy(() => import('../components/Threads'));
const Marquee = React.lazy(() => import('../components/Marquee'));

const LinkNav = ({ text }) => {
  if (!text) return null;
  const regex = /(Health Navigators?™)/g;
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? 
        <Link key={i} to="/navigators" style={{ color: 'inherit', textDecoration: 'underline' }}>{part}</Link> : 
        part
      )}
    </>
  );
};

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { defaultMatches: true });
  const { journey } = useUserJourney();
  const { t, getLocalizedJourneyContent } = useLanguage();

  // Force default/neutral content by passing null, effectively ignoring any stored journey state
  const activeContent = getLocalizedJourneyContent(null);

  // Fallback safe access (though resolveJourneyContent handles defaults)
  const heroContent = activeContent.hero;
  const problemContent = activeContent.problem;
  const solutionContent = activeContent.solution;


  const howItWorksRef = useRef(null);
  const navigatorsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
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
      <Helmet>
        <title>Health Navigation™ Between the U.S. and Mexico | MyHealth Haven</title>
        <meta
          name="description"
          content="A guided, transparent way for Americans to access world-class medical care in Mexico, with U.S.-based Health Navigators™ at every step."
        />
        <meta 
          name="keywords" 
          content="knee replacement abroad, hip replacement Mexico, dental implants Cancun, cardiac diagnostics Mexico, orthopedic surgery overseas, affordable full mouth reconstruction, angiogram Cancun, heart scan Mexico, cataract surgery Mexico, executive physical abroad, longevity health checkup Cancun, stem cell treatment Cancun, full-body MRI Mexico, IVF Mexico, fertility treatment Cancun, cosmetic dentistry Mexico, MRI Cancun, egg freezing abroad, veneers Cancun, Invisalign Mexico, rhinoplasty Mexico, plastic surgery Cancun, cosmetic surgery abroad, breast augmentation Cancun, liposuction Mexico packages, executive health check Mexico, corporate wellness Cancun, sports injury surgery Mexico, eyelid surgery Mexico, anti-aging treatments Cancun, Botox Cancun, gastric sleeve Mexico, bariatric surgery Cancun, affordable knee replacement Mexico, hernia repair Cancun, gallbladder surgery Mexico, weight loss surgery Cancun, diabetes treatment Mexico, hypertension care abroad, medical tourism chronic disease, teeth whitening Mexico, mommy makeover Mexico, breast lift Cancun, hair transplant Mexico, Brazilian butt lift Cancun, tummy tuck Mexico" 
        />
      </Helmet>


      {/* 1. Hero Section */}
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(to right, #E7F5FF, #F7ECFF)',
          minHeight: { xs: 'auto', md: 'calc(100vh - 64px)' },
          display: 'flex',
          alignItems: 'center',
          py: { xs: 8, md: 0 },
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        {/* Squares removed as requested */}
        </Box>
        <Container maxWidth={false} sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 6, lg: 10 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography 
                variant="subtitle1" 
                color="secondary.main" 
                sx={{ mb: 1, fontWeight: 700, fontSize: '0.9rem' }}
              >
                {t('home.madeInAmerica')}
              </Typography>
              <Typography variant="overline" color="primary.main" fontWeight="bold" letterSpacing={1} display="block">
                {t('home.heroTitleBadge')}
              </Typography>
              <Typography variant="h1" sx={{ mt: 2, mb: 3, color: 'text.primary' }}>
                {heroContent.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: 600 }}>
                {heroContent.subtitle}
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                {journey?.urgency === 'asap' ? (
                  <Button 
                    variant="contained" 
                    size="large" 
                    color="success"
                    startIcon={<Box component="img" src="/WhatsApp.png" sx={{ width: 24, height: 24 }} />}
                    href="https://wa.me/12142763928?text=I%20am%20interested%20in%20learning%20more%20about%20medical%20care"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('home.chatWithNavigator')}
                  </Button>
                ) : (
                  <Button variant="contained" size="large" component={Link} to="/contact">
                    {t('home.speakWithNavigator')}
                  </Button>
                )}
                
                <Button variant="outlined" size="large" component={Link} to="/estimate">
                  {journey?.urgency === 'browsing' ? t('home.samplePrices') : t('home.getEstimate')}
                </Button>
              </Stack>

              <Stack spacing={1}>
                {[
                  t('home.usFounded'),
                  t('home.vettedHospitals'),
                  t('home.bilingualSupport')
                ].map((text, index) => (
                  <Stack key={index} direction="row" alignItems="center" spacing={1}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                    <Typography variant="body2" fontWeight={500}>{text}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ position: 'relative', paddingTop: '56.25%', bgcolor: 'grey.200' }}>
                  <Box
                    component="video"
                    controls
                    preload="metadata"
                    playsInline
                    poster="/HealthNavigatorsBG.webp"
                    src="/Supported Journey.mp4"
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
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="caption" color="text.primary" display="block" gutterBottom sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>
                  {t('home.partneringWith')}
                </Typography>
                {/* 
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, opacity: 0.5 }}>
                     <Typography variant="caption">{t('home.hospitalLogosParam')}</Typography>
                  </Box> 
                */}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 2. Problem / Solution */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Grid container spacing={8}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h2" gutterBottom>
                  {problemContent.title}
                </Typography>
                <Typography paragraph color="text.secondary">
                  {problemContent.desc}
                </Typography>

                
                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>{t('home.withoutGuidance')}</Typography>
                <Stack spacing={1}>
                  {[
                    t('home.unpredictableBills'),
                    t('home.unclearCredentials'),
                    t('home.languageBarriers')
                  ].map((item, i) => (
                    <FadeIn key={i} delay={i * 100}>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        • {item}
                      </Typography>
                    </FadeIn>
                  ))}
                </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h2" gutterBottom color="primary.main">
                  {solutionContent.title}
                </Typography>
                <Typography paragraph color="text.secondary">
                   {solutionContent.desc}
                </Typography>
                <Typography paragraph color="text.secondary">
                  Every patient is paired with a dedicated <LinkNav text="Health Navigator™" />—a single point of contact who manages options, pricing, logistics, and post-procedure support.
                </Typography>

                <GlassCard sx={{ mt: 4, p: 3 }}>
                  <Typography variant="h6" gutterBottom>{t('home.whatCanExpect')}</Typography>
                  <Grid container spacing={2}>
                    {[
                      t('home.expectSafety'),
                      t('home.expectPersonalized'),
                      t('home.expectClarity'),
                      t('home.expectContinuity')
                    ].map((item, i) => (
                      <Grid size={{ xs: 12, sm: 6 }} key={i}>
                        <FadeIn delay={i * 100}>
                          <Stack direction="row" spacing={1}>
                             <CheckCircleIcon color="secondary" fontSize="small" />
                             <Typography variant="body2">{item}</Typography>
                          </Stack>
                        </FadeIn>
                      </Grid>
                    ))}
                  </Grid>
                </GlassCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 3. Pillars */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
            <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 800, mx: 'auto' }}>
              <Typography variant="h2" color="primary.main" gutterBottom>{t('home.differenceTitle')}</Typography>
              <Typography variant="h5" color="text.secondary">
                {t('home.differenceSubtitle')}
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {[
                { icon: <ShieldIcon fontSize="large" color="primary" />, title: t('home.safetyTitle'), body: t('home.safetyBody') },
                { icon: <PersonIcon fontSize="large" color="primary" />, title: t('home.navigatorsTitle'), body: t('home.navigatorsBody') },
                { icon: <AttachMoneyIcon fontSize="large" color="primary" />, title: t('home.clarityTitle'), body: t('home.clarityBody') },
                { icon: <CompareArrowsIcon fontSize="large" color="primary" />, title: t('home.continuityTitle'), body: t('home.continuityBody') }
              ].map((feature, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <FadeIn delay={index * 100}>
                    <Card sx={{ height: '100%', border: 'none', boxShadow: 'none', bgcolor: 'transparent' }}>
                      <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                      <Typography variant="h6" gutterBottom fontWeight="bold"><LinkNav text={feature.title} /></Typography>
                      <Typography variant="body2" color="text.secondary">{feature.body}</Typography>
                    </Card>
                  </FadeIn>
                </Grid>
              ))}
            </Grid>
        </Container>
      </Box>

      {/* 4. How It Works */}
      <Box id="how-it-works" ref={howItWorksRef} sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent', position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
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
                            <Button component={Link} to="/contact" variant="contained" color="primary" size="large">
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
                        component="img"
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        width={item.width}
                        height={item.height}
                        sx={{
                          width: '100%',
                          maxWidth: { xs: '100%', md: '800px' },
                          height: 'auto',
                          borderRadius: 4,
                        }}
                      />
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
            
            <TestimonialsContent />
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
                     <Button component={Link} to="/medical-travel" variant="contained" color="secondary">{t('home.learnMedicalTravel')}</Button>
                   </FadeIn>
                </Box>
              </Grid>
            </Grid>
        </Container>
      </Box>

      {/* 7. Navigators Preview */}
      <Box ref={navigatorsRef} sx={{ position: 'relative', pt: { xs: 8, md: 12 }, pb: { xs: 3, md: 6 }, bgcolor: 'transparent', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          {!isMobile && (
            <React.Suspense fallback={null}>
              <ErrorBoundary fallback={null}>
              <Threads color={[0.556, 0.141, 0.666]} amplitude={1} distance={0} enableMouseInteraction={true} />
              </ErrorBoundary>
            </React.Suspense>
          )}
        </Box>
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
                    preload="metadata"
                    playsInline
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

            <Grid container spacing={4} justifyContent="center">
              {(t('home.navigatorProfiles', { returnObjects: true }) || []).map((profile, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <FadeIn delay={index * 200}>
                    <GlassCard sx={{ 
                      textAlign: 'center', 
                      height: '100%', 
                      maxWidth: 340,
                      mx: 'auto',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <Box 
                        component="img" 
                        src={profile.img} 
                        alt={profile.name}
                        loading="lazy"
                        width={profile.width}
                        height={profile.height}
                        sx={{ 
                          width: '100%', 
                          aspectRatio: '1/1', 
                          objectFit: 'cover',
                          bgcolor: 'primary.light'
                        }} 
                      />
                      <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" fontWeight="bold">{profile.name}</Typography>
                        <Typography variant="subtitle2" color="primary.main">{profile.title}</Typography>
                        <Typography variant="caption" display="block" sx={{ mb: 2, fontStyle: 'italic' }}>{profile.creds}</Typography>
                        <Typography variant="body2">{profile.blurb}</Typography>
                      </Box>
                    </GlassCard>
                  </FadeIn>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <FadeIn delay={300}>
                <Button component={Link} to="/navigators" variant="outlined">{t('home.seeHowNavigatorsWork')}</Button>
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
                <Button variant="contained" size="large" component={Link} to="/contact">{t('home.scheduleConsultation')}</Button>
                <Button variant="outlined" size="large" component={Link} to="/estimate">{t('home.getEstimate')}</Button>
              </Stack>

            </FadeIn>
          </Box>
        </Container>
      </Box>
    </>
  );
};

const TestimonialsContent = () => {
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
        <React.Suspense fallback={null}>
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
      </FadeIn>
    </>
  );
};

export default Home;
