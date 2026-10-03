'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { FloatingNav } from '@/components/navigation/FloatingNav';
import { Footer } from '@/components/navigation/Footer';
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
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Fixed Top Floating Nav / Toolbar */}
      <Box sx={{ flexShrink: 0, zIndex: 1100, pt: 1 }}>
        <FloatingNav onOpenPreferences={onOpenPreferences} />
      </Box>

      {/* Scrollable Main Content Outlet */}
      <LayoutOutlet maxWidth={1400} sx={{ pt: 1 }}>
        {children}
      </LayoutOutlet>

      {/* Fixed Bottom Footer */}
      <Box sx={{ flexShrink: 0, zIndex: 1000 }}>
        <Footer />
      </Box>
    </Box>
  );
};
