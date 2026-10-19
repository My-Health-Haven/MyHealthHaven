'use client';
import React from 'react';
import { Box, TextField, MenuItem, Autocomplete } from '@mui/material';
import { US_STATES } from '@/data/usLocations';
import { PHONE_MAX_LENGTH } from '@/lib/validation';
import { cls } from '@/components/paper/paperStyles';

/*
 * Paper versions of the estimate form fields (src/components/estimate/*). Same
 * MUI fields, names, values, handlers, required flags, input types, patterns
 * and options as the originals; what changes is the look (no frosted glass:
 * the .hp-form.hp-est styles in formPaperStyles.js set the fields into the
 * paper card) and the labels, which are now tied to their fields (htmlFor, or
 * labelId for the selects) so a screen reader names each field by its label.
 *
 * The selects also show their placeholder (the originals passed one, but a
 * select never displays it): the State field reads "State", and the City field
 * reads "Select a State first" while it waits for a state.
 */

const OTHER_PROCEDURE_OPTION = '__other_procedure__';

export const PaperLabel = ({ htmlFor, id, children }) => (
  <label htmlFor={htmlFor} id={id} className={`${cls.label} mb-2 block leading-[1.4]`}>
    {children}
  </label>
);

const placeholderValue = (placeholder) => {
  const PlaceholderValue = (selected) =>
    selected ? selected : <span className='hp-est-ph'>{placeholder}</span>;
  return PlaceholderValue;
};

/* the select menus in the page's paper and teal, like the procedure list below
   (the global theme's hover teal is too light for white text) */
const menuPaperSx = {
  bgcolor: '#fffaf1',
  borderColor: 'rgba(27,69,96,0.16)',
  '& .MuiMenuItem-root': { color: '#1b4560', minHeight: 44 },
  '& .MuiMenuItem-root:hover, & .MuiMenuItem-root.Mui-focusVisible': {
    backgroundColor: '#00796b !important',
    color: '#ffffff !important',
  },
  '& .MuiMenuItem-root.Mui-selected': {
    backgroundColor: '#00695c !important',
    color: '#ffffff !important',
  },
};

export const PaperNameField = ({ value, onChange, label }) => (
  <div className='hp-est-wide'>
    <PaperLabel htmlFor='estimate-name'>{label}</PaperLabel>
    <TextField
      id='estimate-name'
      fullWidth
      required
      placeholder={label}
      name='name'
      value={value}
      onChange={onChange}
      variant='outlined'
      hiddenLabel
      autoComplete='name'
    />
  </div>
);

export const PaperPhoneField = ({ value, onChange, label }) => (
  <div>
    <PaperLabel htmlFor='estimate-phone'>{label}</PaperLabel>
    <TextField
      id='estimate-phone'
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
      slotProps={{
        htmlInput: {
          inputMode: 'tel',
          pattern: '^\\+?\\d{7,15}$',
          maxLength: PHONE_MAX_LENGTH,
        },
      }}
    />
  </div>
);

export const PaperEmailField = ({ value, onChange, label }) => (
  <div>
    <PaperLabel htmlFor='estimate-email'>{label}</PaperLabel>
    <TextField
      id='estimate-email'
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
      slotProps={{
        htmlInput: {
          autoCapitalize: 'none',
        },
      }}
    />
  </div>
);

