import React, { useState, useEffect, useRef } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const CLEAR_LABEL = { en: 'Clear search', es: 'Borrar búsqueda' };

/*
 * The procedures search on paper. Same behaviour as
 * components/procedures/ProcedureSearch.jsx (300ms debounce, follows
 * initialValue when it changes outside, clear resets at once); only the look
 * changes: the field is cut into the sheet (.hp-form plus procStyles), and the
 * clear control is a named 44px button that hands focus back to the field (the
 * button itself disappears once the field is empty).
 */
const PaperSearch = ({ onSearch, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);
  const { t, language } = useLanguage();
  const inputRef = useRef(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [value, onSearch]);

  const handleClear = () => {
    setValue('');
    onSearch('');
    inputRef.current?.focus();
  };

  const placeholder = t('proceduresPage.searchPlaceholder') || 'Search procedures, tags...';

  return (
    <div role='search' className='hp-form pr-search'>
      <TextField
        fullWidth
        variant='outlined'
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputRef={inputRef}
        slotProps={{
          htmlInput: { 'aria-label': placeholder, autoComplete: 'off', spellCheck: false },
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <Search aria-hidden='true' className='size-[22px]' />
              </InputAdornment>
            ),
            endAdornment: value ? (
              <InputAdornment position='end'>
                <button type='button' onClick={handleClear} aria-label={CLEAR_LABEL[language] || CLEAR_LABEL.en} className='pr-clear'>
                  <X aria-hidden='true' className='size-5' />
                </button>
              </InputAdornment>
            ) : null,
          },
        }}
      />
    </div>
  );
};

export default PaperSearch;
