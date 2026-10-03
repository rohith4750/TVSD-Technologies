'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { MAIN_NAV_ITEMS } from './navItems';
import { Header } from './Header';

interface TopNavProps {
  onOpenPreferences?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onOpenPreferences }) => {
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <Box sx={{ width: '100%', position: 'sticky', top: 0, zIndex: 1100 }}>
      {/* Top Header Bar */}
      <Header onOpenPreferences={onOpenPreferences} showMenuToggle={false} />

      {/* Horizontal Nav Bar */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          px: { xs: 2, md: 3 },
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          overflowX: 'auto',
          py: 0.75,
        }}
      >
        {MAIN_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.id}
              href={item.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Box
                sx={{
                  px: 1.75,
                  py: 0.75,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  fontSize: '0.84375rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'primary.main' : 'text.secondary',
                  backgroundColor: isActive
                    ? alpha(theme.palette.primary.main, 0.1)
                    : 'transparent',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: alpha(theme.palette.primary.main, 0.06),
                  },
                }}
              >
                <span>{item.title}</span>
                {item.badge && (
                  <Box
                    component="span"
                    sx={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      px: 0.6,
                      py: 0.15,
                      borderRadius: 99,
                      backgroundColor: alpha(theme.palette.primary.main, 0.12),
                      color: 'primary.main',
                    }}
                  >
                    {item.badge}
                  </Box>
                )}
              </Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};
