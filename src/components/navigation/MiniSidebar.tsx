'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import { MAIN_NAV_ITEMS } from './navItems';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';

const ICON_MAP: Record<string, React.ReactNode> = {
  dashboard: <DashboardOutlinedIcon />,
  users: <PeopleAltOutlinedIcon />,
  products: <Inventory2OutlinedIcon />,
  orders: <ShoppingCartOutlinedIcon />,
  customers: <ContactPhoneOutlinedIcon />,
  inventory: <WarehouseOutlinedIcon />,
  billing: <ReceiptLongOutlinedIcon />,
  audit: <PolicyOutlinedIcon />,
};

export const MiniSidebar: React.FC = () => {
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <Box
      component="aside"
      sx={{
        width: 68,
        minWidth: 68,
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
        position: 'sticky',
        top: 0,
        zIndex: 1200,
      }}
    >
      {/* Brand Icon */}
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2.5,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 800,
          fontSize: '1.1rem',
          mb: 3,
        }}
      >
        T
      </Box>

      {/* Nav Icons */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flex: 1 }}>
        {MAIN_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Tooltip key={item.id} title={item.title} placement="right" arrow>
              <Link href={item.path} style={{ textDecoration: 'none' }}>
                <IconButton
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2.5,
                    color: isActive ? 'primary.main' : 'text.secondary',
                    backgroundColor: isActive
                      ? alpha(theme.palette.primary.main, 0.12)
                      : 'transparent',
                    border: isActive
                      ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                      : '1px solid transparent',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      color: 'primary.main',
                    },
                  }}
                >
                  {ICON_MAP[item.id] || <DashboardOutlinedIcon />}
                </IconButton>
              </Link>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};
