'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { alpha, useTheme } from '@mui/material/styles';
import { MAIN_NAV_ITEMS } from './navItems';
import { useAuthStore, usePreferencesStore } from '@/store';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

interface FloatingNavProps {
  onOpenPreferences?: () => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ onOpenPreferences }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { layout } = usePreferencesStore();

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 16,
        zIndex: 1150,
        px: { xs: 2, md: 4 },
        mb: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 1300,
          mx: 'auto',
          height: 64,
          borderRadius: 99,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
        }}
      >
        {/* Left: Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
            }}
          >
            T
          </Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
            TVSD SaaS
          </Typography>
        </Box>

        {/* Center: Nav links in pill dock */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            overflowX: 'auto',
            py: 0.5,
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
                    px: 1.5,
                    py: 0.6,
                    borderRadius: 99,
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'primary.main' : 'text.secondary',
                    backgroundColor: isActive
                      ? alpha(theme.palette.primary.main, 0.12)
                      : 'transparent',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      color: 'primary.main',
                    },
                  }}
                >
                  {item.title}
                </Box>
              </Link>
            );
          })}
        </Box>

        {/* Right: Quick actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {onOpenPreferences && (
            <Tooltip title="Settings">
              <IconButton size="small" onClick={onOpenPreferences} sx={{ color: 'text.secondary' }}>
                <TuneOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          <Avatar
            src={user.avatar}
            alt={user.name}
            sx={{ width: 32, height: 32, border: `2px solid ${theme.palette.primary.main}` }}
          />
        </Box>
      </Box>
    </Box>
  );
};
