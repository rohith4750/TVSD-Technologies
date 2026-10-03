'use client';

import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppButton } from '@/components/ui';

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        Page Not Found
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 460, mb: 3 }}>
        The requested resource does not exist or has been moved to a different module.
      </Typography>
      <Link href="/dashboard" style={{ textDecoration: 'none' }}>
        <AppButton variant="contained">Return to Dashboard</AppButton>
      </Link>
    </Box>
  );
}
