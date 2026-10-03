import React from 'react';
import Card, { CardProps } from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';

export interface AppCardProps extends Omit<CardProps, 'title'> {
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  action?: React.ReactNode;
  glass?: boolean;
  noPadding?: boolean;
}

export const AppCard: React.FC<AppCardProps> = ({
  title,
  subheader,
  action,
  glass = false,
  noPadding = false,
  children,
  sx,
  ...props
}) => {
  const theme = useTheme();

  const glassStyles = glass
    ? {
        backgroundColor: alpha(theme.palette.background.paper, 0.75),
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
      }
    : {};

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
        ...glassStyles,
        ...sx,
      }}
      {...props}
    >
      {(title || action) && (
        <>
          <CardHeader
            title={title}
            subheader={subheader}
            action={action}
            titleTypographyProps={{
              variant: 'h6',
              fontWeight: 600,
              fontSize: '1.05rem',
            }}
            subheaderTypographyProps={{
              variant: 'body2',
              color: 'text.secondary',
              fontSize: '0.8125rem',
              mt: 0.25,
            }}
            sx={{ px: 2.5, py: 2 }}
          />
          <Divider sx={{ borderColor: theme.palette.divider }} />
        </>
      )}
      <CardContent sx={{ p: noPadding ? 0 : 2.5, '&:last-child': { pb: noPadding ? 0 : 2.5 } }}>
        {children}
      </CardContent>
    </Card>
  );
};
