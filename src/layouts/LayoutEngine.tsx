'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuthStore, usePreferencesStore } from '@/store';
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
  const pathname = usePathname();
  const router = useRouter();
  const { layout } = usePreferencesStore();
  const { isAuthenticated } = useAuthStore();
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const handleOpenPreferences = () => setPreferencesOpen(true);
  const handleClosePreferences = () => setPreferencesOpen(false);

  const isProtected = pathname.startsWith('/dashboard') || pathname.startsWith('/users');

  // Strict route protection: user cannot land on protected pages unless logged in
  useEffect(() => {
    if (isProtected && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isProtected, isAuthenticated, router]);

  // If unauthenticated and on protected route, block render and redirect
  if (isProtected && !isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          p: 3,
        }}
      >
        <CircularProgress size={36} color="primary" />
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          🔒 Authentication required. Redirecting to Login...
        </Typography>
      </Box>
    );
  }

  // Standalone pages: Landing page and Login page
  const isStandalone = pathname === '/' || pathname === '/login';

  const renderLayout = () => {
    if (isStandalone) {
      return children;
    }

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
