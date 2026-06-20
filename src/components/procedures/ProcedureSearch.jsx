import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useLanguage } from '../../context/LanguageContext';

const ProcedureSearch = ({ onSearch, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);
  const { t } = useLanguage();

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
  };

  return (
    <TextField
      fullWidth
      variant='outlined'
      placeholder={t('proceduresPage.searchPlaceholder') || 'Search procedures, tags...'}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon color='action' />
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position='end'>
            <IconButton onClick={handleClear} edge='end' size='small'>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ProcedureSearch;
