'use client';

import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { usePreferencesStore } from '@/store';
import { applyThemeVariables, createAppTheme } from '@/themes';
import { LayoutEngine } from '@/layouts/LayoutEngine';
import { AppToast } from '@/components/ui/AppToast';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const { theme: currentTheme } = usePreferencesStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    applyThemeVariables(currentTheme);
  }, [currentTheme]);

  const muiTheme = React.useMemo(() => createAppTheme(currentTheme), [currentTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {/* Render LayoutEngine after mount to avoid hydration mismatch */}
        {mounted ? (
          <LayoutEngine>{children}</LayoutEngine>
        ) : (
          <div style={{ visibility: 'hidden' }}>{children}</div>
        )}
        <AppToast />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
