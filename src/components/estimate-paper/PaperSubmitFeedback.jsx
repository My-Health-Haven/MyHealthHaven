'use client';
import React from 'react';
import { CircleAlert, CircleCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/*
 * Paper version of src/components/estimate/SubmitFeedback: the same success and
 * error messages (role=alert, as the MUI Alert had) and the same disclaimer
 * under them, set as slips on the form card instead of MUI alerts.
 */
const PaperSubmitFeedback = ({ status, error }) => {
  const { t } = useLanguage();

  return (
    <>
      {status === 'success' && (
        <div role='alert' className='hp-est-note hp-est-ok'>
          <CircleCheck aria-hidden='true' />
          <span>{t('estimatePage.feedback.success')}</span>
        </div>
      )}
      {status === 'error' && (
        <div role='alert' className='hp-est-note hp-est-err'>
          <CircleAlert aria-hidden='true' />
          <span>{error}</span>
        </div>
      )}
      <p className='mb-0 mt-6 border-0 border-t border-dashed border-[rgba(27,69,96,0.22)] pt-4 text-[0.8125rem] leading-[1.55] text-[#5b7180]'>
        {t('estimatePage.disclaimer')}
      </p>
    </>
  );
};

export default PaperSubmitFeedback;
