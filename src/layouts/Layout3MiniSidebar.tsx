'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { MiniSidebar } from '@/components/navigation/MiniSidebar';
import { Header } from '@/components/navigation/Header';

interface LayoutProps {
  onOpenPreferences: () => void;
  children: React.ReactNode;
}

export const Layout3MiniSidebar: React.FC<LayoutProps> = ({
  onOpenPreferences,
  children,
}) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <MiniSidebar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header onOpenPreferences={onOpenPreferences} showMenuToggle={false} />
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, sm: 2.5, md: 3.5 },
            maxWidth: 1700,
            width: '100%',
            mx: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
