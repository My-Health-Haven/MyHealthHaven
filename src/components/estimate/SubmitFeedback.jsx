'use client';
import React from 'react';
import { Alert, Typography } from '@mui/material';
import { useLanguage } from '@/context/LanguageContext';

const SubmitFeedback = ({ status, error }) => {
  const { t } = useLanguage();

  return (
    <>
      {status === 'success' && <Alert severity="success">{t('estimatePage.feedback.success')}</Alert>}
      {status === 'error' && <Alert severity="error">{error}</Alert>}
      <Typography variant="caption" display="block" sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
        {t('estimatePage.disclaimer')}
      </Typography>
    </>
  );
};

export default SubmitFeedback;
