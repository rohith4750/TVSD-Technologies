'use client';

import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

interface LayoutOutletProps extends BoxProps {
  children: React.ReactNode;
  maxWidth?: number | string;
  disablePadding?: boolean;
}

/**
 * Standardized Layout Outlet Engine Component
 * Implements the Layout Outlet pattern across all TVSD enterprise layouts:
 * 1. Hosts the dynamic page content in the main outlet viewport
 * 2. Independent scroll container (flex: 1, overflowY: 'auto') between fixed toolbar and fixed footer
 * 3. Enforces consistent max-width, responsive margins, and padding
 */
export const LayoutOutlet: React.FC<LayoutOutletProps> = ({
  children,
  maxWidth = 1600,
  disablePadding = false,
  sx,
  ...rest
}) => {
  return (
    <Box
      component="main"
      id="tvsd-layout-outlet"
      sx={{
        flex: 1,
        width: '100%',
        minWidth: 0,
        minHeight: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
      {...rest}
    >
      <Box
        sx={{
          flex: 1,
          width: '100%',
          maxWidth,
          mx: 'auto',
          p: disablePadding ? 0 : { xs: 2, sm: 2.5, md: 3.5 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
