'use client';
import React, { useMemo, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { CITIES_BY_STATE } from '@/data/usLocations';
import { useProcedures } from '@/lib/useProcedures';
import { isValidEmail, isValidPhone, sanitizePhone } from '@/lib/validation';
import HoneypotField from '@/components/estimate/HoneypotField';
import PaperPage from '@/components/paper/PaperPage';
import { cls } from '@/components/paper/paperStyles';
import FormSheet from '@/components/estimate-paper/FormSheet';
import {
  PaperNameField,
  PaperPhoneField,
  PaperEmailField,
  PaperLocationFields,
  PaperProcedureField,
} from '@/components/estimate-paper/PaperFields';
import PaperSubmitFeedback from '@/components/estimate-paper/PaperSubmitFeedback';

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
  const privacyNoteIntro = isSpanish
    ? 'Comparta solo una breve descripcion del procedimiento que le interesa. No incluya registros medicos sensibles ni su historial de salud detallado. Consulte nuestra '
    : 'Please share only a brief description of the procedure you are interested in. Do not include sensitive medical records or detailed health history. See our ';
  const privacyLinkLabel = isSpanish ? 'Politica de Privacidad' : 'Privacy Policy';

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

  /* the title's last two words carry the felt underline on their own line */
  const titleWords = t('estimatePage.title').trim().split(/\s+/);
  const titleHead = titleWords.length > 2 ? titleWords.slice(0, -2).join(' ') : '';
  const titleTail = titleWords.length > 2 ? titleWords.slice(-2).join(' ') : titleWords.join(' ');
  const frameAlt = isSpanish
    ? 'Ilustración de la película de MyHealth Haven: una paciente en un camino que une su casa, su doctora, un calendario y el hospital.'
    : 'Illustration from the MyHealth Haven film: a patient on a road that links her home, her doctor, a calendar and the hospital.';

  /*
   * Paper world (branch redesign/without-the-maze-hero): the form lies on a
   * sheet of note paper beside the title, the road frame from the film under
   * the title (after the form on a phone). The form's state, validation,
   * honeypot, fetch and feedback above are unchanged.
   */
  return (
    <PaperPage>
      <FormSheet
        id='estimate-title'
        layout='side'
        title={titleHead}
        emphasis={titleTail}
        sub={t('estimatePage.subtitle')}
        frame={{ src: '/pages/travel-road.webp', alt: frameAlt }}
        frameSizes='(min-width: 1024px) 560px, (min-width: 768px) 704px, 100vw'
      >
        <form
          onSubmit={handleSubmit}
          aria-labelledby='estimate-title'
          className='hp-form hp-est hp-est-card px-5 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-8 xl:px-10 xl:pb-9 xl:pt-10'
        >
          <HoneypotField value={formData.website} onChange={handleChange} />
          <div className='hp-est-fields'>
            <div className='hp-est-grid'>
              <PaperNameField
                value={formData.name}
                onChange={handleChange}
                label={t('estimatePage.form.name')}
              />

              <PaperPhoneField
                value={formData.phone}
                onChange={handleChange}
                label={t('estimatePage.form.phone')}
              />

              <PaperEmailField
                value={formData.email}
                onChange={handleChange}
                label={t('estimatePage.form.email')}
              />

              <PaperLocationFields
                state={formData.state}
                city={formData.city}
                onStateChange={handleChange}
                onCityChange={handleChange}
                availableCities={availableCities}
                t={t}
              />

              <PaperProcedureField
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
            </div>
          </div>

          <p className='mb-0 mt-5 text-[0.875rem] leading-[1.6] text-[#3f5868]'>
            {privacyNoteIntro}
            <a
              href='/privacy'
              className='font-medium text-[#00695c] underline decoration-[rgba(0,105,92,0.45)] underline-offset-2 hover:decoration-[#00695c]'
            >
              {privacyLinkLabel}
            </a>
            .
          </p>

          <button
            type='submit'
            disabled={isSubmitting}
            className={`${cls.btnPrimary} hp-est-submit mt-6 min-h-[56px]`}
          >
            {isSubmitting ? (
              <CircularProgress size={18} color='inherit' />
            ) : (
              <Mail aria-hidden='true' className='size-5' />
            )}
            {isSubmitting ? t('estimatePage.form.submitting') : t('estimatePage.form.submit')}
          </button>

          <PaperSubmitFeedback status={submitStatus} error={submitError} />
        </form>
      </FormSheet>
    </PaperPage>
  );
};

export default Estimate;
