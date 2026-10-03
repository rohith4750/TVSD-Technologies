import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

export interface AppStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
}

export const AppStatsCard: React.FC<AppStatsCardProps> = ({
  title,
  value,
  subtitle,
  change,
  icon,
  color = 'primary',
}) => {
  const theme = useTheme();
  const accentColor = (theme.palette as any)[color]?.main || theme.palette.primary.main;

  return (
    <Card
      sx={{
        p: 2.5,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 24px ${alpha(accentColor, 0.15)}`,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
              fontSize: '0.8125rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mt: 0.5,
              color: 'text.primary',
              letterSpacing: '-0.02em',
            }}
          >
            {value}
          </Typography>
        </Box>
        {icon && (
          <Box
            sx={{
              p: 1.25,
              borderRadius: 2.5,
              backgroundColor: alpha(accentColor, 0.12),
              color: accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {change && (
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 0.8,
              py: 0.25,
              borderRadius: 1,
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: change.isPositive
                ? alpha(theme.palette.success.main, 0.12)
                : alpha(theme.palette.error.main, 0.12),
              color: change.isPositive
                ? theme.palette.success.main
                : theme.palette.error.main,
            }}
          >
            {change.isPositive ? '+' : ''}
            {change.value}
          </Box>
        )}
        {subtitle && (
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Card>
  );
};
