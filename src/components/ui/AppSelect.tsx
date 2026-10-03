import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface AppSelectProps extends Omit<SelectProps, 'label'> {
  label: string;
  options: SelectOption[];
  helperText?: string;
  error?: boolean;
}

export const AppSelect: React.FC<AppSelectProps> = ({
  label,
  options,
  helperText,
  error,
  size = 'small',
  sx,
  ...props
}) => {
  const labelId = `app-select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <FormControl size={size} fullWidth error={error} sx={sx}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        sx={{
          borderRadius: 2,
        }}
        {...props}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '0.875rem' }}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
