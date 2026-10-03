'use client';

import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { alpha, useTheme } from '@mui/material/styles';
import { usePreferencesStore } from '@/store';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const Footer: React.FC = () => {
  const theme = useTheme();
  const { layout, theme: currentTheme } = usePreferencesStore();

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        mt: 'auto',
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(12px)',
        py: { xs: 2.5, md: 2 },
        px: { xs: 2.5, md: 4 },
        transition: 'background-color 0.25s ease, border-color 0.25s ease',
      }}
    >
      <Box
        sx={{
          maxWidth: 1600,
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        {/* Left Section: Branding & Copyright */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
              TVSD Technologies
            </Typography>
            <Chip
              label="v1.0 Enterprise"
              size="small"
              sx={{
                height: 18,
                fontSize: '0.65rem',
                fontWeight: 700,
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
                color: theme.palette.primary.main,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
              }}
            />
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
            © 2026 TVSD Technologies. All rights reserved. Scalable Enterprise Monorepo Architecture.
          </Typography>
        </Box>

        {/* Center Section: System & Database Health */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 1.75,
            py: 0.6,
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.success.main, 0.08),
            border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: theme.palette.success.main,
              boxShadow: `0 0 8px ${theme.palette.success.main}`,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(0.95)', opacity: 0.8 },
                '50%': { transform: 'scale(1.25)', opacity: 1 },
                '100%': { transform: 'scale(0.95)', opacity: 0.8 },
              },
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <StorageOutlinedIcon sx={{ fontSize: 14, color: theme.palette.success.main }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: theme.palette.success.main }}>
              PostgreSQL Connected (tvsd)
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'inline' } }}>
            • All Systems Operational
          </Typography>
        </Box>

        {/* Right Section: Quick Links & Active Engine Preset */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 2, sm: 3 },
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link
              href="/dashboard"
              style={{
                textDecoration: 'none',
                color: theme.palette.text.secondary,
                fontSize: '0.8rem',
                fontWeight: 500,
              }}
            >
              Dashboard
            </Link>
            <Link
              href="/users"
              style={{
                textDecoration: 'none',
                color: theme.palette.text.secondary,
                fontSize: '0.8rem',
                fontWeight: 500,
              }}
            >
              Users
            </Link>
            <Link
              href="/"
              style={{
                textDecoration: 'none',
                color: theme.palette.text.secondary,
                fontSize: '0.8rem',
                fontWeight: 500,
              }}
            >
              Landing
            </Link>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={`Layout: ${layout.toUpperCase()}`}
              size="small"
              variant="outlined"
              sx={{
                height: 20,
                fontSize: '0.65rem',
                borderColor: theme.palette.divider,
                color: 'text.secondary',
              }}
            />
            <Chip
              label={`Theme: ${currentTheme.toUpperCase()}`}
              size="small"
              variant="outlined"
              sx={{
                height: 20,
                fontSize: '0.65rem',
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
