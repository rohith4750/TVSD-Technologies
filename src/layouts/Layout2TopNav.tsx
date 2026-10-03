'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { TopNav } from '@/components/navigation/TopNav';
import { Footer } from '@/components/navigation/Footer';
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
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Fixed Top Toolbar / Navigation */}
      <Box sx={{ flexShrink: 0, zIndex: 1100 }}>
        <TopNav onOpenPreferences={onOpenPreferences} />
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
  );
};
