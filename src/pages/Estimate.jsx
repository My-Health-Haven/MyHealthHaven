import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField, MenuItem, Grid, Paper } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';

const US_STATES = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const Estimate = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    procedure: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Request sent!');
  };

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'transparent', minHeight: '80vh' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" gutterBottom color="primary.main" sx={{ fontWeight: 700 }}>
            {t('estimatePage.title')}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {t('estimatePage.subtitle')}
          </Typography>
        </Box>
        
        <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, bgcolor: 'white', border: '1px solid', borderColor: 'divider' }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}> {/* Increased spacing */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label={t('estimatePage.form.name')}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                 <TextField
                  fullWidth
                  required
                  label={t('estimatePage.form.phone')}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  email
                  label={t('estimatePage.form.email')}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12}> {/* Stacked City */}
                <TextField
                  fullWidth
                  required
                  label={t('estimatePage.form.city')}
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}> {/* Stacked State */}
                <TextField
                  select
                  fullWidth
                  required
                  label={t('estimatePage.form.state')}
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  variant="outlined"
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 300,
                        },
                      },
                    },
                  }}
                >
                  {US_STATES.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={4} // Increased rows
                  label={t('estimatePage.form.procedure')}
                  name="procedure"
                  value={formData.procedure}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="Describe the procedure you are interested in..."
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button 
                  type="submit" 
                  fullWidth 
                  variant="contained" 
                  size="large"
                  color="primary"
                  sx={{ py: 2, fontSize: '1.2rem', fontWeight: 'bold', boxShadow: 'none' }} 
                >
                  {t('estimatePage.form.submit')}
                </Button>
              </Grid>
            </Grid>
          </form>
           <Typography variant="caption" display="block" sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
             {t('estimatePage.disclaimer')}
           </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Estimate;
