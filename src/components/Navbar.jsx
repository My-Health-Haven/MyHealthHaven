import React, { useEffect, useMemo, useState } from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [useInverseNav, setUseInverseNav] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const { language, selectLanguage, t } = useLanguage();
  
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

  const darkHeroThreshold = useMemo(() => {
    if (pathname.startsWith('/medical-travel')) return 440;
    if (pathname.startsWith('/estimate')) return 360;
    if (pathname.startsWith('/navigators')) return 320;
    return 0;
  }, [pathname]);

  useEffect(() => {
    if (!darkHeroThreshold) {
      setUseInverseNav(false);
      return undefined;
    }

    const updateNavContrast = () => {
      setUseInverseNav(window.scrollY < darkHeroThreshold);
    };

    updateNavContrast();
    window.addEventListener('scroll', updateNavContrast, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateNavContrast);
    };
  }, [darkHeroThreshold]);

  const navTextColor = useInverseNav ? 'rgba(255,255,255,0.88)' : 'text.primary';
  const navMutedTextColor = useInverseNav ? 'rgba(255,255,255,0.78)' : 'text.primary';
  const navHoverColor = useInverseNav ? 'rgba(255,255,255,0.98)' : 'primary.main';
  const navActiveColor = useInverseNav ? 'rgba(255,255,255,0.98)' : 'primary.main';
  const navSurfaceStyles = useInverseNav
    ? {
        bgcolor: 'rgba(8, 20, 28, 0.28)',
        backdropFilter: 'blur(25px) saturate(180%)',
        WebkitBackdropFilter: 'blur(25px) saturate(180%)',
        borderBottom: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.14)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
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
        <Box component="img" src="/logo.png" alt="MyHealth Haven Logo" sx={{ height: 50 }} />
      </Box>
      <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
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
             variant="text" 
             color="primary"
           >
             {language === 'en' ? 'Spanish' : 'English'}
           </Button>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton component={Link} href="/" sx={{ textAlign: 'center' }}>
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
            <ListItemButton component={Link} href="/#faq" sx={{ textAlign: 'center' }}>
              <ListItemText primary="FAQ" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton component={Link} href="/schedule" sx={{ textAlign: 'center' }}>
              <ListItemText primary={t('navbar.schedule')} />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ px: 2, mt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            href="/estimate"
            sx={{ boxShadow: 'none', '&:hover': { boxShadow: 'none' }, color: 'white' }}
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
        <Container maxWidth="xl">
            <Stack direction="row" spacing={3} justifyContent="flex-start" alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                    <PhoneIcon fontSize="small" sx={{ fontSize: 16 }} />
                    <Typography variant="caption" component="a" href="tel:+12142763928" sx={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>
                        +1 (214) 276 3928
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <EmailIcon fontSize="small" sx={{ fontSize: 16 }} />
                    <Typography variant="caption" component="a" href="mailto:healthnavigator@andersonlg.com" sx={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>
                        healthnavigator@andersonlg.com
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    </Box>
    <AppBar position="sticky" color="transparent" elevation={0} sx={navSurfaceStyles}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            href="/"
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
            <Box component="img" src="/logo.png" alt="MyHealth Haven Logo" sx={{ height: 40, mr: 1.5 }} />
            MyHealth Haven
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
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
                  href="/"
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
                  id="home-menu-button"
                  aria-controls={open ? 'home-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleMenuClick}
                  size="small"
                  sx={{
                     color: open ? navActiveColor : navMutedTextColor,
                     '&:hover': { color: navHoverColor }
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>

                <Menu
                  id="home-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    'aria-labelledby': 'home-menu-button',
                  }}
                >
                   <MenuItem onClick={handleMenuClose} component={Link} href="/#faq">
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
                href="/schedule"
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
                variant="contained"
                color="primary"
                component={Link}
                href="/estimate"
                sx={{ ml: 2, boxShadow: 'none', '&:hover': { boxShadow: 'none' }, color: 'white' }}
              >
                {t('navbar.freeEstimate')}
              </Button>

            </Box>
          )}
        </Toolbar>
      </Container>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        anchor="right"
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
    </>
  );
};

export default Navbar;
