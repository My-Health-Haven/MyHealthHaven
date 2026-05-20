'use client';
import React, { useMemo, useState } from 'react';
import {
  Container,
  Box,
  Button,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useLanguage } from '@/context/LanguageContext';
import { CITIES_BY_STATE } from '@/data/usLocations';
import { useProcedures } from '@/lib/useProcedures';
import {
  isValidEmail,
  isValidPhone,
  sanitizePhone,
} from '@/lib/validation';
import EstimateHero from '@/components/estimate/EstimateHero';
import NameField from '@/components/estimate/NameField';
import EmailField from '@/components/estimate/EmailField';
import PhoneField from '@/components/estimate/PhoneField';
import LocationFields from '@/components/estimate/LocationFields';
import ProcedureField from '@/components/estimate/ProcedureField';
import HoneypotField from '@/components/estimate/HoneypotField';
import SubmitFeedback from '@/components/estimate/SubmitFeedback';

const OTHER_PROCEDURE_OPTION = '__other_procedure__';

const Estimate = () => {
  const { t, language } = useLanguage();
  const { procedures: allProcedures } = useProcedures();
  const isSpanish = language === 'es';

  const procedureSearchPlaceholder = isSpanish
    ? 'Busque y seleccione un procedimiento'
    : 'Search and select a procedure';
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
      nextValue = sanitizePhone(value);
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
        <Box sx={{ py: { xs: 8, md: 12 }, position: 'relative', zIndex: 1 }}>
          <Container maxWidth="md">
            <EstimateHero />

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
                <HoneypotField value={formData.website} onChange={handleChange} />
                <Stack spacing={4}>
                  <NameField
                    value={formData.name}
                    onChange={handleChange}
                    label={t('estimatePage.form.name')}
                  />

                  <PhoneField
                    value={formData.phone}
                    onChange={handleChange}
                    label={t('estimatePage.form.phone')}
                  />

                  <EmailField
                    value={formData.email}
                    onChange={handleChange}
                    label={t('estimatePage.form.email')}
                  />

                  <LocationFields
                    state={formData.state}
                    city={formData.city}
                    onStateChange={handleChange}
                    onCityChange={handleChange}
                    availableCities={availableCities}
                    t={t}
                  />

                  <ProcedureField
                    procedure={formData.procedure}
                    procedureOther={formData.procedureOther}
                    onProcedureChange={handleProcedureSelect}
                    onProcedureOtherChange={handleChange}
                    procedureOptions={procedureOptions}
                    procedureSearchPlaceholder={procedureSearchPlaceholder}
                    procedureNoOptionsLabel={procedureNoOptionsLabel}
                    procedureOtherLabel={procedureOtherLabel}
                    procedureOtherPlaceholder={procedureOtherPlaceholder}
                    label={t('estimatePage.form.procedure')}
                  />

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

                  <SubmitFeedback status={submitStatus} error={submitError} />
                </Stack>
              </form>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Estimate;
