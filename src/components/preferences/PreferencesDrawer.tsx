'use client';

import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import { alpha, useTheme } from '@mui/material/styles';
import { useNotificationStore, usePreferencesStore } from '@/store';
import { IndustryPreset, LayoutType, ThemeType } from '@/types';
import { THEMES_LIST } from '@/themes';
import { AppButton } from '../ui/AppButton';

interface PreferencesDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const PreferencesDrawer: React.FC<PreferencesDrawerProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const {
    layout,
    setLayout,
    theme: currentTheme,
    setTheme,
    industry,
    setIndustry,
    density,
    setDensity,
    resetPreferences,
  } = usePreferencesStore();
  const { showToast } = useNotificationStore();

  const layouts: { id: LayoutType; name: string; desc: string }[] = [
    { id: 'layout1', name: 'Layout 1: Sidebar + Header', desc: 'Classic enterprise dashboard with collapsible sidebar.' },
    { id: 'layout2', name: 'Layout 2: Top Navigation', desc: 'Website-style horizontal mega-menu.' },
    { id: 'layout3', name: 'Layout 3: Mini Sidebar', desc: 'Compact icon rail for high-density tables.' },
    { id: 'layout4', name: 'Layout 4: Floating Dashboard', desc: 'Modern floating glass island navigation.' },
    { id: 'layout5', name: 'Layout 5: Hybrid Navigation', desc: 'Top domain tabs + detailed left module sidebar.' },
  ];

  const industries: { id: IndustryPreset; name: string; tag: string }[] = [
    { id: 'erp', name: 'Enterprise ERP', tag: 'Supply Chain & Finance' },
    { id: 'crm', name: 'Customer CRM', tag: 'Deals & Client Success' },
    { id: 'healthcare', name: 'Healthcare & EHR', tag: 'Clinical & Patient Records' },
    { id: 'hotel', name: 'Hotel & Hospitality', tag: 'Rooms & Guest Concierge' },
    { id: 'hrms', name: 'HRMS Workforce', tag: 'Payroll & Employee Directory' },
    { id: 'inventory', name: 'Logistics Depot', tag: 'SKU & Warehouse Aisles' },
  ];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 380 },
          p: 3,
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      {/* Drawer Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Platform Customizer
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Dynamic Layout & Theme Engine
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* 1. Layout Engine Selector */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <span>1. Dynamic Layout Engine</span>
          <Chip label="5 Layouts" size="small" color="primary" sx={{ height: 20, fontSize: '0.65rem' }} />
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {layouts.map((item) => {
            const isSelected = layout === item.id;

            return (
              <Box
                key={item.id}
                onClick={() => {
                  setLayout(item.id);
                  showToast({ type: 'info', message: `Activated ${item.name}` });
                }}
                sx={{
                  p: 1.5,
                  borderRadius: 2.5,
                  border: `2px solid ${
                    isSelected ? theme.palette.primary.main : theme.palette.divider
                  }`,
                  backgroundColor: isSelected
                    ? alpha(theme.palette.primary.main, 0.08)
                    : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                  },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, color: isSelected ? 'primary.main' : 'text.primary' }}>
                  {item.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.25 }}>
                  {item.desc}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* 2. Theme Engine Selector */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <span>2. Theme Engine</span>
          <Chip label="5 Themes" size="small" color="secondary" sx={{ height: 20, fontSize: '0.65rem' }} />
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {THEMES_LIST.map((th) => {
            const isSelected = currentTheme === th.id;

            return (
              <Box
                key={th.id}
                onClick={() => {
                  setTheme(th.id);
                  showToast({ type: 'success', message: `Theme switched to ${th.name}` });
                }}
                sx={{
                  p: 1.5,
                  borderRadius: 2.5,
                  border: `2px solid ${
                    isSelected ? theme.palette.primary.main : theme.palette.divider
                  }`,
                  backgroundColor: isSelected
                    ? alpha(theme.palette.primary.main, 0.08)
                    : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                {/* Theme Palette Dots */}
                <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      backgroundColor: th.previewColors.primary,
                      border: '1px solid rgba(0,0,0,0.1)',
                    }}
                  />
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      backgroundColor: th.previewColors.secondary,
                      border: '1px solid rgba(0,0,0,0.1)',
                    }}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: isSelected ? 'primary.main' : 'text.primary' }}>
                    {th.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.72rem' }}>
                    {th.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* 3. Industry Business Preset */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
          3. Industry Business Preset
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {industries.map((ind) => (
            <Chip
              key={ind.id}
              label={ind.name}
              clickable
              color={industry === ind.id ? 'primary' : 'default'}
              variant={industry === ind.id ? 'filled' : 'outlined'}
              onClick={() => {
                setIndustry(ind.id);
                showToast({ type: 'info', message: `Preset changed to ${ind.name}` });
              }}
              sx={{ fontWeight: 600 }}
            />
          ))}
        </Box>
      </Box>

      {/* 4. Density */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
          4. Display Density
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {(['compact', 'standard', 'spacious'] as const).map((d) => (
            <AppButton
              key={d}
              variant={density === d ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setDensity(d)}
              sx={{ flex: 1, textTransform: 'capitalize' }}
            >
              {d}
            </AppButton>
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: 'auto', pt: 2 }}>
        <AppButton variant="outlined" color="error" fullWidth onClick={resetPreferences}>
          Reset All Preferences
        </AppButton>
      </Box>
    </Drawer>
  );
};
