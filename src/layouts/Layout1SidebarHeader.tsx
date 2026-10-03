'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { Sidebar } from '@/components/navigation/Sidebar';
import { Header } from '@/components/navigation/Header';
import { LayoutOutlet } from './LayoutOutlet';

interface LayoutProps {
  onOpenPreferences: () => void;
  children: React.ReactNode;
}

export const Layout1SidebarHeader: React.FC<LayoutProps> = ({
  onOpenPreferences,
  children,
}) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* Collapsible Left Sidebar */}
      <Sidebar />

      {/* Main Content Area with Header and Outlet */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header onOpenPreferences={onOpenPreferences} />
        <LayoutOutlet maxWidth={1600}>
          {children}
        </LayoutOutlet>
      </Box>
    </Box>
  );
};