export const PaperLocationFields = ({ state, city, onStateChange, onCityChange, availableCities, t }) => {
  const statePlaceholder = t('estimatePage.form.state');
  const cityPlaceholder = !state ? t('estimatePage.form.selectStateFirst') : t('estimatePage.form.city');

  return (
    <>
      <div>
        <PaperLabel id='estimate-state-label'>{t('estimatePage.form.state')}</PaperLabel>
        <TextField
          id='estimate-state'
          select
          fullWidth
          required
          placeholder={statePlaceholder}
          name='state'
          value={state}
          onChange={onStateChange}
          variant='outlined'
          hiddenLabel
          slotProps={{
            select: {
              labelId: 'estimate-state-label',
              displayEmpty: true,
              renderValue: placeholderValue(statePlaceholder),
              MenuProps: { PaperProps: { style: { maxHeight: 300 }, sx: menuPaperSx } },
            },
          }}
        >
          {US_STATES.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div>
        <PaperLabel id='estimate-city-label'>{t('estimatePage.form.city')}</PaperLabel>
        <TextField
          id='estimate-city'
          select
          fullWidth
          required
          disabled={!state}
          placeholder={cityPlaceholder}
          name='city'
          value={city}
          onChange={onCityChange}
          variant='outlined'
          hiddenLabel
          slotProps={{
            select: {
              labelId: 'estimate-city-label',
              displayEmpty: true,
              renderValue: placeholderValue(cityPlaceholder),
              MenuProps: { PaperProps: { sx: menuPaperSx } },
            },
          }}
        >
          {availableCities.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </>
  );
};

/* the dropdown, in the page's paper and teal (the global theme's hover teal is
   too light for white text); the pop-in of the options only runs when motion is
   allowed, and nothing starts hidden without it */
const optionSx = (index) => ({
  borderRadius: '8px',
  mb: 0.5,
  minHeight: 44,
  px: 1.5,
  py: 1,
  color: '#1b4560',
  opacity: 1,
  transform: 'none',
  animation: 'none',
  '@media (prefers-reduced-motion: no-preference)': {
    opacity: 0,
    transform: 'scale(0.94) translateY(4px)',
    animation: 'listItemPopIn 0.22s ease forwards',
    animationDelay: `${Math.min(index, 12) * 25}ms`,
    transition: 'background-color 0.2s ease',
  },
  '&:hover, &.Mui-focused, &[data-focus="true"]': {
    backgroundColor: '#00796b !important',
    color: '#ffffff !important',
  },
  '&[aria-selected="true"], &[aria-selected="true"]:hover, &[aria-selected="true"].Mui-focused': {
    backgroundColor: '#00695c !important',
    color: '#ffffff !important',
    fontWeight: 600,
  },
});

export const PaperProcedureField = ({
  procedure,
  procedureOther,
  onProcedureChange,
  onProcedureOtherChange,
  procedureOptions,
  procedureSearchPlaceholder,
  procedureNoOptionsLabel,
  procedureOtherLabel,
  procedureOtherPlaceholder,
  label,
}) => {
  const isOtherSelected = procedure === OTHER_PROCEDURE_OPTION;

  return (
    <>
      <div className='hp-est-wide'>
        <PaperLabel htmlFor='estimate-procedure'>{label}</PaperLabel>
        <Autocomplete
          id='estimate-procedure'
          options={procedureOptions}
          value={procedure || null}
          onChange={onProcedureChange}
          slotProps={{
            popper: {
              placement: 'bottom-start',
              modifiers: [
                { name: 'flip', enabled: false },
                { name: 'offset', options: { offset: [0, 8] } },
              ],
              sx: {
                zIndex: (theme) => theme.zIndex.modal + 1,
              },
            },
            paper: {
              elevation: 0,
              sx: {
                borderRadius: '12px',
                border: '1px solid rgba(27,69,96,0.16)',
                boxShadow: '0 1px 0 rgba(70,50,30,0.10), 0 22px 36px -20px rgba(70,50,30,0.55)',
                bgcolor: '#fffaf1',
                overflow: 'hidden',
              },
            },
            listbox: {
              sx: {
                py: 0.75,
                px: 0.75,
                maxHeight: 320,
                /* 44px rows at every width (MUI drops them to auto from 600px up) */
                '&& .MuiAutocomplete-option': { minHeight: 44 },
              },
            },
          }}
          getOptionLabel={(option) =>
            option === OTHER_PROCEDURE_OPTION ? procedureOtherLabel : String(option || '')
          }
          isOptionEqualToValue={(option, value) => option === value}
          noOptionsText={procedureNoOptionsLabel}
          renderOption={(props, option, { index }) => {
            const { key, ...optionProps } = props;
            return (
              <Box component='li' key={key} {...optionProps} sx={optionSx(index)}>
                {option === OTHER_PROCEDURE_OPTION ? procedureOtherLabel : String(option || '')}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              placeholder={procedureSearchPlaceholder}
              variant='outlined'
              hiddenLabel
            />
          )}
        />
      </div>

      {isOtherSelected && (
        <div className='hp-est-wide'>
          <PaperLabel htmlFor='estimate-procedure-other'>{procedureOtherLabel}</PaperLabel>
          <TextField
            id='estimate-procedure-other'
            fullWidth
            required
            multiline
            rows={4}
            placeholder={procedureOtherPlaceholder}
            name='procedureOther'
            value={procedureOther}
            onChange={onProcedureOtherChange}
            variant='outlined'
            hiddenLabel
          />
        </div>
      )}
    </>
  );
};
