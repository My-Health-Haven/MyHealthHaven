import React from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import GlassCard from '../components/GlassCard';

const Estimate = () => {
  return (
    <Container maxWidth="md" sx={{ py: 12 }}>
      <Typography variant="h2" gutterBottom color="primary.main">Get a Free Estimate</Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        No account required. Select your procedure to receive an instant ballpark cost range.
      </Typography>
      
      <GlassCard sx={{ p: 4, mt: 4, maxWidth: 600 }}>
         <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="procedure-select-label">Select Procedure</InputLabel>
          <Select
            labelId="procedure-select-label"
            label="Select Procedure"
            defaultValue=""
          >
            <MenuItem value="knee-replacement">Total Knee Replacement</MenuItem>
            <MenuItem value="hip-replacement">Total Hip Replacement</MenuItem>
            <MenuItem value="gastric-sleeve">Gastric Sleeve</MenuItem>
            <MenuItem value="dental-implants">Dental Implants (All-on-4)</MenuItem>
            <MenuItem value="rhinoplasty">Rhinoplasty</MenuItem>
            <MenuItem value="mri">Full Body MRI</MenuItem>
          </Select>
        </FormControl>
        
        <Typography variant="caption" color="text.secondary">
            * This is a preliminary estimate. Your final quote will be provided by your Health Navigator™ after a medical review.
        </Typography>
      </GlassCard>
    </Container>
  );
};

export default Estimate;
