'use client';
import React from 'react';
import { Box, TextField } from '@mui/material';
import { FormLabel, frostedFieldSx } from '@/components/estimate/formStyles';

const NameField = ({ value, onChange, label }) => (
  <Box>
    <FormLabel>{label}</FormLabel>
    <TextField
      fullWidth
      required
      placeholder={label}
      name="name"
      value={value}
      onChange={onChange}
      variant="outlined"
      hiddenLabel
      sx={frostedFieldSx}
    />
  </Box>
);

export default NameField;
