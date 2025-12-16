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
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">Welcome / Bienvenido</Typography>
      </DialogTitle>
      <DialogContent>
        <ErrorBoundary fallback={null}>
        <Typography variant="body1" color="text.secondary" paragraph>
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
            color="primary"
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
