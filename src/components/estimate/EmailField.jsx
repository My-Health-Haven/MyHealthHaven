'use client';
import React from 'react';
import { Box, TextField } from '@mui/material';
import { FormLabel, frostedFieldSx } from '@/components/estimate/formStyles';

const EmailField = ({ value, onChange, label }) => (
  <Box>
    <FormLabel>{label}</FormLabel>
    <TextField
      fullWidth
      required
      placeholder={label}
      name='email'
      type='email'
      value={value}
      onChange={onChange}
      variant='outlined'
      hiddenLabel
      autoComplete='email'
      sx={frostedFieldSx}
      inputProps={{
        autoCapitalize: 'none',
      }}
    />
  </Box>
);

export default EmailField;
