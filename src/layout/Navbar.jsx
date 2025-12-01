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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Navigators', href: '/navigators' },
  { label: 'Medical Travel', href: '/medical-travel' },
  { label: 'Procedures', href: '/procedures' },
  { label: 'Library', href: '/library' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Box component="img" src="/logo.jpg" alt="MyHealth Haven Logo" sx={{ height: 50 }} />
      </Box>
      <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
        MyHealth Haven
      </Typography>
      <List>
        <ListItem disablePadding>
           <ListItemButton component={Link} to="/contact" sx={{ justifyContent: 'center', bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' }, m: 2, borderRadius: 1 }}>
              <ListItemText primary="Speak with a Health Navigator™" />
           </ListItemButton>
        </ListItem>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} to={item.href} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'primary.main', fontWeight: 800, letterSpacing: '-0.02em' }}
          >
            <Box component="img" src="/logo.jpg" alt="MyHealth Haven Logo" sx={{ height: 40, mr: 1.5 }} />
            MyHealth Haven
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
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
                variant="contained"
                color="primary"
                component={Link}
                to="/contact"
                sx={{ ml: 2, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
              >
                Speak with a Health Navigator™
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
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
