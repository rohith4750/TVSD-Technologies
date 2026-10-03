'use client';

import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import { alpha, useTheme } from '@mui/material/styles';
import { usePreferencesStore } from '@/store';
import { THEMES_LIST } from '@/themes';
import { AppButton } from '@/components/ui';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

export default function LandingPage() {
  const theme = useTheme();
  const { layout, setLayout, theme: currentTheme, setTheme } = usePreferencesStore();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <Box
        component="header"
        sx={{
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2.5, md: 6 },
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: 'sticky',
          top: 0,
          zIndex: 1100,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2.5,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.1rem',
            }}
          >
            T
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1, letterSpacing: '-0.01em' }}>
              TVSD Technologies
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', fontWeight: 600 }}>
              Enterprise Platform
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Quick Theme Selector */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.75 }}>
            {THEMES_LIST.map((th) => (
              <Box
                key={th.id}
                onClick={() => setTheme(th.id)}
                title={th.name}
                sx={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  backgroundColor: th.previewColors.primary,
                  cursor: 'pointer',
                  border: currentTheme === th.id ? `2px solid ${theme.palette.primary.contrastText}` : '2px solid transparent',
                  boxShadow: currentTheme === th.id ? `0 0 0 2px ${theme.palette.primary.main}` : 'none',
                  transition: 'all 0.15s ease',
                  '&:hover': { transform: 'scale(1.15)' },
                }}
              />
            ))}
          </Box>

          <Link href="/login" style={{ textDecoration: 'none' }}>
            <AppButton variant="outlined" size="small" startIcon={<LockOpenOutlinedIcon fontSize="small" />}>
              Sign In
            </AppButton>
          </Link>

          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <AppButton variant="contained" size="small" endIcon={<ArrowForwardOutlinedIcon fontSize="small" />}>
              Open Dashboard
            </AppButton>
          </Link>
        </Box>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 8, md: 10 }, textAlign: 'center' }}>
        <Chip
          icon={<AutoAwesomeOutlinedIcon sx={{ fontSize: 16 }} />}
          label="Next.js Enterprise Monorepo Platform"
          color="primary"
          variant="outlined"
          sx={{ mb: 3, fontWeight: 600, py: 0.5, px: 1, borderRadius: 99 }}
        />

        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            letterSpacing: '-0.03em',
            fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4.2rem' },
            lineHeight: 1.15,
            mb: 2.5,
          }}
        >
          One Reusable Foundation.{' '}
          <Box
            component="span"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Infinite Business Apps.
          </Box>
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            maxWidth: 760,
            mx: 'auto',
            mb: 5,
            fontWeight: 400,
            lineHeight: 1.6,
            fontSize: { xs: '1rem', md: '1.2rem' },
          }}
        >
          Launch ERP, CRM, Healthcare, and HRMS applications from a unified, enterprise-grade architecture. Built with Next.js, Material UI, Zustand, and real-time layout & theme engines.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 8 }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <AppButton
              variant="gradient"
              size="large"
              endIcon={<ArrowForwardOutlinedIcon />}
              sx={{ px: 4, py: 1.5, fontSize: '1rem', borderRadius: 3 }}
            >
              Launch Command Center
            </AppButton>
          </Link>
          <Link href="/users" style={{ textDecoration: 'none' }}>
            <AppButton
              variant="outlined"
              size="large"
              sx={{ px: 3.5, py: 1.5, fontSize: '1rem', borderRadius: 3 }}
            >
              User Management CRUD
            </AppButton>
          </Link>
        </Box>

        {/* Database Status Ribbon */}
        <Card
          sx={{
            maxWidth: 820,
            mx: 'auto',
            p: 2.5,
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.background.paper, 0.75),
            backdropFilter: 'blur(12px)',
            border: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textAlign: 'left' }}>
            <StorageOutlinedIcon sx={{ color: 'primary.main', fontSize: 28 }} />
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block' }}>
                POSTGRESQL DATABASE
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Database: <Box component="span" sx={{ color: 'primary.main' }}>tvsd</Box>
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textAlign: 'left' }}>
            <LayersOutlinedIcon sx={{ color: 'secondary.main', fontSize: 28 }} />
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block' }}>
                DYNAMIC LAYOUT ENGINE
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                {layout} Active
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textAlign: 'left' }}>
            <PaletteOutlinedIcon sx={{ color: 'success.main', fontSize: 28 }} />
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block' }}>
                ENTERPRISE THEME
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, textTransform: 'capitalize' }}>
                {currentTheme.replace('-', ' ')}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Container>

      {/* Architecture Highlights Grid */}
      <Box sx={{ backgroundColor: alpha(theme.palette.background.paper, 0.4), py: 10, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 7 }}>
            <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: '0.08em' }}>
              Built For Enterprise Scale
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mt: 0.5, letterSpacing: '-0.02em' }}>
              Engineered Without Rebuilding Common Parts
            </Typography>
          </Box>

          <Grid container spacing={3.5}>
            {[
              {
                icon: <LayersOutlinedIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
                title: '5 Dynamic Layout Engines',
                desc: 'Instantly toggle between Sidebar+Header, Top Nav, Mini Icon Rail, Floating SaaS Dock, and Hybrid Dual-Nav without touching page logic.',
              },
              {
                icon: <PaletteOutlinedIcon sx={{ fontSize: 32, color: 'secondary.main' }} />,
                title: '5 Corporate Themes',
                desc: 'Corporate Light, Corporate Dark, Minimal, Healthcare Blue, and Modern Gradient, applied with full Material UI and SCSS synchrony.',
              },
              {
                icon: <SpeedOutlinedIcon sx={{ fontSize: 32, color: 'success.main' }} />,
                title: 'Clean Single package.json',
                desc: 'All enterprise capabilities running from a streamlined codebase without nested package clutter, optimized for rapid delivery.',
              },
            ].map((f, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 3.5,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                    transition: 'transform 0.2s ease',
                    '&:hover': { transform: 'translateY(-4px)' },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{f.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {f.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: 'auto',
          py: 4,
          borderTop: `1px solid ${theme.palette.divider}`,
          textAlign: 'center',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          © {new Date().getFullYear()} TVSD Technologies. Next.js Enterprise Monorepo Architecture. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
