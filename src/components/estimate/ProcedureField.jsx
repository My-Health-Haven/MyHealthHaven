'use client';
import React from 'react';
import { Box, TextField, Autocomplete } from '@mui/material';
import { FormLabel, frostedFieldSx } from '@/components/estimate/formStyles';

const OTHER_PROCEDURE_OPTION = '__other_procedure__';

const ProcedureField = ({
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
      <Box>
        <FormLabel>{label}</FormLabel>
        <Autocomplete
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
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 16px 32px rgba(17, 24, 39, 0.14)',
                bgcolor: 'background.paper',
                overflow: 'hidden',
              },
            },
            listbox: {
              sx: {
                py: 0.75,
                px: 0.75,
                maxHeight: 320,
              },
            },
          }}
          getOptionLabel={(option) =>
            option === OTHER_PROCEDURE_OPTION ? procedureOtherLabel : String(option || '')
          }
          isOptionEqualToValue={(option, value) => option === value}
          noOptionsText={procedureNoOptionsLabel}
          renderOption={(props, option, { index }) => (
            <Box
              component='li'
              {...props}
              sx={{
                borderRadius: 1.5,
                mb: 0.5,
                minHeight: 42,
                px: 1.5,
                py: 1,
                opacity: 0,
                transform: 'scale(0.94) translateY(4px)',
                animation: 'listItemPopIn 0.22s ease forwards',
                animationDelay: `${Math.min(index, 12) * 25}ms`,
                transition: 'transform 0.2s ease, background-color 0.2s ease',
                '&:hover, &.Mui-focused, &[data-focus="true"]': {
                  transform: 'scale(1.01)',
                  backgroundColor: 'primary.main !important',
                  color: 'common.white !important',
                },
                '&[aria-selected="true"], &[aria-selected="true"]:hover, &[aria-selected="true"].Mui-focused':
                  {
                    backgroundColor: 'primary.dark !important',
                    color: 'common.white !important',
                    fontWeight: 600,
                  },
              }}
            >
              {option === OTHER_PROCEDURE_OPTION ? procedureOtherLabel : String(option || '')}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              placeholder={procedureSearchPlaceholder}
              variant='outlined'
              hiddenLabel
              sx={frostedFieldSx}
            />
          )}
        />
      </Box>

      {isOtherSelected && (
        <Box>
          <FormLabel>{procedureOtherLabel}</FormLabel>
          <TextField
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
            sx={frostedFieldSx}
          />
        </Box>
      )}
    </>
  );
};

export default ProcedureField;
