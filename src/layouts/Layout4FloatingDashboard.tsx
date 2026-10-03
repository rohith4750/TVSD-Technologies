'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { FloatingNav } from '@/components/navigation/FloatingNav';

interface LayoutProps {
  onOpenPreferences: () => void;
  children: React.ReactNode;
}

export const Layout4FloatingDashboard: React.FC<LayoutProps> = ({
  onOpenPreferences,
  children,
}) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <FloatingNav onOpenPreferences={onOpenPreferences} />
      <Box
        component="main"
        sx={{
          flex: 1,
          px: { xs: 2, sm: 3, md: 4 },
          pb: 6,
          maxWidth: 1400,
          width: '100%',
          mx: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
