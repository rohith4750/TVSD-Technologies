import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export interface AppInputProps extends Omit<TextFieldProps, 'variant'> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  step?: string | number;
  min?: string | number;
  max?: string | number;
}

export const AppInput: React.FC<AppInputProps> = ({
  startIcon,
  endIcon,
  InputProps,
  inputProps,
  step,
  min,
  max,
  sx,
  ...props
}) => {
  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      inputProps={{
        ...(step !== undefined ? { step } : {}),
        ...(min !== undefined ? { min } : {}),
        ...(max !== undefined ? { max } : {}),
        ...inputProps,
      }}
      InputProps={{
        ...InputProps,
        startAdornment: startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : (
          InputProps?.startAdornment
        ),
        endAdornment: endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : (
          InputProps?.endAdornment
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        },
        ...sx,
      }}
      {...props}
    />
  );
};
