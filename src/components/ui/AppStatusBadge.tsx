import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

export type StatusBadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

export interface AppStatusBadgeProps {
  status: string;
  variant?: StatusBadgeVariant;
  showDot?: boolean;
}

export const AppStatusBadge: React.FC<AppStatusBadgeProps> = ({
  status,
  variant,
  showDot = true,
}) => {
  const theme = useTheme();

  const getAutoVariant = (statusText: string): StatusBadgeVariant => {
    const s = statusText.toUpperCase();
    if (['ACTIVE', 'IN_STOCK', 'DELIVERED', 'PAID', 'OPTIMAL', 'SUCCESS'].includes(s)) return 'success';
    if (['LOW_STOCK', 'PENDING', 'REORDER_NOW', 'UNPAID', 'WARNING', 'LEAD'].includes(s)) return 'warning';
    if (['OUT_OF_STOCK', 'FAILED', 'CANCELLED', 'CRITICAL', 'OVERDUE', 'FAILURE', 'SUSPENDED'].includes(s)) return 'error';
    if (['ENTERPRISE', 'PROCESSING', 'SHIPPED', 'PRO'].includes(s)) return 'info';
    return 'default';
  };

  const effectiveVariant = variant || getAutoVariant(status);

  const getColorConfig = () => {
    switch (effectiveVariant) {
      case 'success':
        return {
          bg: alpha(theme.palette.success.main, 0.12),
          color: theme.palette.success.main,
          border: alpha(theme.palette.success.main, 0.25),
        };
      case 'warning':
        return {
          bg: alpha(theme.palette.warning.main, 0.14),
          color: theme.palette.warning.main,
          border: alpha(theme.palette.warning.main, 0.3),
        };
      case 'error':
        return {
          bg: alpha(theme.palette.error.main, 0.12),
          color: theme.palette.error.main,
          border: alpha(theme.palette.error.main, 0.25),
        };
      case 'info':
        return {
          bg: alpha(theme.palette.info.main, 0.12),
          color: theme.palette.info.main,
          border: alpha(theme.palette.info.main, 0.25),
        };
      default:
        return {
          bg: alpha(theme.palette.text.secondary, 0.08),
          color: theme.palette.text.secondary,
          border: alpha(theme.palette.text.secondary, 0.2),
        };
    }
  };

  const { bg, color, border } = getColorConfig();

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1.25,
        py: 0.35,
        borderRadius: 99,
        backgroundColor: bg,
        border: `1px solid ${border}`,
        fontSize: '0.75rem',
        fontWeight: 600,
        color,
        letterSpacing: '0.02em',
        textTransform: 'capitalize',
      }}
    >
      {showDot && (
        <Box
          component="span"
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: color,
          }}
        />
      )}
      <Typography variant="caption" sx={{ fontWeight: 600, color: 'inherit', lineHeight: 1 }}>
        {status.replace(/_/g, ' ')}
      </Typography>
    </Box>
  );
};
