'use client';

import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { alpha, useTheme } from '@mui/material/styles';
import { usePreferencesStore } from '@/store';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';

export const Footer: React.FC = () => {
  const theme = useTheme();
  const { layout, theme: currentTheme } = usePreferencesStore();

  return (
    <Box
      component="footer"
      id="tvsd-fixed-footer"
      sx={{
        width: '100%',
        flexShrink: 0,
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.92),
        backdropFilter: 'blur(16px)',
        py: 0.9,
        px: { xs: 2, sm: 3, md: 4 },
        transition: 'background-color 0.25s ease, border-color 0.25s ease',
        zIndex: 1050,
      }}
    >
      <Box
        sx={{
          maxWidth: 1600,
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: { xs: 1, sm: 2 },
        }}
      >
        {/* Left Section: Branding & Copyright */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Box
            sx={{
              width: 22,
              height: 22,
              borderRadius: 1,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '0.7rem',
              fontWeight: 800,
            }}
          >
            T
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.8125rem' }}>
            TVSD Technologies
          </Typography>
          <Chip
            label="v1.0 Enterprise"
            size="small"
            sx={{
              height: 18,
              fontSize: '0.625rem',
              fontWeight: 700,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          />
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontSize: '0.75rem', display: { xs: 'none', md: 'inline' } }}
          >
            • © 2026 TVSD. All rights reserved.
          </Typography>
        </Box>

        {/* Center Section: Real-time System & Database Health */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            px: 1.5,
            py: 0.35,
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.success.main, 0.08),
            border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
          }}
        >
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: theme.palette.success.main,
              boxShadow: `0 0 8px ${theme.palette.success.main}`,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(0.95)', opacity: 0.8 },
                '50%': { transform: 'scale(1.3)', opacity: 1 },
                '100%': { transform: 'scale(0.95)', opacity: 0.8 },
              },
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StorageOutlinedIcon sx={{ fontSize: 13, color: theme.palette.success.main }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: theme.palette.success.main, fontSize: '0.7rem' }}>
              PostgreSQL Connected (tvsd)
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontSize: '0.7rem', display: { xs: 'none', lg: 'inline' } }}
          >
            • 99.98% Uptime
          </Typography>
        </Box>

        {/* Right Section: Quick Navigation & Active Badges */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1.5 }}>
            <Link
              href="/dashboard"
              style={{
                textDecoration: 'none',
                color: theme.palette.text.secondary,
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              Dashboard
            </Link>
            <Link
              href="/users"
              style={{
                textDecoration: 'none',
                color: theme.palette.text.secondary,
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              Users
            </Link>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Chip
              label={layout.toUpperCase()}
              size="small"
              variant="outlined"
              sx={{
                height: 19,
                fontSize: '0.625rem',
                fontWeight: 600,
                borderColor: theme.palette.divider,
                color: 'text.secondary',
              }}
            />
            <Chip
              label={currentTheme.toUpperCase()}
              size="small"
              variant="outlined"
              sx={{
                height: 19,
                fontSize: '0.625rem',
                fontWeight: 600,
                borderColor: theme.palette.divider,
                color: 'text.secondary',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
