'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { usePreferencesStore } from '@/store';
import { IndustryPreset } from '@/types';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { LayoutOutlet } from '@/layouts/LayoutOutlet';

interface HybridNavProps {
  onOpenPreferences?: () => void;
  children: React.ReactNode;
}

export const HybridNav: React.FC<HybridNavProps> = ({ onOpenPreferences, children }) => {
  const theme = useTheme();
  const { industry, setIndustry } = usePreferencesStore();

  const domains: { id: IndustryPreset; label: string }[] = [
    { id: 'erp', label: 'Enterprise ERP' },
    { id: 'crm', label: 'CRM & Pipeline' },
    { id: 'healthcare', label: 'Healthcare & EHR' },
    { id: 'hotel', label: 'Hospitality Suites' },
    { id: 'hrms', label: 'HRMS Workforce' },
    { id: 'inventory', label: 'Logistics Depot' },
  ];

  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Fixed Top Toolbar: Header + Domain Switcher Ribbon */}
      <Box sx={{ flexShrink: 0, zIndex: 1100 }}>
        <Header onOpenPreferences={onOpenPreferences} showMenuToggle={true} />

        {/* Top Domain Switcher Ribbon */}
        <Box
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? '#131b2e' : '#e2e8f0',
            borderBottom: `1px solid ${theme.palette.divider}`,
            px: { xs: 2, md: 3 },
            py: 0.75,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            overflowX: 'auto',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'text.secondary',
              letterSpacing: '0.05em',
              mr: 1,
              whiteSpace: 'nowrap',
            }}
          >
            Active Business Domain:
          </Typography>

          {domains.map((dom) => {
            const isSelected = industry === dom.id;

            return (
              <Box
                key={dom.id}
                onClick={() => setIndustry(dom.id)}
                sx={{
                  px: 1.5,
                  py: 0.4,
                  borderRadius: 99,
                  fontSize: '0.75rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
                  color: isSelected ? theme.palette.primary.contrastText : 'text.secondary',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    backgroundColor: isSelected
                      ? theme.palette.primary.main
                      : alpha(theme.palette.text.primary, 0.08),
                  },
                }}
              >
                {dom.label}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Middle Body: Fixed Sidebar + Scrollable LayoutOutlet */}
      <Box sx={{ display: 'flex', flex: 1, minWidth: 0, overflow: 'hidden', minHeight: 0 }}>
        <Sidebar />
        <LayoutOutlet maxWidth={1600}>
          {children}
        </LayoutOutlet>
      </Box>

      {/* Fixed Bottom Footer */}
      <Box sx={{ flexShrink: 0, zIndex: 1000 }}>
        <Footer />
      </Box>
    </Box>
  );
};
