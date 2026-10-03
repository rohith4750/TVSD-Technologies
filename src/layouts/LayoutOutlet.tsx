'use client';

import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { Footer } from '@/components/navigation/Footer';

interface LayoutOutletProps extends BoxProps {
  children: React.ReactNode;
  maxWidth?: number | string;
  disablePadding?: boolean;
}

/**
 * Standardized Layout Outlet Engine Component
 * Implements the Layout Outlet pattern across all TVSD enterprise layouts:
 * 1. Hosts the dynamic page content in the main outlet viewport
 * 2. Guarantees flex-grow so footers are never orphaned
 * 3. Enforces consistent max-width, responsive margins, and padding
 * 4. Mounts the unified Enterprise Footer at the outlet base
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
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minWidth: 0,
        minHeight: '100%',
        position: 'relative',
        ...sx,
      }}
      {...rest}
    >
      {/* Content Container */}
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

      {/* Unified Enterprise Footer */}
      <Footer />
    </Box>
  );
};
