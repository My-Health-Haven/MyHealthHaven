import { Box, Container, Grid, Typography, Link as MuiLink, Stack, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useLanguage } from '../context/LanguageContext';

const HEALTH_NAVIGATOR_EMAIL = 'healthnavigator@andersonlg.com';
const TIKTOK_URL = 'https://www.tiktok.com/@my.health.haven1';

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const copyrightText =
    language === 'es'
      ? `\u00A9 ${currentYear} My Health Haven Management, LLC - Todos los derechos reservados.`
      : `\u00A9 ${currentYear} My Health Haven Management, LLC - All Rights Reserved.`;

  return (
    <Box component="footer" sx={{ bgcolor: 'white', py: 6, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box component="img" src="/logo.png" alt="MyHealth Haven Logo" sx={{ height: 32, mr: 1 }} />
              <Typography variant="h6" color="primary.main" fontWeight="bold">
                MyHealth Haven
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              {t('footer.slogan')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('footer.subSlogan')}
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle2" color="text.primary" gutterBottom fontWeight="bold">
              {t('footer.patients')}
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} to="/#how-it-works" color="text.secondary" variant="body2" underline="hover">{t('footer.howItWorks')}</MuiLink>
              <MuiLink component={Link} to="/procedures" color="text.secondary" variant="body2" underline="hover">{t('footer.procedures')}</MuiLink>
              <MuiLink component={Link} to="/medical-travel" color="text.secondary" variant="body2" underline="hover">{t('footer.medicalTravel')}</MuiLink>
              <MuiLink component={Link} to="/#faq" color="text.secondary" variant="body2" underline="hover">{t('footer.faqs')}</MuiLink>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle2" color="text.primary" gutterBottom fontWeight="bold">
              {t('footer.company')}
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} to="/about" color="text.secondary" variant="body2" underline="hover">{t('footer.aboutUs')}</MuiLink>
              <MuiLink component={Link} to="/employers" color="text.secondary" variant="body2" underline="hover">{t('footer.forEmployers')}</MuiLink>
              <MuiLink component={Link} to="/providers" color="text.secondary" variant="body2" underline="hover">{t('footer.forProviders')}</MuiLink>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="text.primary" gutterBottom fontWeight="bold">
              {t('footer.contact')}
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} to="/contact" color="text.secondary" variant="body2" underline="hover">{t('footer.speakWithNavigator')}</MuiLink>
              <MuiLink href="https://wa.me/12142763928" color="text.secondary" variant="body2" underline="hover" target="_blank" rel="noopener noreferrer">{t('footer.whatsapp')}</MuiLink>
              <MuiLink href={TIKTOK_URL} color="text.secondary" variant="body2" underline="hover" target="_blank" rel="noopener noreferrer">
                TikTok
              </MuiLink>
              <MuiLink href={`mailto:${HEALTH_NAVIGATOR_EMAIL}`} color="text.secondary" variant="body2" underline="hover">
                {HEALTH_NAVIGATOR_EMAIL}
              </MuiLink>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
               <IconButton href="https://www.instagram.com/my.healthhaven?igsh=MTBnZzhlM3ozbWtxeg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" color="inherit">
                  <InstagramIcon />
               </IconButton>
               <IconButton href="https://x.com/myhealthhaven1?s=21" target="_blank" rel="noopener noreferrer" color="inherit">
                  <TwitterIcon />
               </IconButton>
               <IconButton href="https://www.facebook.com/profile.php?id=61586308873245&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" color="inherit">
                  <FacebookIcon />
               </IconButton>
               <IconButton href="https://youtube.com/@my.health.haven1?si=-SiWbDZCe2FhLvl5" target="_blank" rel="noopener noreferrer" color="inherit">
                  <YouTubeIcon />
               </IconButton>
               <IconButton href="https://www.linkedin.com/company/my-health-haven/?viewAsMember=true" target="_blank" rel="noopener noreferrer" color="inherit">
                   <LinkedInIcon />
               </IconButton>
               <IconButton
                 href={TIKTOK_URL}
                 target="_blank"
                 rel="noopener noreferrer"
                 color="inherit"
                 aria-label="TikTok"
                 title="TikTok"
               >
                 <Typography component="span" variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 700, lineHeight: 1 }}>
                   TT
                 </Typography>
               </IconButton>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
           <Typography variant="caption" color="text.secondary" paragraph align="center">
              Information on this site is provided for general informational purposes only and is not medical advice or a binding offer. All services require consultation with qualified healthcare professionals. Use of this site does not establish a physician-patient relationship.
           </Typography>
           <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            {copyrightText}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <MuiLink component={Link} to="/privacy" color="text.secondary" variant="body2" underline="hover">{t('footer.privacyPolicy')}</MuiLink>
            <MuiLink component={Link} to="/terms" color="text.secondary" variant="body2" underline="hover">{t('footer.termsOfUse')}</MuiLink>

          </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
