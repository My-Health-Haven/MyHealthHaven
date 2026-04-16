'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme';
import { LanguageProvider } from '@/context/LanguageContext';

export default function Providers({ children }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LanguageProvider>{children}</LanguageProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
