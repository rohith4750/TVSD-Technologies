'use client';

import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import { useNotificationStore } from '@/store';

export const AppToast: React.FC = () => {
  const { toasts, removeToast } = useNotificationStore();

  if (!toasts.length) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        maxWidth: 400,
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => (
        <Snackbar
          key={toast.id}
          open={true}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ position: 'static', pointerEvents: 'auto' }}
        >
          <Alert
            severity={toast.type}
            onClose={() => removeToast(toast.id)}
            variant="filled"
            sx={{
              width: '100%',
              borderRadius: 2.5,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.18)',
            }}
          >
            {toast.title && <AlertTitle sx={{ fontWeight: 600 }}>{toast.title}</AlertTitle>}
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
};
