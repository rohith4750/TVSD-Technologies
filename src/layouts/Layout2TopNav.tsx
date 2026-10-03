'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { TopNav } from '@/components/navigation/TopNav';

interface LayoutProps {
  onOpenPreferences: () => void;
  children: React.ReactNode;
}

export const Layout2TopNav: React.FC<LayoutProps> = ({
  onOpenPreferences,
  children,
}) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopNav onOpenPreferences={onOpenPreferences} />
      <Box
        component="main"
        sx={{
          flex: 1,
          p: { xs: 2, sm: 2.5, md: 3.5 },
          maxWidth: 1600,
          width: '100%',
          mx: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
