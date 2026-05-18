'use client';
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
import { CITIES_BY_STATE, US_STATES } from '../data/usLocations';
import { useProcedures } from '../lib/useProcedures';

const OTHER_PROCEDURE_OPTION = '__other_procedure__';
const PHONE_MAX_DIGITS = 15;
const PHONE_MAX_LENGTH = PHONE_MAX_DIGITS + 1;
const PHONE_REGEX = /^\+?\d{7,15}$/;
const EMAIL_REGEX =
  /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9]))+$/;

const sanitizePhoneInput = (value = '') => {
  const hasLeadingPlus = value.trim().startsWith('+');
  const digitsOnly = value.replace(/\D/g, '').slice(0, PHONE_MAX_DIGITS);
  return `${hasLeadingPlus ? '+' : ''}${digitsOnly}`;
};

const isValidEmail = (value = '') => EMAIL_REGEX.test(value.trim());
const isValidPhone = (value = '') => PHONE_REGEX.test(value.trim());

const FormLabel = ({ children }) => (
  <Typography variant="h6" component="label" sx={{ display: 'block', mb: 1, fontWeight: 700, color: 'text.primary' }}>
    {children}
  </Typography>
);

const frostedFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2.5,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.46) 0%, rgba(255,255,255,0.22) 100%)',
    backdropFilter: 'blur(14px) saturate(165%)',
    WebkitBackdropFilter: 'blur(14px) saturate(165%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.62), 0 10px 24px rgba(15,23,42,0.05)',
    transition: 'background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
    '& fieldset': {
      borderColor: 'rgba(255,255,255,0.5)',
      borderWidth: 1.2,
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0,137,123,0.35)',
    },
    '&.Mui-focused': {
      background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.32) 100%)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.75), 0 0 0 4px rgba(0,137,123,0.08)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(0,137,123,0.5)',
    },
    '&.Mui-disabled': {
      background: 'linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.12) 100%)',
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(31,41,51,0.56)',
    opacity: 1,
  },
  '& .MuiSvgIcon-root': {
    color: 'text.secondary',
  },
};

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
  const phoneInvalidError = isSpanish
    ? 'Ingrese un numero de telefono valido (solo numeros y un "+" opcional al inicio).'
    : 'Please enter a valid phone number (numbers and an optional leading "+").';
  const emailInvalidError = isSpanish
    ? 'Ingrese un correo electronico valido (ejemplo: nombre@dominio.com).'
    : 'Please enter a valid email address (example: name@domain.com).';
  const emailUnverifiedError = isSpanish
    ? 'No pudimos verificar ese correo electronico. Intente con una direccion real y activa.'
    : 'We could not verify that email address. Please use a real, active inbox.';

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
    let nextValue = value;

    if (name === 'phone') {
      nextValue = sanitizePhoneInput(value);
    }

    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitError('');
    }

    setFormData((prev) => ({
      ...prev,
      ...(name === 'state' ? { city: '' } : {}),
      [name]: nextValue,
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

    if (!isValidPhone(formData.phone)) {
      setSubmitStatus('error');
      setSubmitError(phoneInvalidError);
      return;
    }

    if (!isValidEmail(formData.email)) {
      setSubmitStatus('error');
      setSubmitError(emailInvalidError);
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
      const responseBody = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(t('estimatePage.feedback.rateLimit'));
        }
        if (responseBody?.code === 'EMAIL_VERIFICATION_FAILED') {
          throw new Error(emailUnverifiedError);
        }
        if (Array.isArray(responseBody?.details) && responseBody.details.length > 0) {
          throw new Error(responseBody.details[0]);
        }
        if (typeof responseBody?.error === 'string' && responseBody.error.trim().length > 0) {
          throw new Error(responseBody.error);
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
    <>
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
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: { xs: '-5%', md: '-8%' },
              backgroundImage: 'url(/EstimateBackgroundIMG.png)',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              transform: { xs: 'scale(1.04)', md: 'scale(1.1)' },
              filter: 'blur(5px)',
              opacity: 0.5,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(5,16,21,0.78) 0%, rgba(7,24,31,0.58) 26%, rgba(244,249,255,0.88) 100%)',
            }}
          />
        </Box>

        <Box sx={{ py: { xs: 8, md: 12 }, position: 'relative', zIndex: 1 }}>
          <Container maxWidth="md">
            <Box
              sx={{
                textAlign: 'center',
                mb: 6,
                px: { xs: 3, md: 4 },
                py: { xs: 3.5, md: 4 },
                borderRadius: 5,
                color: 'common.white',
                border: '1px solid rgba(255,255,255,0.24)',
                background:
                  'linear-gradient(180deg, rgba(8,20,28,0.54) 0%, rgba(8,20,28,0.28) 100%)',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 24px 60px rgba(3,10,15,0.18)',
              }}
            >
              <Typography
                variant="overline"
                sx={{ letterSpacing: 2.4, fontWeight: 800, color: 'rgba(255,255,255,0.74)' }}
              >
                Email Estimate
              </Typography>
              <Typography variant="h2" gutterBottom sx={{ color: 'common.white', mt: 1 }}>
                {t('estimatePage.title')}
              </Typography>
              <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.84)' }}>
                {t('estimatePage.subtitle')}
              </Typography>
            </Box>

            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                isolation: 'isolate',
                p: { xs: 3, md: 6 },
                borderRadius: 5,
                background:
                  'linear-gradient(180deg, rgba(248,250,255,0.58) 0%, rgba(238,245,255,0.4) 100%)',
                border: '1px solid rgba(255,255,255,0.52)',
                backdropFilter: 'blur(28px) saturate(180%)',
                WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                boxShadow:
                  '0 32px 80px rgba(15,23,42,0.18), inset 0 1px 0 rgba(255,255,255,0.68)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'inherit',
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.06) 42%, rgba(255,255,255,0.18) 100%)',
                  pointerEvents: 'none',
                  zIndex: -1,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: -80,
                  left: -40,
                  width: { xs: 180, md: 280 },
                  height: { xs: 180, md: 280 },
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 74%)',
                  pointerEvents: 'none',
                  zIndex: -1,
                },
              }}
            >
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
                      sx={frostedFieldSx}
                    />
                  </Box>

                  <Box>
                    <FormLabel>{t('estimatePage.form.phone')}</FormLabel>
                    <TextField
                      fullWidth
                      required
                      placeholder={t('estimatePage.form.phone')}
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      variant="outlined"
                      hiddenLabel
                      autoComplete="tel"
                      sx={frostedFieldSx}
                      inputProps={{
                        inputMode: 'tel',
                        pattern: '^\\+?\\d{7,15}$',
                        maxLength: PHONE_MAX_LENGTH,
                      }}
                    />
                  </Box>

                  <Box>
                    <FormLabel>{t('estimatePage.form.email')}</FormLabel>
                    <TextField
                      fullWidth
                      required
                      placeholder={t('estimatePage.form.email')}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                      hiddenLabel
                      autoComplete="email"
                      sx={frostedFieldSx}
                      inputProps={{
                        autoCapitalize: 'none',
                      }}
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
                      sx={frostedFieldSx}
                      SelectProps={{
                        MenuProps: { PaperProps: { style: { maxHeight: 300 } } },
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
                        !formData.state ? t('estimatePage.form.selectStateFirst') : t('estimatePage.form.city')
                      }
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      variant="outlined"
                      hiddenLabel
                      sx={frostedFieldSx}
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
                      noOptionsText={proceduresLoading ? procedureLoadingLabel : procedureNoOptionsLabel}
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
                            '&:hover, &.Mui-focused, &[data-focus="true"]': {
                              transform: 'scale(1.01)',
                              backgroundColor: 'primary.main !important',
                              color: 'common.white !important',
                            },
                            '&[aria-selected="true"], &[aria-selected="true"]:hover, &[aria-selected="true"].Mui-focused':
                              {
                                backgroundColor: 'primary.dark !important',
                                color: 'common.white !important',
                                fontWeight: 600,
                              },
                          }}
                        >
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
                          sx={frostedFieldSx}
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
                      sx={frostedFieldSx}
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

                  {submitStatus === 'success' && <Alert severity="success">{t('estimatePage.feedback.success')}</Alert>}
                  {submitStatus === 'error' && <Alert severity="error">{submitError}</Alert>}
                </Stack>
              </form>
              <Typography variant="caption" display="block" sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
                {t('estimatePage.disclaimer')}
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Estimate;
