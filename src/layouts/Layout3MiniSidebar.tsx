'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { MiniSidebar } from '@/components/navigation/MiniSidebar';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';
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
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Fixed Left Mini Sidebar */}
      <MiniSidebar />

      {/* Main Content Column */}
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
          <Header onOpenPreferences={onOpenPreferences} showMenuToggle={false} />
        </Box>

        {/* Scrollable Main Content Outlet */}
        <LayoutOutlet maxWidth={1700}>
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
