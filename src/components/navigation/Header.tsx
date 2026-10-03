'use client';

import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, useTheme } from '@mui/material/styles';
import { useAuthStore, usePreferencesStore } from '@/store';
import { LayoutType, ThemeType } from '@/types';
import { THEMES_LIST } from '@/themes';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

interface HeaderProps {
  onOpenPreferences?: () => void;
  showMenuToggle?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPreferences,
  showMenuToggle = true,
}) => {
  const theme = useTheme();
  const { user } = useAuthStore();
  const { layout, setLayout, theme: currentTheme, setTheme, toggleSidebar, industry } = usePreferencesStore();

  const [layoutAnchor, setLayoutAnchor] = React.useState<null | HTMLElement>(null);
  const [themeAnchor, setThemeAnchor] = React.useState<null | HTMLElement>(null);
  const [userAnchor, setUserAnchor] = React.useState<null | HTMLElement>(null);

  const layoutsList: { id: LayoutType; name: string }[] = [
    { id: 'layout1', name: 'Layout 1: Sidebar + Header' },
    { id: 'layout2', name: 'Layout 2: Top Navigation' },
    { id: 'layout3', name: 'Layout 3: Mini Sidebar' },
    { id: 'layout4', name: 'Layout 4: Floating Dashboard' },
    { id: 'layout5', name: 'Layout 5: Hybrid Navigation' },
  ];

  return (
    <Box
      component="header"
      sx={{
        height: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 3 },
        backgroundColor: alpha(theme.palette.background.paper, 0.85),
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        position: 'sticky',
        top: 0,
        zIndex: 1100,
      }}
    >
      {/* Left section: Toggle + Brand */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {showMenuToggle && (
          <IconButton onClick={toggleSidebar} size="small" sx={{ color: 'text.secondary' }}>
            <MenuIcon />
          </IconButton>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.875rem',
            }}
          >
            T
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.1, fontSize: '0.95rem' }}>
              TVSD Cloud
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontSize: '0.65rem',
              }}
            >
              {industry} Mode
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right section: Quick Layout & Theme switchers, user menu */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Layout Switcher Button */}
        <Tooltip title="Switch Layout Engine">
          <IconButton
            size="small"
            onClick={(e) => setLayoutAnchor(e.currentTarget)}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              px: 1.25,
              py: 0.6,
              color: 'text.secondary',
            }}
          >
            <DashboardCustomizeOutlinedIcon sx={{ fontSize: 18, mr: 0.75 }} />
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary', display: { xs: 'none', sm: 'inline' } }}>
              {layout.toUpperCase()}
            </Typography>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={layoutAnchor}
          open={Boolean(layoutAnchor)}
          onClose={() => setLayoutAnchor(null)}
          PaperProps={{ sx: { minWidth: 220, borderRadius: 2.5 } }}
        >
          {layoutsList.map((item) => (
            <MenuItem
              key={item.id}
              selected={layout === item.id}
              onClick={() => {
                setLayout(item.id);
                setLayoutAnchor(null);
              }}
              sx={{ fontSize: '0.84375rem', py: 1 }}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>

        {/* Theme Switcher Button */}
        <Tooltip title="Switch Theme Engine">
          <IconButton
            size="small"
            onClick={(e) => setThemeAnchor(e.currentTarget)}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              px: 1.25,
              py: 0.6,
              color: 'text.secondary',
            }}
          >
            <PaletteOutlinedIcon sx={{ fontSize: 18, mr: 0.75 }} />
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary', display: { xs: 'none', sm: 'inline' } }}>
              {currentTheme.replace('-', ' ')}
            </Typography>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={themeAnchor}
          open={Boolean(themeAnchor)}
          onClose={() => setThemeAnchor(null)}
          PaperProps={{ sx: { minWidth: 220, borderRadius: 2.5 } }}
        >
          {THEMES_LIST.map((th) => (
            <MenuItem
              key={th.id}
              selected={currentTheme === th.id}
              onClick={() => {
                setTheme(th.id);
                setThemeAnchor(null);
              }}
              sx={{ fontSize: '0.84375rem', py: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}
            >
              <Box
                sx={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  backgroundColor: th.previewColors.primary,
                  border: '1px solid rgba(0,0,0,0.1)',
                }}
              />
              {th.name}
            </MenuItem>
          ))}
        </Menu>

        {/* Notifications Icon */}
        <Tooltip title="Notifications">
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <Badge color="error" variant="dot">
              <NotificationsOutlinedIcon fontSize="small" />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Full Preferences Drawer Button */}
        {onOpenPreferences && (
          <Tooltip title="Application Preferences">
            <IconButton
              size="small"
              onClick={onOpenPreferences}
              sx={{
                color: 'primary.main',
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              }}
            >
              <TuneOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        {/* User Profile */}
        <Box
          onClick={(e) => setUserAnchor(e.currentTarget)}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1, cursor: 'pointer' }}
        >
          <Avatar
            src={user.avatar}
            alt={user.name}
            sx={{ width: 34, height: 34, border: `2px solid ${theme.palette.primary.main}` }}
          />
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.1 }}>
              {user.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              {user.role}
            </Typography>
          </Box>
        </Box>

        <Menu
          anchorEl={userAnchor}
          open={Boolean(userAnchor)}
          onClose={() => setUserAnchor(null)}
          PaperProps={{ sx: { minWidth: 180, borderRadius: 2.5 } }}
        >
          <MenuItem onClick={() => { setUserAnchor(null); window.location.href = '/dashboard'; }}>
            Dashboard
          </MenuItem>
          <MenuItem onClick={() => { setUserAnchor(null); window.location.href = '/users'; }}>
            Users Manager
          </MenuItem>
          <MenuItem onClick={() => { setUserAnchor(null); window.location.href = '/login'; }} sx={{ color: 'error.main' }}>
            Sign Out
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
