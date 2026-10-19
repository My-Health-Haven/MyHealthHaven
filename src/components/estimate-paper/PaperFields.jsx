'use client';
import React, { useEffect, useRef } from 'react';
import { Box, TextField, MenuItem, Autocomplete } from '@mui/material';
import { CircleAlert } from 'lucide-react';
import { US_STATES } from '@/data/usLocations';
import { PHONE_MAX_LENGTH } from '@/lib/validation';
import { cls } from '@/components/paper/paperStyles';
import { bringIntoView } from './PaperSubmitFeedback';

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
 *
 * When a submit check fails on one field (procedure, phone, email), that field
 * shows the message between its label and its box (where an open dropdown
 * cannot cover it), is marked invalid (aria-invalid, aria-describedby), comes
 * into view and takes focus.
 */

const OTHER_PROCEDURE_OPTION = '__other_procedure__';

export const PaperLabel = ({ htmlFor, id, children }) => (
  <label htmlFor={htmlFor} id={id} className={`${cls.label} mb-2 block leading-[1.4]`}>
    {children}
  </label>
);

/* a field whose check failed comes into view (label included) and takes focus;
   attempt changes on every submit, so the same failure is shown again */
const useErrorFocus = (error, attempt) => {
  const wrapRef = useRef(null);
  useEffect(() => {
    if (!error || !wrapRef.current) return;
    wrapRef.current.querySelector('input, textarea')?.focus({ preventScroll: true });
    bringIntoView(wrapRef.current);
  }, [error, attempt]);
  return wrapRef;
};

/* with reduced motion the theme's pop-in of menu rows (which starts them at
   opacity 0) is dropped: the rows simply appear */
const stillRows = (selector) => ({
  '@media (prefers-reduced-motion: reduce)': {
    [selector]: {
      animation: 'none !important',
      opacity: '1 !important',
      transform: 'none !important',
      transition: 'none !important',
    },
  },
});

/* the message of a failed check, under the label */
const FieldError = ({ id, children }) =>
  children ? (
    <p id={id} className='hp-est-error'>
      <CircleAlert aria-hidden='true' />
      <span>{children}</span>
    </p>
  ) : null;

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
  ...stillRows('& .MuiMenuItem-root'),
};

export const PaperNameField = ({ value, onChange, label }) => (
  <div className='hp-est-wide hp-est-field'>
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

export const PaperPhoneField = ({ value, onChange, label, hint, error, attempt }) => {
  const wrapRef = useErrorFocus(error, attempt);
  return (
    <div ref={wrapRef} className='hp-est-field'>
      <PaperLabel htmlFor='estimate-phone'>{label}</PaperLabel>
      <FieldError id='estimate-phone-error'>{error}</FieldError>
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
        error={Boolean(error)}
        slotProps={{
          htmlInput: {
            inputMode: 'tel',
            pattern: '^\\+?\\d{7,15}$',
            maxLength: PHONE_MAX_LENGTH,
            /* the browser adds the title to its own "match the format" message */
            title: hint,
            'aria-describedby': error ? 'estimate-phone-error' : undefined,
          },
        }}
      />
    </div>
  );
};

export const PaperEmailField = ({ value, onChange, label, error, attempt }) => {
  const wrapRef = useErrorFocus(error, attempt);
  return (
    <div ref={wrapRef} className='hp-est-field'>
      <PaperLabel htmlFor='estimate-email'>{label}</PaperLabel>
      <FieldError id='estimate-email-error'>{error}</FieldError>
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
        error={Boolean(error)}
        slotProps={{
          htmlInput: {
            autoCapitalize: 'none',
            'aria-describedby': error ? 'estimate-email-error' : undefined,
          },
        }}
      />
    </div>
  );
};

export const PaperLocationFields = ({
  state,
  city,
  onStateChange,
  onCityChange,
  availableCities,
  t,
}) => {
  const statePlaceholder = t('estimatePage.form.state');
  const cityPlaceholder = !state
    ? t('estimatePage.form.selectStateFirst')
    : t('estimatePage.form.city');

  return (
    <>
      <div className='hp-est-field'>
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

      <div className='hp-est-field'>
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

/* the dropdown rows, in the page's paper and teal (the global theme's hover
   teal is too light for white text); the theme's pop-in stays when motion is
   allowed and is dropped with reduced motion (stillRows on the listbox) */
const optionSx = {
  borderRadius: '8px',
  mb: 0.5,
  px: 1.5,
  py: 1,
  color: '#1b4560',
  '&:hover, &.Mui-focused, &[data-focus="true"]': {
    backgroundColor: '#00796b !important',
    color: '#ffffff !important',
  },
  '&[aria-selected="true"], &[aria-selected="true"]:hover, &[aria-selected="true"].Mui-focused': {
    backgroundColor: '#00695c !important',
    color: '#ffffff !important',
    fontWeight: 600,
  },
};

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
  error,
  attempt,
}) => {
  const isOtherSelected = procedure === OTHER_PROCEDURE_OPTION;
  /* with Other chosen, a blank description is the field that failed */
  const pickError = isOtherSelected ? '' : error;
  const otherError = isOtherSelected ? error : '';
  const wrapRef = useErrorFocus(pickError, attempt);
  const otherRef = useErrorFocus(otherError, attempt);

  return (
    <>
      <div ref={wrapRef} className='hp-est-wide hp-est-field'>
        <PaperLabel htmlFor='estimate-procedure'>{label}</PaperLabel>
        <FieldError id='estimate-procedure-error'>{pickError}</FieldError>
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
                ...stillRows('&& .MuiAutocomplete-option'),
              },
            },
          }}
          getOptionLabel={(option) =>
            option === OTHER_PROCEDURE_OPTION ? procedureOtherLabel : String(option || '')
          }
          isOptionEqualToValue={(option, value) => option === value}
          noOptionsText={procedureNoOptionsLabel}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <Box component='li' key={key} {...optionProps} sx={optionSx}>
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
              error={Boolean(pickError)}
              inputProps={{
                ...params.inputProps,
                'aria-describedby': pickError ? 'estimate-procedure-error' : undefined,
              }}
            />
          )}
        />
      </div>

      {isOtherSelected && (
        <div ref={otherRef} className='hp-est-wide hp-est-field'>
          <PaperLabel htmlFor='estimate-procedure-other'>{procedureOtherLabel}</PaperLabel>
          <FieldError id='estimate-procedure-other-error'>{otherError}</FieldError>
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
            error={Boolean(otherError)}
            slotProps={{
              htmlInput: {
                'aria-describedby': otherError ? 'estimate-procedure-other-error' : undefined,
              },
            }}
          />
        </div>
      )}
    </>
  );
};
