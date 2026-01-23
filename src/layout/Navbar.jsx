import React, { useState } from 'react';
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
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
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
        <ListItem disablePadding sx={{ flexDirection: 'column', px: 2 }}>
           <Button 
              fullWidth 
              variant="contained" 
              component={Link} 
              to="/schedule" 
              sx={{ mb: 2, py: 1.5 }}
           >
              {t('navbar.schedule')}
           </Button>

        </ListItem>
        <ListItem disablePadding sx={{ justifyContent: 'center', mb: 2 }}>
           <Button 
             onClick={(e) => {
               e.stopPropagation();
               toggleLanguage();
             }}
             variant="text" 
             color="primary"
           >
             {language === 'en' ? 'Español' : 'English'}
           </Button>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton component={Link} to="/" sx={{ textAlign: 'center' }}>
              <ListItemText primary={t('navbar.home')} />
            </ListItemButton>
        </ListItem>
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton component={Link} to={item.href} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
            <ListItemButton component={Link} to="/#faq" sx={{ textAlign: 'center' }}>
              <ListItemText primary="FAQ" />
            </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(25px) saturate(200%)', WebkitBackdropFilter: 'blur(25px) saturate(200%)', borderBottom: '1px solid', borderColor: 'rgba(255, 255, 255, 0.3)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'primary.main', fontWeight: 800, letterSpacing: '-0.02em' }}
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
            >
              <MenuIcon sx={{ fontSize: '1.25rem' }} />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              
              {/* Home Dropdown - Split Button */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  component={Link}
                  to="/"
                  sx={{
                    color: location.pathname === '/' ? 'primary.main' : 'text.primary',
                    fontWeight: location.pathname === '/' ? 700 : 500,
                    '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
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
                     color: open ? 'primary.main' : 'text.primary',
                     '&:hover': { color: 'primary.main' }
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
                   <MenuItem onClick={handleMenuClose} component={Link} to="/#faq">
                    FAQ
                  </MenuItem>
                </Menu>
              </Box>

              {navItems.map((item) => (
                <Button
                  key={item.href}
                  component={Link}
                  to={item.href}
                  sx={{
                    color: location.pathname === item.href ? 'primary.main' : 'text.primary',
                    fontWeight: location.pathname === item.href ? 700 : 500,
                    '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              <Button
                component={Link}
                to="/schedule"
                sx={{
                    color: location.pathname === '/schedule' ? 'primary.main' : 'text.primary',
                    fontWeight: location.pathname === '/schedule' ? 700 : 500,
                    '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                }}
              >
                {t('navbar.schedule')}
              </Button>
              
              <Button onClick={toggleLanguage} sx={{ minWidth: 'auto', fontWeight: 'bold' }}>
                {language === 'en' ? 'ES' : 'EN'}
              </Button>

              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/estimate"
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
  );
};

export default Navbar;
