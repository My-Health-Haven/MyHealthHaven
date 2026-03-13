import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  CircularProgress,
  Alert,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { useLanguage } from '../context/LanguageContext';
import FadeIn from '../components/FadeIn';
import { useProcedures } from '../hooks/useProcedures';
import ProcedureCard from '../components/procedures/ProcedureCard';
import ProcedureFilters from '../components/procedures/ProcedureFilters';
import ProcedureSearch from '../components/procedures/ProcedureSearch';

const Procedures = () => {
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const {
    procedures,
    availableFilters,
    columnConfig,
    loading,
    error,
    searchQuery,
    selectedFilters,
    handleSearch,
    handleFilterChange,
    clearFilters,
    filteredCount
  } = useProcedures();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderFilterSidebar = () => (
    <Box sx={{ p: 2 }}>
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      <ProcedureFilters 
        availableFilters={availableFilters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        columnConfig={columnConfig}
      />
    </Box>
  );

  return (
    <>
      <Helmet>
        <title>Procedures and Care Pathways | MyHealth Haven</title>
        <meta
          name="description"
          content="Explore the types of procedures supported by MyHealth Haven. Search and filter by medical area, complexity, and more."
        />
      </Helmet>

      <Box
        sx={{
          position: 'relative',
          minHeight: '80vh',
          overflow: 'hidden',
          bgcolor: '#09161A',
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: { xs: 'absolute', md: 'fixed' },
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: { xs: '-4%', md: '-8%' },
              backgroundImage: 'url(/EstimateBackgroundIMG.png)',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              transform: { xs: 'scale(1.04)', md: 'scale(1.1)' },
              filter: 'blur(6px)',
              opacity: 0.4,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(5,17,22,0.78) 0%, rgba(8,27,34,0.64) 28%, rgba(244,250,255,0.92) 100%)',
            }}
          />
        </Box>

        <Box sx={{ py: { xs: 4, md: 8 }, position: 'relative', zIndex: 1 }}>
          <Container maxWidth="xl" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            
            {/* Header */}
            <Box
              sx={{
                mb: 6,
                textAlign: 'center',
                maxWidth: 'lg',
                mx: 'auto',
                px: { xs: 3, md: 5 },
                py: { xs: 4, md: 5 },
                borderRadius: 5,
                color: 'common.white',
                border: '1px solid rgba(255,255,255,0.28)',
                background:
                  'linear-gradient(180deg, rgba(7,21,28,0.56) 0%, rgba(7,21,28,0.32) 100%)',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 24px 60px rgba(3,10,15,0.18)',
              }}
            >
              <FadeIn>
                <Typography variant="h2" gutterBottom sx={{ color: 'common.white' }}>
                  {t('proceduresPage.title')}
                </Typography>
                <Typography
                  variant="h5"
                  paragraph
                  sx={{ color: 'rgba(255,255,255,0.86)', maxWidth: 860, mx: 'auto' }}
                >
                   {t('proceduresPage.subtitle')}
                </Typography>
              </FadeIn>
            </Box>

            {/* Search and Filter Toggle (Mobile) */}
            <Box
              sx={{
                mb: 4,
                px: { xs: 2, md: 3 },
                py: 2.5,
                borderRadius: 4,
                bgcolor: 'rgba(255,255,255,0.68)',
                border: '1px solid rgba(255,255,255,0.74)',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 18px 40px rgba(15,23,42,0.12)',
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, md: isMobile ? 12 : 9 }} sx={{ ml: 'auto' }}>
                   <Box sx={{ display: 'flex', gap: 2 }}>
                     {isMobile && (
                       <Button 
                         variant="outlined" 
                         startIcon={<FilterListIcon />} 
                         onClick={handleDrawerToggle}
                         sx={{ minWidth: '120px' }}
                       >
                         Filters
                       </Button>
                     )}
                     <Box sx={{ flexGrow: 1 }}>
                       <ProcedureSearch onSearch={handleSearch} initialValue={searchQuery} />
                     </Box>
                   </Box>
                </Grid>
              </Grid>
            </Box>

            <Grid container spacing={4}>
              {/* Desktop Filters Sidebar */}
              {!isMobile && (
                <Grid size={{ md: 3 }}>
                  <Box
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.66)',
                      border: '1px solid rgba(255,255,255,0.74)',
                      backdropFilter: 'blur(16px)',
                      borderRadius: 3,
                      p: 0,
                      position: 'sticky',
                      top: 100,
                      maxHeight: 'calc(100vh - 120px)',
                      overflowY: 'auto',
                      overflowX: 'hidden',
                    }}
                  >
                    {renderFilterSidebar()}
                  </Box>
                </Grid>
              )}

              {/* Mobile Filters Drawer */}
              <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }} 
                PaperProps={{
                  sx: {
                    width: 300,
                    bgcolor: 'rgba(248,250,252,0.94)',
                    backdropFilter: 'blur(16px)',
                  },
                }}
              >
                {renderFilterSidebar()}
              </Drawer>

              {/* Procedures Grid */}
              <Grid size={{ xs: 12, md: 9 }}>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                    <CircularProgress />
                  </Box>
                ) : error ? (
                  <Alert severity="error" sx={{ mb: 4 }}>
                    {error}
                  </Alert>
                ) : (
                  <>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Showing {filteredCount} results
                      </Typography>
                    </Box>
                    
                    {procedures.length === 0 ? (
                      <Box
                        sx={{
                          textAlign: 'center',
                          py: 8,
                          borderRadius: 3,
                          bgcolor: 'rgba(255,255,255,0.68)',
                          border: '1px solid rgba(255,255,255,0.74)',
                          backdropFilter: 'blur(16px)',
                        }}
                      >
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                          No procedures found matching your criteria.
                        </Typography>
                        <Button variant="text" onClick={clearFilters}>
                          Clear all filters
                        </Button>
                      </Box>
                    ) : (
                      <Grid container spacing={3}>
                        {procedures.map((procedure, index) => (
                          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={procedure.procedure_id || index}>
                            <ProcedureCard procedure={procedure} index={index} columnConfig={columnConfig} />
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
            </Grid>

            {/* CTA Buttons */}
            <Box sx={{ mt: 8, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
               <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={Link}
                  to="/estimate"
                  sx={{ px: 4, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
                >
                  {t('navbar.freeEstimate')}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  component={Link}
                  to="/schedule"
                   sx={{ px: 4, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold', bgcolor: 'rgba(255,255,255,0.72)' }}
                >
                  {t('navbar.schedule')}
                </Button>
            </Box>

          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Procedures;
