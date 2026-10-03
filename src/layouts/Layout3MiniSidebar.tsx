'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { MiniSidebar } from '@/components/navigation/MiniSidebar';
import { Header } from '@/components/navigation/Header';
import { LayoutOutlet } from './LayoutOutlet';

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
        <LayoutOutlet maxWidth={1700}>
          {children}
        </LayoutOutlet>
      </Box>
    </Box>
  );
};
