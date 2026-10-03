'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { TopNav } from '@/components/navigation/TopNav';
import { LayoutOutlet } from './LayoutOutlet';

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
      <LayoutOutlet maxWidth={1600}>
        {children}
      </LayoutOutlet>
    </Box>
  );
};
