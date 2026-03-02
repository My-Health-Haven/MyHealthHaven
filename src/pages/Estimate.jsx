import React, { useMemo, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Stack,
  Alert,
  CircularProgress,
  Autocomplete,
} from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import GlassCard from '../components/GlassCard';
import { CITIES_BY_STATE, US_STATES } from '../data/usLocations';
import { useProcedures } from '../hooks/useProcedures';

const OTHER_PROCEDURE_OPTION = '__other_procedure__';

const FormLabel = ({ children }) => (
  <Typography variant="h6" component="label" sx={{ display: 'block', mb: 1, fontWeight: 700, color: 'text.primary' }}>
    {children}
  </Typography>
);

const Estimate = () => {
  const { t, language } = useLanguage();
  const { procedures: allProcedures, loading: proceduresLoading } = useProcedures();
  const isSpanish = language === 'es';

  const procedureSearchPlaceholder = isSpanish
    ? 'Busque y seleccione un procedimiento'
    : 'Search and select a procedure';
  const procedureLoadingLabel = isSpanish ? 'Cargando procedimientos...' : 'Loading procedures...';
  const procedureNoOptionsLabel = isSpanish
    ? 'No hay procedimientos coincidentes'
    : 'No matching procedures';
  const procedureOtherLabel = isSpanish ? 'Otro (especifique)' : 'Other (please specify)';
  const procedureOtherPlaceholder = isSpanish
    ? 'Describa el procedimiento que le interesa...'
    : 'Please describe the procedure you are interested in...';
  const procedureRequiredError = isSpanish
    ? 'Seleccione un procedimiento o elija Otro y escriba los detalles.'
    : 'Please select a procedure or choose Other and provide details.';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    procedure: '',
    procedureOther: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');

  const availableCities = useMemo(() => {
    if (!formData.state) return [];
    return CITIES_BY_STATE[formData.state] || ['Other'];
  }, [formData.state]);

  const procedureOptions = useMemo(() => {
    const uniqueProcedureNames = new Set();

    for (const item of allProcedures) {
      const name = String(item?.procedure_name || '').trim();
      if (name) uniqueProcedureNames.add(name);
    }

    const sortedNames = Array.from(uniqueProcedureNames).sort((a, b) => a.localeCompare(b));
    return [...sortedNames, OTHER_PROCEDURE_OPTION];
  }, [allProcedures]);

  const isOtherProcedureSelected = formData.procedure === OTHER_PROCEDURE_OPTION;
  const procedureSubmissionValue = isOtherProcedureSelected
    ? formData.procedureOther.trim()
    : formData.procedure.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitError('');
    }

    setFormData((prev) => ({
      ...prev,
      ...(name === 'state' ? { city: '' } : {}),
      [name]: value,
    }));
  };

  const handleProcedureSelect = (_event, value) => {
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitError('');
    }

    setFormData((prev) => ({
      ...prev,
      procedure: value || '',
      ...(value === OTHER_PROCEDURE_OPTION ? {} : { procedureOther: '' }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!procedureSubmissionValue) {
      setSubmitStatus('error');
      setSubmitError(procedureRequiredError);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitError('');

    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          procedure: procedureSubmissionValue,
          language: language || 'en',
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(t('estimatePage.feedback.rateLimit'));
        }
        throw new Error(t('estimatePage.feedback.error'));
      }

      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        procedure: '',
        procedureOther: '',
        website: '',
      });
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
      setSubmitError(error.message || t('estimatePage.feedback.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent', minHeight: '80vh' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" gutterBottom color="primary.main" sx={{ fontWeight: 700 }}>
            {t('estimatePage.title')}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {t('estimatePage.subtitle')}
          </Typography>
        </Box>
        
        <GlassCard sx={{ p: { xs: 3, md: 6 } }}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-9999px',
                width: 0,
                height: 0,
                opacity: 0,
                pointerEvents: 'none',
              }}
            />
            <Stack spacing={4}>
              
              <Box>
                <FormLabel>{t('estimatePage.form.name')}</FormLabel>
                <TextField
                  fullWidth
                  required
                  placeholder={t('estimatePage.form.name')}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  hiddenLabel
                />
              </Box>

              <Box>
                <FormLabel>{t('estimatePage.form.phone')}</FormLabel>
                 <TextField
                  fullWidth
                  required
                  placeholder={t('estimatePage.form.phone')}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                  hiddenLabel
                />
              </Box>

              <Box>
                 <FormLabel>{t('estimatePage.form.email')}</FormLabel>
                <TextField
                  fullWidth
                  required
                  email
                  placeholder={t('estimatePage.form.email')}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  hiddenLabel
                />
              </Box>
              
              <Box>
                <FormLabel>{t('estimatePage.form.state')}</FormLabel>
                <TextField
                  select
                  fullWidth
                  required
                  placeholder={t('estimatePage.form.state')}
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  variant="outlined"
                  hiddenLabel
                  SelectProps={{
                    MenuProps: { PaperProps: { style: { maxHeight: 300 } } }
                  }}
                >
                  {US_STATES.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box>
                <FormLabel>{t('estimatePage.form.city')}</FormLabel>
                <TextField
                  select
                  fullWidth
                  required
                  disabled={!formData.state}
                  placeholder={
                    !formData.state
                      ? t('estimatePage.form.selectStateFirst')
                      : t('estimatePage.form.city')
                  }
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  variant="outlined"
                  hiddenLabel
                >
                  {availableCities.map((city) => (
                      <MenuItem key={city} value={city}>
                          {city}
                      </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box>
                <FormLabel>{t('estimatePage.form.procedure')}</FormLabel>
                <Autocomplete
                  options={procedureOptions}
                  value={formData.procedure || null}
                  onChange={handleProcedureSelect}
                  loading={proceduresLoading}
                  loadingText={procedureLoadingLabel}
                  slotProps={{
                    popper: {
                      placement: 'bottom-start',
                      modifiers: [
                        { name: 'flip', enabled: false },
                        { name: 'offset', options: { offset: [0, 8] } },
                      ],
                      sx: {
                        zIndex: (theme) => theme.zIndex.modal + 1,
                      },
                    },
                    paper: {
                      elevation: 0,
                      sx: {
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: '0 16px 32px rgba(17, 24, 39, 0.14)',
                        bgcolor: 'background.paper',
                        overflow: 'hidden',
                      },
                    },
                    listbox: {
                      sx: {
                        py: 0.75,
                        px: 0.75,
                        maxHeight: 320,
                      },
                    },
                  }}
                  getOptionLabel={(option) =>
                    option === OTHER_PROCEDURE_OPTION ? procedureOtherLabel : String(option || '')
                  }
                  isOptionEqualToValue={(option, value) => option === value}
                  noOptionsText={
                    proceduresLoading ? procedureLoadingLabel : procedureNoOptionsLabel
                  }
                  renderOption={(props, option, { index }) => (
                    <Box
                      component="li"
                      {...props}
                      sx={{
                        borderRadius: 1.5,
                        mb: 0.5,
                        minHeight: 42,
                        px: 1.5,
                        py: 1,
                        opacity: 0,
                        transform: 'scale(0.94) translateY(4px)',
                        animation: 'listItemPopIn 0.22s ease forwards',
                        animationDelay: `${Math.min(index, 12) * 25}ms`,
                        transition: 'transform 0.2s ease, background-color 0.2s ease',
                        '&:hover': {
                          transform: 'scale(1.01)',
                          backgroundColor: 'rgba(0, 137, 123, 0.08)',
                        },
                        '&[aria-selected="true"]': {
                          backgroundColor: 'rgba(0, 137, 123, 0.14) !important',
                          fontWeight: 600,
                        },
                      }}>
                      {option === OTHER_PROCEDURE_OPTION ? procedureOtherLabel : String(option || '')}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      placeholder={procedureSearchPlaceholder}
                      variant="outlined"
                      hiddenLabel
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {proceduresLoading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
                {proceduresLoading && (
                  <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                    {procedureLoadingLabel}
                  </Typography>
                )}
              </Box>

              {isOtherProcedureSelected && (
                <Box>
                  <FormLabel>{procedureOtherLabel}</FormLabel>
                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={4}
                    placeholder={procedureOtherPlaceholder}
                    name="procedureOther"
                    value={formData.procedureOther}
                    onChange={handleChange}
                    variant="outlined"
                    hiddenLabel
                  />
                </Box>
              )}

              <Box sx={{ pt: 2 }}>
                <Button 
                  type="submit" 
                  fullWidth 
                  variant="contained" 
                  size="large"
                  color="primary"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : null}
                  sx={{ py: 2, fontSize: '1.2rem', fontWeight: 'bold', boxShadow: 'none' }} 
                >
                  {isSubmitting ? t('estimatePage.form.submitting') : t('estimatePage.form.submit')}
                </Button>
              </Box>

              {submitStatus === 'success' && (
                <Alert severity="success">{t('estimatePage.feedback.success')}</Alert>
              )}
              {submitStatus === 'error' && <Alert severity="error">{submitError}</Alert>}

            </Stack>
          </form>
           <Typography variant="caption" display="block" sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
             {t('estimatePage.disclaimer')}
           </Typography>
        </GlassCard>
      </Container>
    </Box>
  );
};

export default Estimate;
