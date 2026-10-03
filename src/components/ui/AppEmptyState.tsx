import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppButton } from './AppButton';

export interface AppEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const AppEmptyState: React.FC<AppEmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <Box
      sx={{
        py: 6,
        px: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      {icon && (
        <Box
          sx={{
            mb: 2,
            p: 2,
            borderRadius: '50%',
            backgroundColor: 'action.hover',
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      )}
      <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            maxWidth: 420,
            mt: 0.5,
            mb: actionText ? 2.5 : 0,
          }}
        >
          {description}
        </Typography>
      )}
      {actionText && onAction && (
        <AppButton variant="contained" onClick={onAction}>
          {actionText}
        </AppButton>
      )}
    </Box>
  );
};
