import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import ErrorBoundary from './ErrorBoundary';

const LanguageModal = () => {
  const { showModal, selectLanguage } = useLanguage();

  if (!showModal) return null;

  return (
    <Dialog 
      open={showModal} 
      maxWidth="xs" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold" color="white">Welcome / Bienvenido</Typography>
      </DialogTitle>
      <DialogContent>
        <ErrorBoundary fallback={null}>
        <Typography variant="body1" color="rgba(255, 255, 255, 0.8)" paragraph>
          Please select your preferred language.
          <br />
          Por favor seleccione su idioma preferido.
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => selectLanguage('en')}
            fullWidth
            color="primary"
          >
            English
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            onClick={() => selectLanguage('es')}
            fullWidth
            sx={{
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              '&:hover': {
                borderColor: 'white',
                background: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Español
          </Button>
        </Stack>
        </ErrorBoundary>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageModal;
