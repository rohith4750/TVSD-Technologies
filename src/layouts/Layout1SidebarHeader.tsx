'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { Sidebar } from '@/components/navigation/Sidebar';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';
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
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Column: Fixed Toolbar, Scrollable Outlet, Fixed Footer */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Fixed Top Toolbar / Header */}
        <Box sx={{ flexShrink: 0, zIndex: 1100 }}>
          <Header onOpenPreferences={onOpenPreferences} />
        </Box>

        {/* Scrollable Main Content Outlet */}
        <LayoutOutlet maxWidth={1600}>
          {children}
        </LayoutOutlet>

        {/* Fixed Bottom Footer */}
        <Box sx={{ flexShrink: 0, zIndex: 1000 }}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};
