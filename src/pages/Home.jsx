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
  IconButton,
  alpha,
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

import Squares from '../components/Squares/Squares';
import FadeIn from '../components/FadeIn';
import StarBorder from '../components/StarBorder';
import Threads from '../components/Threads';
import GlassCard from '../components/GlassCard';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const howItWorksRef = useRef(null);
  const navigatorsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll);
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
          <Squares 
            speed={0.5} 
            squareSize={40}
            direction='down' 
            borderColor='rgba(0, 137, 123, 0.1)'
            hoverFillColor='#8E24AA'
          />
        </Box>
        <Container maxWidth={false} sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 6, lg: 10 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="overline" color="primary.main" fontWeight="bold" letterSpacing={1}>
                Health Navigation™ Across Borders
              </Typography>
              <Typography variant="h1" sx={{ mt: 2, mb: 3, color: 'text.primary' }}>
                World-class medical care in Mexico, guided by U.S. healthcare experts.
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: 600 }}>
                We help Americans access safe, accredited hospitals in Mexico with transparent pricing, bilingual support, and a dedicated Health Navigator™ from first question to full recovery.
              </Typography>
              
              <Chip 
                label="Made In America, Made Better in Mexico" 
                color="secondary" 
                variant="outlined" 
                sx={{ mb: 4, fontWeight: 600, border: '2px solid' }} 
              />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                <Button variant="contained" size="large" component={Link} to="/contact">
                  Speak with a Health Navigator™
                </Button>
                <Button variant="outlined" size="large" component={Link} to="/estimate">
                  Get a No-Signup Cost Estimate
                </Button>
              </Stack>

              <Stack spacing={1}>
                {[
                  "U.S.-founded, Mexico-partnered",
                  "Vetted hospitals meeting U.S.-level standards",
                  "Bilingual clinical and logistics support"
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
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <IconButton aria-label="play video" size="large" sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'white' }, mb: 2 }}>
                       <PlayArrowIcon fontSize="large" color="primary" />
                    </IconButton>
                    <Typography variant="subtitle2" color="text.secondary">Watch how Health Navigation™ works</Typography>
                  </Box>
                </Box>
              </Card>
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  Partnering with leading hospitals and clinicians in Mexico
                </Typography>
                {/* Logos Placeholder */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, opacity: 0.5 }}>
                   <Typography variant="caption">[Hospital Logos Placeholder]</Typography>
                </Box>
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
                  When U.S. care is out of reach, patients are forced into hard choices.
                </Typography>
                <Typography paragraph color="text.secondary">
                  In the U.S., many people postpone necessary procedures because of high costs, long wait times, or confusing insurance rules.
                </Typography>
                <Typography paragraph color="text.secondary">
                  Others look abroad on their own—scrolling through ads and marketplaces with no way to verify safety, quality, or true costs.
                </Typography>
                
                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Without guidance, patients face:</Typography>
                <Stack spacing={1}>
                  {[
                    "Unpredictable bills and surprise add-on fees.",
                    "Unclear hospital credentials and infection control standards.",
                    "Language barriers and fragmented follow-up care."
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
                  MyHealth Haven turns medical travel into a guided, transparent path.
                </Typography>
                <Typography paragraph color="text.secondary">
                  We bridge the U.S. and Mexican healthcare systems, combining American standards with Mexico’s clinical excellence and affordability.
                </Typography>
                <Typography paragraph color="text.secondary">
                  Every patient works with a dedicated Health Navigator™ who coordinates options, pricing, logistics, and post-procedure support.
                </Typography>

                <GlassCard sx={{ mt: 4, p: 3 }}>
                  <Typography variant="h6" gutterBottom>What you can expect:</Typography>
                  <Grid container spacing={2}>
                    {[
                      "Safety & Standards aligned with U.S. expectations.",
                      "Personalized Navigation by bilingual professionals.",
                      "Financial Clarity with all-inclusive estimates.",
                      "Continuity of Care with your U.S. providers."
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
              <Typography variant="h2" color="primary.main" gutterBottom>What makes Health Navigation™ different</Typography>
              <Typography variant="h5" color="text.secondary">
                We are not a travel agency and not a hospital chain. We are your long-term health advocate across borders.
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {[
                { icon: <ShieldIcon fontSize="large" color="primary" />, title: "Safety & Standards", body: "Partner hospitals must meet or exceed U.S.-level benchmarks for credentialing, infection control, and transparency." },
                { icon: <PersonIcon fontSize="large" color="primary" />, title: "Personal Health Navigators™", body: "A single point of contact who knows your case and guides you from first call through recovery." },
                { icon: <AttachMoneyIcon fontSize="large" color="primary" />, title: "Financial Clarity", body: "All-inclusive estimates shared in plain English before you travel—no hidden facility or ‘surprise’ fees." },
                { icon: <CompareArrowsIcon fontSize="large" color="primary" />, title: "Continuity of Care", body: "We help coordinate with your U.S. clinicians before and after your procedure to support safe outcomes." }
              ].map((feature, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <FadeIn delay={index * 100}>
                    <Card sx={{ height: '100%', border: 'none', boxShadow: 'none', bgcolor: 'transparent' }}>
                      <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                      <Typography variant="h6" gutterBottom fontWeight="bold">{feature.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{feature.body}</Typography>
                    </Card>
                  </FadeIn>
                </Grid>
              ))}
            </Grid>
        </Container>
      </Box>

      {/* 4. How It Works */}
      <Box ref={howItWorksRef} sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" color="primary.main" gutterBottom>How Health Navigation™ works</Typography>
              <Typography variant="h5" color="text.secondary">A clear, guided journey from first question to full recovery.</Typography>
            </Box>
            <Grid container spacing={4}>
              {[
                { step: 1, title: "Talk with a Health Navigator™", body: "Share your medical goals, history, concerns, and budget during a confidential consultation.", cta: true },
                { step: 2, title: "Receive a curated care plan", body: "We match you with vetted hospitals and specialists, provide all-inclusive estimates, and outline options in writing." },
                { step: 3, title: "Travel, treatment, and recovery support", body: "We coordinate logistics, help you prepare for surgery, and stay connected during your recovery back home." }
              ].map((item, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <FadeIn delay={index * 150}>
                    <GlassCard sx={{ 
                      position: 'relative', 
                      p: 4, 
                      height: '100%',
                    }}>
                      <Typography variant="h1" className="shiny-text" sx={{ position: 'absolute', top: 10, right: 20, fontWeight: 900, fontSize: '6rem', lineHeight: 1, zIndex: 0 }}>
                        {item.step}
                      </Typography>
                      <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold">{item.title}</Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>{item.body}</Typography>
                        {item.cta && (
                          <Button component={Link} to="/contact" variant="text" color="primary" sx={{ p: 0 }}>
                            Schedule your call &rarr;
                          </Button>
                        )}
                      </Box>
                    </GlassCard>
                  </FadeIn>
                </Grid>
              ))}
            </Grid>
        </Container>
      </Box>

      {/* 5. Featured Procedures */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
            <Box sx={{ mb: 6 }}>
              <Typography variant="h2" color="primary.main" gutterBottom>Procedures we frequently support</Typography>
              <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800 }}>
                From lifestyle to medically necessary care, we focus on high-impact procedures where cross-border care delivers both quality and value.
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {[
                { title: "Orthopedic Surgery", tags: ["Knee replacement", "Hip replacement", "Spine"], body: "For patients seeking to restore movement without 6–12 month waits or unaffordable U.S. bills.", meta: "Typical savings: 40–60% vs. U.S. list prices.", href: "/procedures/orthopedic" },
                { title: "Bariatric & Metabolic", tags: ["Gastric sleeve", "Gastric bypass"], body: "Accredited centers with structured pre-op evaluation and monitored recovery plans.", meta: "Includes guidance on lifestyle.", href: "/procedures/bariatric" },
                { title: "Dental & Full-Mouth", tags: ["Implants", "All-on-4", "Reconstruction"], body: "From complex reconstructions to cosmetic work, coordinated in modern clinics with digital imaging.", meta: "Popular for short recovery trips.", href: "/procedures/dental" },
                { title: "Cosmetic & Reconstructive", tags: ["Body contouring", "Facial procedures"], body: "Board-certified surgeons in accredited facilities with realistic expectations and staged planning.", href: "/procedures/cosmetic" },
                { title: "Fertility & Women’s Health", tags: ["IVF", "Gynecologic surgery"], body: "Centres combining evidence-based protocols with personalized emotional support.", href: "/procedures/fertility" },
                { title: "Other Medical Necessities", tags: ["General surgery", "Urology"], body: "For patients seeking equivalent clinical outcomes at a more sustainable cost.", href: "/procedures" }
              ].map((card, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <FadeIn delay={index * 50}>
                    <GlassCard 
                      noShadow
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">{card.title}</Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                          {card.tags.map(tag => <Chip key={tag} label={tag} size="small" sx={{ mb: 1 }} />)}
                        </Stack>
                        <Typography variant="body2" paragraph>{card.body}</Typography>
                        {card.meta && <Typography variant="caption" color="primary.main" fontWeight="bold">{card.meta}</Typography>}
                      </CardContent>
                      <Box sx={{ p: 2, pt: 0 }}>
                        <Button component={Link} to={card.href} size="small">Learn more</Button>
                      </Box>
                    </GlassCard>
                  </FadeIn>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <FadeIn delay={300}>
                <Button component={Link} to="/procedures" variant="outlined" size="large">Browse all procedures</Button>
              </FadeIn>
            </Box>
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
            backgroundAttachment: 'fixed',
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
                <Typography variant="h2" sx={{ color: 'white', mb: 2 }}>Why Mexico for care?</Typography>
                <Typography variant="h5" sx={{ color: 'grey.300', mb: 3 }}>Where top-tier medicine meets world-class hospitality.</Typography>
                <Typography paragraph sx={{ color: 'grey.300' }}>
                  Mexico’s leading hospitals offer modern facilities, highly trained specialists, and outcomes that are comparable to U.S. centers—often at a fraction of the list price.
                </Typography>
                <Typography paragraph sx={{ color: 'grey.300' }}>
                  We focus on regions and institutions where healthcare and hospitality infrastructure are well developed, with reliable air connections and recovery-friendly environments.
                </Typography>
                <Stack spacing={1} sx={{ mt: 3 }}>
                  {["Access to experienced surgeons and multidisciplinary teams.", "Shorter wait times for needed operations.", "Modern hotels and recovery accommodations."].map((item, i) => (
                    <FadeIn key={i} delay={i * 100}>
                      <Typography variant="body2" fontWeight={500} sx={{ color: 'white' }}>• {item}</Typography>
                    </FadeIn>
                  ))}
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={3}>
                  {[
                    { label: "Cost efficiency", value: "30–70%", desc: "Typical range of savings vs. U.S. list pricing." },
                    { label: "Language access", value: "Bilingual", desc: "Health Navigators™ and on-site staff." },
                    { label: "Support cities", value: "Cancún +", desc: "Major medical and tourism hubs." }
                  ].map((stat, i) => (
                    <Grid size={{ xs: 12 }} key={i}>
                      <FadeIn delay={i * 150}>
                        <GlassCard sx={{ 
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
                     <Button component={Link} to="/medical-travel" variant="contained" color="secondary">Learn about Medical Travel &rarr;</Button>
                   </FadeIn>
                </Box>
              </Grid>
            </Grid>
        </Container>
      </Box>

      {/* 7. Navigators Preview */}
      <Box ref={navigatorsRef} sx={{ position: 'relative', py: { xs: 8, md: 12 }, bgcolor: 'transparent', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          {!isMobile && <Threads color={[0.556, 0.141, 0.666]} amplitude={1} distance={0} enableMouseInteraction={true} />}
        </Box>
        <Container maxWidth={false} sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 6, lg: 10 } }}>

            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" color="primary.main" gutterBottom>Meet your Health Navigators™</Typography>
              <Typography variant="h5" color="text.secondary">Real people with clinical and healthcare backgrounds, guiding you through every step.</Typography>
            </Box>
            <Grid container spacing={4} justifyContent="center">
              {[
                { name: "Health Navigator 1", title: "Senior Health Navigator™", creds: "Certified Medical Professional", blurb: "Helps patients understand their options and prepare safely for surgery abroad.", img: "/healthnav1.png" },
                { name: "Health Navigator 2", title: "Medical Travel Strategist", creds: "Healthcare Specialist", blurb: "Focuses on aligning U.S. quality expectations with Mexican clinical partners.", img: "/healthnav2.png" }
              ].map((profile, index) => (
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
                <Button component={Link} to="/navigators" variant="outlined">See how our Navigators work</Button>
              </FadeIn>
            </Box>
        </Container>
      </Box>

      {/* 8. Testimonials */}
      <Box ref={testimonialsRef} sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
            <Typography variant="h2" color="primary.main" align="center" gutterBottom>Health restored. Confidence renewed.</Typography>
            <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 8 }}>Stories from patients who chose guided cross-border care.</Typography>
            <Grid container spacing={4}>
              {[
                { quote: "MyHealth Haven took something overwhelming and made it structured and safe. I always knew who to call and what came next.", name: "L., 54", meta: "Knee replacement traveler" },
                { quote: "The cost was transparent from the start and my Navigator made sure my U.S. doctor was in the loop.", name: "R., 47", meta: "Bariatric surgery traveler" }
              ].map((testi, i) => (
                <Grid size={{ xs: 12, md: 6 }} key={i} sx={{ display: 'flex' }}>
                  <FadeIn delay={i * 200} style={{ width: '100%' }}>
                    <GlassCard sx={{ 
                      p: 4, 
                      height: '100%', 
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
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
        </Container>
      </Box>

      {/* 9. FAQs */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
            <Typography variant="h2" color="primary.main" align="center" gutterBottom>Frequently asked questions</Typography>
            <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6 }}>If you are considering care in Mexico, you should have clear, honest answers.</Typography>
            {[
              { q: "Is medical care in Mexico safe?", a: "Safety is our first filter. We partner only with hospitals and clinicians that meet defined standards for credentialing, infection control, and transparency." },
              { q: "How do I know what my procedure will really cost?", a: "Before you travel, you receive an all-inclusive estimate that covers hospital, surgeon, anesthesia, standard imaging, and typical hospital stay." },
              { q: "Can I talk to my U.S. doctor about this?", a: "Yes, and we encourage it. With your permission, we can share relevant information with your U.S. clinician." },
              { q: "What if complications occur?", a: "Your Navigator will explain how the hospital handles complications, how additional costs are managed, and how follow-up care works if you need it." },
              { q: "Do I have to decide right away?", a: "No. Many patients start with an informational call to understand options. There is no obligation." }
            ].map((faq, i) => (
              <FadeIn key={i} delay={i * 100}>
                <Accordion sx={{ 
                  mb: 1, 
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
          </Box>
        </Container>
      </Box>

      {/* 10. Final CTA */}
      <Box ref={ctaRef} sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent', textAlign: 'center' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
            <FadeIn>
              <Typography variant="overline" color="primary.main" fontWeight="bold">The end of guesswork in global care.</Typography>
              <Typography variant="h2" gutterBottom sx={{ mt: 2 }}>Talk to a Health Navigator™ about your options.</Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                One confidential conversation can clarify whether cross-border care is right for you—and what it would actually look like.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                <Button variant="contained" size="large" component={Link} to="/contact">Schedule a free consultation</Button>
                <Button variant="outlined" size="large" component={Link} to="/estimate">Get a No-Signup Cost Estimate</Button>
              </Stack>
              <Typography variant="caption" display="block" sx={{ mt: 4, color: 'text.secondary', letterSpacing: 1 }}>
                Made In America, Made Better in Mexico
              </Typography>
            </FadeIn>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
