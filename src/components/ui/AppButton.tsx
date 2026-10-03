import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { alpha, useTheme } from '@mui/material/styles';

export interface AppButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'contained' | 'outlined' | 'text' | 'soft' | 'gradient';
  loading?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({
  variant = 'contained',
  loading = false,
  disabled,
  children,
  startIcon,
  sx,
  color = 'primary',
  ...props
}) => {
  const theme = useTheme();

  const getCustomStyles = () => {
    if (variant === 'soft') {
      const paletteColor = (theme.palette as any)[color]?.main || theme.palette.primary.main;
      return {
        backgroundColor: alpha(paletteColor, 0.12),
        color: paletteColor,
        '&:hover': {
          backgroundColor: alpha(paletteColor, 0.2),
        },
      };
    }

    if (variant === 'gradient') {
      return {
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: '#ffffff',
        boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
        '&:hover': {
          filter: 'brightness(1.08)',
          boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.45)}`,
        },
      };
    }

    return {};
  };

  const muiVariant = variant === 'soft' || variant === 'gradient' ? 'contained' : variant;

  return (
    <Button
      variant={muiVariant}
      disabled={disabled || loading}
      color={color}
      startIcon={
        loading ? (
          <CircularProgress size={16} color="inherit" thickness={5} />
        ) : (
          startIcon
        )
      }
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 2,
        px: 2,
        py: 0.9,
        fontFamily: 'inherit',
        ...getCustomStyles(),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
