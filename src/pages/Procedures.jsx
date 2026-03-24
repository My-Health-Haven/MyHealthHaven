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
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { useLanguage } from '../context/LanguageContext';
import FadeIn from '../components/FadeIn';
import { useProcedures } from '../hooks/useProcedures';
import ProcedureCard from '../components/procedures/ProcedureCard';
import ProcedureFilters from '../components/procedures/ProcedureFilters';
import ProcedureSearch from '../components/procedures/ProcedureSearch';
import Seo from '../seo/Seo';
import {
  createBreadcrumbSchema,
  createCollectionPageSchema,
} from '../seo/siteSeo';

const Procedures = () => {
  const { language, t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const isServerRender = typeof window === 'undefined';
  const seoTitle =
    language === 'es'
      ? 'Procedimientos y rutas de atencion | MyHealth Haven'
      : 'Procedures and Care Pathways | MyHealth Haven';
  const seoDescription =
    language === 'es'
      ? 'Explore los tipos de procedimientos respaldados por MyHealth Haven. Busque y filtre por area medica, complejidad y mas.'
      : 'Explore the types of procedures supported by MyHealth Haven. Search and filter by medical area, complexity, and more.';

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
      <Seo
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/procedures"
        image="/logo.jpg"
        schema={[
          createCollectionPageSchema({
            path: '/procedures',
            name: seoTitle,
            description: seoDescription,
            image: '/logo.jpg',
          }),
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: language === 'es' ? 'Procedimientos' : 'Procedures', path: '/procedures' },
          ]),
        ]}
      />

      <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: 'background.default', minHeight: '80vh' }}>
        <Container maxWidth="xl" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          
          {/* Header */}
          <Box sx={{ mb: 6, textAlign: 'center', maxWidth: 'md', mx: 'auto' }}>
            <FadeIn>
              <Typography variant="h2" gutterBottom>{t('proceduresPage.title')}</Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                 {t('proceduresPage.subtitle')}
              </Typography>
            </FadeIn>
          </Box>

          {/* Search and Filter Toggle (Mobile) */}
          <Box sx={{ mb: 4 }}>
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
                    bgcolor: 'background.paper',
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
              PaperProps={{ sx: { width: 300 } }}
            >
              {renderFilterSidebar()}
            </Drawer>

            {/* Procedures Grid */}
            <Grid size={{ xs: 12, md: 9 }}>
              {loading && isServerRender ? (
                <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    {language === 'es'
                      ? 'Directorio de procedimientos en preparacion'
                      : 'Procedure directory loading'}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {language === 'es'
                      ? 'El listado completo de procedimientos se carga de forma dinamica. Use esta pagina para explorar areas de atencion compatibles y solicitar una estimacion personalizada.'
                      : 'The full procedure list loads dynamically. Use this page to explore supported care categories and request a personalized estimate.'}
                  </Typography>
                </Box>
              ) : loading ? (
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
                    <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'background.paper', borderRadius: 3 }}>
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
                 sx={{ px: 4, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
              >
                {t('navbar.schedule')}
              </Button>
          </Box>

        </Container>
      </Box>
    </>
  );
};

export default Procedures;
