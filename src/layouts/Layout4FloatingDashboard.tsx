'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { FloatingNav } from '@/components/navigation/FloatingNav';
import { LayoutOutlet } from './LayoutOutlet';

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
      <LayoutOutlet maxWidth={1400} sx={{ pt: 2 }}>
        {children}
      </LayoutOutlet>
    </Box>
  );
};
