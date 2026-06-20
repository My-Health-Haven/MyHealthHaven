'use client';
import { Typography } from '@mui/material';

export const frostedFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2.5,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.46) 0%, rgba(255,255,255,0.22) 100%)',
    backdropFilter: 'blur(14px) saturate(165%)',
    WebkitBackdropFilter: 'blur(14px) saturate(165%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.62), 0 10px 24px rgba(15,23,42,0.05)',
    transition: 'background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
    '& fieldset': {
      borderColor: 'rgba(255,255,255,0.5)',
      borderWidth: 1.2,
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0,137,123,0.35)',
    },
    '&.Mui-focused': {
      background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.32) 100%)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.75), 0 0 0 4px rgba(0,137,123,0.08)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(0,137,123,0.5)',
    },
    '&.Mui-disabled': {
      background: 'linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.12) 100%)',
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(31,41,51,0.56)',
    opacity: 1,
  },
  '& .MuiSvgIcon-root': {
    color: 'text.secondary',
  },
};

export const FormLabel = ({ children }) => (
  <Typography
    variant='h6'
    component='label'
    sx={{ display: 'block', mb: 1, fontWeight: 700, color: 'text.primary' }}
  >
    {children}
  </Typography>
);
