'use client';
import React from 'react';
import { Box, TextField } from '@mui/material';
import { FormLabel, frostedFieldSx } from '@/components/estimate/formStyles';
import { PHONE_MAX_LENGTH } from '@/lib/validation';

const PhoneField = ({ value, onChange, label }) => (
  <Box>
    <FormLabel>{label}</FormLabel>
    <TextField
      fullWidth
      required
      placeholder={label}
      name='phone'
      type='tel'
      value={value}
      onChange={onChange}
      variant='outlined'
      hiddenLabel
      autoComplete='tel'
      sx={frostedFieldSx}
      inputProps={{
        inputMode: 'tel',
        pattern: '^\\+?\\d{7,15}$',
        maxLength: PHONE_MAX_LENGTH,
      }}
    />
  </Box>
);

export default PhoneField;
