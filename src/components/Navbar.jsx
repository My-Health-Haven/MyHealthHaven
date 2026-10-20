import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Container,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
  Menu,
  MenuItem,
  Snackbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const HEALTH_NAVIGATOR_EMAIL = 'healthnavigator@myhealthhaven.org';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [useInverseNav, setUseInverseNav] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const { language, selectLanguage, t } = useLanguage();

  const handleEmailClick = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(HEALTH_NAVIGATOR_EMAIL).catch(() => {});
    }
    setEmailCopied(true);
  };

  // State for Home Dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { label: t('navbar.navigators'), href: '/navigators' },
    { label: t('navbar.medicalTravel'), href: '/medical-travel' },
    { label: t('navbar.procedures'), href: '/procedures' },
    { label: t('navbar.library'), href: '/library' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleLanguage = () => {
    selectLanguage(language === 'en' ? 'es' : 'en');
  };

  /* The header switches to its light-on-dark look while a dark surface is behind
     it: the navy paper sheets (.hp-navy) of the redesigned pages and the footer. (The old
     per-route dark heroes of /medical-travel, /estimate and /navigators are gone;
     those pages now open on cream paper.) Read from what sits under the header's
     bottom edge on each scroll frame, so it follows any page without a list. */
  useEffect(() => {
    let frame = 0;
    const updateNavContrast = () => {
      frame = 0;
      const header = document.querySelector('header');
      if (!header) return;
      /* sample the header's middle at three points and follow the majority, so it
         flips when a navy sheet covers most of it, not at one pixel's edge */
      const box = header.getBoundingClientRect();
      const y = Math.max(0, box.top + box.height / 2);
      const navy = [0.15, 0.5, 0.85].filter((fx) => {
        const under = document.elementsFromPoint(window.innerWidth * fx, y).find((el) => !header.contains(el));
        return Boolean(under && under.closest('.hp-navy, .hf-footer'));
      }).length;
      setUseInverseNav(navy >= 2);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateNavContrast);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const navTextColor = useInverseNav ? 'rgba(255,255,255,0.88)' : 'text.primary';
  const navMutedTextColor = useInverseNav ? 'rgba(255,255,255,0.78)' : 'text.primary';
  const navHoverColor = useInverseNav ? 'rgba(255,255,255,0.98)' : 'primary.main';
  const navActiveColor = useInverseNav ? 'rgba(255,255,255,0.98)' : 'primary.main';
  const navSurfaceStyles = useInverseNav
    ? {
        /* near-opaque navy over the navy paper sheets, so cream content showing
           through the glass can never wash out the light labels */
        bgcolor: 'rgba(27, 69, 96, 0.94)',
        backdropFilter: 'blur(25px) saturate(180%)',
        WebkitBackdropFilter: 'blur(25px) saturate(180%)',
        borderBottom: 'none',
        boxShadow: 'none',
      }
    : {
        bgcolor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(25px) saturate(200%)',
        WebkitBackdropFilter: 'blur(25px) saturate(200%)',
        borderBottom: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
      };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', pt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Image src='/logo.png' width={50} height={50} alt='MyHealth Haven Logo' priority />
      </Box>
      <Typography variant='h6' sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
        MyHealth Haven
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        <ListItem disablePadding sx={{ justifyContent: 'center', mb: 2 }}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              toggleLanguage();
            }}
            variant='text'
            color='primary'
          >
            {language === 'en' ? 'Spanish' : 'English'}
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} href='/' sx={{ textAlign: 'center' }}>
            <ListItemText primary={t('navbar.home')} />
          </ListItemButton>
        </ListItem>
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton component={Link} href={item.href} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton component={Link} href='/#faq' sx={{ textAlign: 'center' }}>
            <ListItemText primary='FAQ' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} href='/schedule' sx={{ textAlign: 'center' }}>
            <ListItemText primary={t('navbar.schedule')} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ px: 2, mt: 2 }}>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            component={Link}
            href='/estimate'
            sx={{ bgcolor: '#00796b', boxShadow: 'none', '&:hover': { bgcolor: '#00695c', boxShadow: 'none' }, color: 'white' }}
          >
            {t('navbar.freeEstimate')}
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 0.5 }}>
        <Container maxWidth='xl'>
          <Stack direction='row' spacing={3} justifyContent='flex-start' alignItems='center'>
            <Stack direction='row' spacing={1} alignItems='center'>
              <PhoneIcon
                fontSize='small'
                sx={{ fontSize: 16, display: { xs: 'none', sm: 'inline-flex' } }}
              />
              <Typography
                variant='caption'
                component='a'
                href='tel:+12142763928'
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: { xs: '0.68rem', sm: '0.75rem' },
                }}
              >
                +1 (214) 276 3928
              </Typography>
            </Stack>
            <Stack direction='row' spacing={1} alignItems='center'>
              <EmailIcon
                fontSize='small'
                sx={{ fontSize: 16, display: { xs: 'none', sm: 'inline-flex' } }}
              />
              <Typography
                variant='caption'
                component='a'
                href={`mailto:${HEALTH_NAVIGATOR_EMAIL}`}
                onClick={handleEmailClick}
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: { xs: '0.68rem', sm: '0.75rem' },
                }}
              >
                {HEALTH_NAVIGATOR_EMAIL}
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <AppBar position='sticky' color='transparent' elevation={0} sx={navSurfaceStyles}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Typography
              variant='h6'
              component={Link}
              href='/'
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: useInverseNav ? 'common.white' : 'primary.main',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                transition: 'color 0.2s ease',
              }}
            >
              <Box sx={{ mr: 1.5, display: 'flex', flexShrink: 0 }}>
                <Image src='/logo.png' width={40} height={40} alt='MyHealth Haven Logo' priority />
              </Box>
              MyHealth Haven
            </Typography>

            {isMobile ? (
              <IconButton
                color='inherit'
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
                sx={{ color: useInverseNav ? 'common.white' : 'text.primary' }}
              >
                <MenuIcon sx={{ fontSize: '1.25rem' }} />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {/* Home Dropdown - Split Button */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    component={Link}
                    href='/'
                    sx={{
                      color: pathname === '/' ? navActiveColor : navTextColor,
                      fontWeight: pathname === '/' ? 700 : 500,
                      '&:hover': { color: navHoverColor, bgcolor: 'transparent' },
                      minWidth: 'auto',
                      mr: 0.5,
                    }}
                  >
                    {t('navbar.home')}
                  </Button>
                  <IconButton
                    id='home-menu-button'
                    aria-controls={open ? 'home-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleMenuClick}
                    size='small'
                    sx={{
                      color: open ? navActiveColor : navMutedTextColor,
                      '&:hover': { color: navHoverColor },
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>

                  <Menu
                    id='home-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    MenuListProps={{
                      'aria-labelledby': 'home-menu-button',
                    }}
                  >
                    <MenuItem onClick={handleMenuClose} component={Link} href='/#faq'>
                      FAQ
                    </MenuItem>
                  </Menu>
                </Box>

                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    sx={{
                      color: pathname === item.href ? navActiveColor : navTextColor,
                      fontWeight: pathname === item.href ? 700 : 500,
                      '&:hover': { color: navHoverColor, bgcolor: 'transparent' },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

                <Button
                  component={Link}
                  href='/schedule'
                  sx={{
                    color: pathname === '/schedule' ? navActiveColor : navTextColor,
                    fontWeight: pathname === '/schedule' ? 700 : 500,
                    '&:hover': { color: navHoverColor, bgcolor: 'transparent' },
                  }}
                >
                  {t('navbar.schedule')}
                </Button>

                <Button
                  onClick={toggleLanguage}
                  sx={{
                    color: navTextColor,
                    fontWeight: 500,
                    '&:hover': { color: navHoverColor, bgcolor: 'transparent' },
                  }}
                >
                  {language === 'en' ? 'Spanish' : 'English'}
                </Button>

                <Button
                  variant='contained'
                  color='primary'
                  component={Link}
                  href='/estimate'
                  sx={{
                    ml: 2,
                    /* the brand teal one step deeper: white text at 5.3:1 (theme #00897b is 4.3:1) */
                    bgcolor: '#00796b',
                    boxShadow: 'none',
                    '&:hover': { bgcolor: '#00695c', boxShadow: 'none' },
                    color: 'white',
                  }}
                >
                  {t('navbar.freeEstimate')}
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          anchor='right'
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(12px)',
            },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>
      <Snackbar
        open={emailCopied}
        autoHideDuration={2500}
        onClose={() => setEmailCopied(false)}
        message={language === 'es' ? 'Correo copiado al portapapeles' : 'Email copied to clipboard'}
      />
    </>
  );
};

export default Navbar;
