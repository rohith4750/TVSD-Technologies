'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';
import { MAIN_NAV_ITEMS } from './navItems';
import { usePreferencesStore } from '@/store';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';

const ICON_MAP: Record<string, React.ReactNode> = {
  dashboard: <DashboardOutlinedIcon fontSize="small" />,
  users: <PeopleAltOutlinedIcon fontSize="small" />,
  products: <Inventory2OutlinedIcon fontSize="small" />,
  orders: <ShoppingCartOutlinedIcon fontSize="small" />,
  customers: <ContactPhoneOutlinedIcon fontSize="small" />,
  inventory: <WarehouseOutlinedIcon fontSize="small" />,
  billing: <ReceiptLongOutlinedIcon fontSize="small" />,
  audit: <PolicyOutlinedIcon fontSize="small" />,
};

export const Sidebar: React.FC = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const { sidebarCollapsed } = usePreferencesStore();

  const width = sidebarCollapsed ? 76 : 260;

  return (
    <Box
      component="aside"
      sx={{
        width,
        minWidth: width,
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        overflowX: 'hidden',
        zIndex: 1200,
      }}
    >
      {/* Brand Header */}
      <Box
        sx={{
          height: 68,
          display: 'flex',
          alignItems: 'center',
          px: 2.5,
          borderBottom: `1px solid ${theme.palette.divider}`,
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1rem',
            flexShrink: 0,
          }}
        >
          T
        </Box>
        {!sidebarCollapsed && (
          <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
              TVSD Enterprise
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem' }}>
              Core Application Hub
            </Typography>
          </Box>
        )}
      </Box>

      {/* Navigation List */}
      <List sx={{ px: 1.5, py: 2, flex: 1, overflowY: 'auto' }}>
        {MAIN_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.id}
              href={item.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemButton
                selected={isActive}
                sx={{
                  borderRadius: 2,
                  mb: 0.75,
                  py: 1,
                  px: 1.5,
                  transition: 'all 0.15s ease',
                  backgroundColor: isActive
                    ? alpha(theme.palette.primary.main, 0.12)
                    : 'transparent',
                  color: isActive ? 'primary.main' : 'text.primary',
                  '&:hover': {
                    backgroundColor: isActive
                      ? alpha(theme.palette.primary.main, 0.18)
                      : alpha(theme.palette.action.hover, 0.08),
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isActive ? 'primary.main' : 'text.secondary',
                  }}
                >
                  {ICON_MAP[item.id] || <DashboardOutlinedIcon fontSize="small" />}
                </ListItemIcon>
                {!sidebarCollapsed && (
                  <>
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? 'primary.main' : 'inherit',
                      }}
                    />
                    {item.badge && (
                      <Box
                        component="span"
                        sx={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          px: 0.8,
                          py: 0.2,
                          borderRadius: 99,
                          backgroundColor: alpha(theme.palette.primary.main, 0.15),
                          color: 'primary.main',
                        }}
                      >
                        {item.badge}
                      </Box>
                    )}
                  </>
                )}
              </ListItemButton>
            </Link>
          );
        })}
      </List>

      {/* Bottom Footer */}
      {!sidebarCollapsed && (
        <Box
          sx={{
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: alpha(theme.palette.background.default, 0.6),
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontWeight: 500 }}>
            Architecture v1.0.0
          </Typography>
          <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>
            Next.js + MUI + SCSS
          </Typography>
        </Box>
      )}
    </Box>
  );
};
