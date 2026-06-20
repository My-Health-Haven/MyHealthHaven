'use client';
import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { FormLabel, frostedFieldSx } from '@/components/estimate/formStyles';
import { US_STATES } from '@/data/usLocations';

const LocationFields = ({ state, city, onStateChange, onCityChange, availableCities, t }) => (
  <>
    <Box>
      <FormLabel>{t('estimatePage.form.state')}</FormLabel>
      <TextField
        select
        fullWidth
        required
        placeholder={t('estimatePage.form.state')}
        name='state'
        value={state}
        onChange={onStateChange}
        variant='outlined'
        hiddenLabel
        sx={frostedFieldSx}
        SelectProps={{
          MenuProps: { PaperProps: { style: { maxHeight: 300 } } },
        }}
      >
        {US_STATES.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
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
        disabled={!state}
        placeholder={!state ? t('estimatePage.form.selectStateFirst') : t('estimatePage.form.city')}
        name='city'
        value={city}
        onChange={onCityChange}
        variant='outlined'
        hiddenLabel
        sx={frostedFieldSx}
      >
        {availableCities.map((c) => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  </>
);

export default LocationFields;
