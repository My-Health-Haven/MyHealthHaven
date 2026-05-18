import { useState } from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, Stack, IconButton, Snackbar, SvgIcon } from '@mui/material';
import Link from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useLanguage } from '../context/LanguageContext';

const HEALTH_NAVIGATOR_EMAIL = 'healthnavigator@andersonlg.com';
const TIKTOK_URL = 'https://www.tiktok.com/@my.health.haven';

const XIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </SvgIcon>
);

const Footer = () => {
  const { language } = useLanguage();
  const [emailCopied, setEmailCopied] = useState(false);
  const handleEmailClick = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(HEALTH_NAVIGATOR_EMAIL).catch(() => {});
    }
    setEmailCopied(true);
  };
  const currentYear = new Date().getFullYear();
  const footerCopy =
    language === 'es'
      ? {
          slogan:
            'Atencion medica transfronteriza guiada con apoyo bilingue, coordinacion clara y enfoque en el paciente.',
          subSlogan: 'Ayudamos a pacientes de Estados Unidos a navegar opciones medicas confiables en Mexico.',
          patients: 'Pacientes',
          howItWorks: 'Como funciona',
          procedures: 'Procedimientos',
          medicalTravel: 'Viaje medico',
          faqs: 'Preguntas frecuentes',
          company: 'Empresa',
          aboutUs: 'Nosotros',
          forEmployers: 'Para empleadores',
          forProviders: 'Para proveedores',
          contact: 'Contacto',
          speakWithNavigator: 'Hablar con un navigator',
          whatsapp: 'WhatsApp',
          privacyPolicy: 'Politica de privacidad',
          termsOfUse: 'Terminos de uso',
          legalDisclaimer:
            'La informacion de este sitio es solo para fines informativos generales y no constituye consejo medico ni una oferta vinculante. Todos los servicios requieren consulta con profesionales de la salud calificados. El uso de este sitio no establece una relacion medico-paciente.',
        }
      : {
          slogan:
            'Guided cross-border care with bilingual support, clear coordination, and patient-first advocacy.',
          subSlogan: 'We help U.S. patients navigate trusted medical options in Mexico with confidence.',
          patients: 'Patients',
          howItWorks: 'How It Works',
          procedures: 'Procedures',
          medicalTravel: 'Medical Travel',
          faqs: 'FAQs',
          company: 'Company',
          aboutUs: 'About Us',
          forEmployers: 'For Employers',
          forProviders: 'For Providers',
          contact: 'Contact',
          speakWithNavigator: 'Speak With a Navigator',
          whatsapp: 'WhatsApp',
          privacyPolicy: 'Privacy Policy',
          termsOfUse: 'Terms of Use',
          legalDisclaimer:
            'Information on this site is provided for general informational purposes only and is not medical advice or a binding offer. All services require consultation with qualified healthcare professionals. Use of this site does not establish a physician-patient relationship.',
        };
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
              {footerCopy.slogan}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {footerCopy.subSlogan}
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle2" color="text.primary" gutterBottom fontWeight="bold">
              {footerCopy.patients}
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} href="/#how-it-works" color="text.secondary" variant="body2" underline="hover">{footerCopy.howItWorks}</MuiLink>
              <MuiLink component={Link} href="/procedures" color="text.secondary" variant="body2" underline="hover">{footerCopy.procedures}</MuiLink>
              <MuiLink component={Link} href="/medical-travel" color="text.secondary" variant="body2" underline="hover">{footerCopy.medicalTravel}</MuiLink>
              <MuiLink component={Link} href="/#faq" color="text.secondary" variant="body2" underline="hover">{footerCopy.faqs}</MuiLink>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle2" color="text.primary" gutterBottom fontWeight="bold">
              {footerCopy.company}
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} href="/about" color="text.secondary" variant="body2" underline="hover">{footerCopy.aboutUs}</MuiLink>
              <MuiLink component={Link} href="/employers" color="text.secondary" variant="body2" underline="hover">{footerCopy.forEmployers}</MuiLink>
              <MuiLink component={Link} href="/providers" color="text.secondary" variant="body2" underline="hover">{footerCopy.forProviders}</MuiLink>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="text.primary" gutterBottom fontWeight="bold">
              {footerCopy.contact}
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} href="/schedule" color="text.secondary" variant="body2" underline="hover">{footerCopy.speakWithNavigator}</MuiLink>
              <MuiLink href="https://wa.me/12142763928" color="text.secondary" variant="body2" underline="hover" target="_blank" rel="noopener noreferrer">{footerCopy.whatsapp}</MuiLink>
              <MuiLink href={TIKTOK_URL} color="text.secondary" variant="body2" underline="hover" target="_blank" rel="noopener noreferrer">
                TikTok
              </MuiLink>
              <MuiLink
                href={`mailto:${HEALTH_NAVIGATOR_EMAIL}`}
                onClick={handleEmailClick}
                color="text.secondary"
                variant="body2"
                underline="hover"
              >
                {HEALTH_NAVIGATOR_EMAIL}
              </MuiLink>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
               <IconButton href="https://www.instagram.com/my.healthhaven?igsh=MTBnZzhlM3ozbWtxeg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" color="inherit">
                  <InstagramIcon />
               </IconButton>
               <IconButton href="https://x.com/myhealthhaven1?s=21" target="_blank" rel="noopener noreferrer" color="inherit" aria-label="X" title="X">
                  <XIcon />
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
              {footerCopy.legalDisclaimer}
           </Typography>
           <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            {copyrightText}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <MuiLink component={Link} href="/privacy" color="text.secondary" variant="body2" underline="hover">{footerCopy.privacyPolicy}</MuiLink>
            <MuiLink component={Link} href="/terms" color="text.secondary" variant="body2" underline="hover">{footerCopy.termsOfUse}</MuiLink>

          </Box>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={emailCopied}
        autoHideDuration={2500}
        onClose={() => setEmailCopied(false)}
        message={language === 'es' ? 'Correo copiado al portapapeles' : 'Email copied to clipboard'}
      />
    </Box>
  );
};

export default Footer;
