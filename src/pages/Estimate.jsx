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
} from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import GlassCard from '../components/GlassCard';

const US_STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const CITIES_BY_STATE = {
  'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'San Jose'],
  'Texas': ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth'],
  'Florida': ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Tallahassee'],
  'New York': ['New York City', 'Buffalo', 'Rochester', 'Albany', 'Syracuse'],
  'Illinois': ['Chicago', 'Aurora', 'Naperville', 'Joliet', 'Rockford'],
  'default': ['Major City 1', 'Major City 2', 'City 3']
};

const FormLabel = ({ children }) => (
  <Typography variant="h6" component="label" sx={{ display: 'block', mb: 1, fontWeight: 700, color: 'text.primary' }}>
    {children}
  </Typography>
);

const Estimate = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    procedure: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');

  const availableCities = useMemo(() => {
    if (!formData.state) return [];
    return CITIES_BY_STATE[formData.state] || [`${formData.state} City 1`, `${formData.state} City 2`, 'Other'];
  }, [formData.state]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

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
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={4}
                  placeholder={t('estimatePage.form.procedurePlaceholder')}
                  name="procedure"
                  value={formData.procedure}
                  onChange={handleChange}
                  variant="outlined"
                  hiddenLabel
                />
              </Box>

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
