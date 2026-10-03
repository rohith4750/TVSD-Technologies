'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { usePreferencesStore } from '@/store';
import { Layout1SidebarHeader } from './Layout1SidebarHeader';
import { Layout2TopNav } from './Layout2TopNav';
import { Layout3MiniSidebar } from './Layout3MiniSidebar';
import { Layout4FloatingDashboard } from './Layout4FloatingDashboard';
import { Layout5Hybrid } from './Layout5Hybrid';
import { PreferencesDrawer } from '@/components/preferences/PreferencesDrawer';

interface LayoutEngineProps {
  children: React.ReactNode;
}

export const LayoutEngine: React.FC<LayoutEngineProps> = ({ children }) => {
  const { layout } = usePreferencesStore();
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const handleOpenPreferences = () => setPreferencesOpen(true);
  const handleClosePreferences = () => setPreferencesOpen(false);

  const renderLayout = () => {
    switch (layout) {
      case 'layout2':
        return (
          <Layout2TopNav onOpenPreferences={handleOpenPreferences}>
            {children}
          </Layout2TopNav>
        );
      case 'layout3':
        return (
          <Layout3MiniSidebar onOpenPreferences={handleOpenPreferences}>
            {children}
          </Layout3MiniSidebar>
        );
      case 'layout4':
        return (
          <Layout4FloatingDashboard onOpenPreferences={handleOpenPreferences}>
            {children}
          </Layout4FloatingDashboard>
        );
      case 'layout5':
        return (
          <Layout5Hybrid onOpenPreferences={handleOpenPreferences}>
            {children}
          </Layout5Hybrid>
        );
      case 'layout1':
      default:
        return (
          <Layout1SidebarHeader onOpenPreferences={handleOpenPreferences}>
            {children}
          </Layout1SidebarHeader>
        );
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', position: 'relative' }}>
      {renderLayout()}

      {/* Persistent Live Preferences Drawer */}
      <PreferencesDrawer open={preferencesOpen} onClose={handleClosePreferences} />
    </Box>
  );
};
