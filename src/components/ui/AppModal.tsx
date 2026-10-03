import React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

export interface AppModalProps extends Omit<DialogProps, 'title'> {
  title?: React.ReactNode;
  subtitle?: string;
  actions?: React.ReactNode;
  onClose: () => void;
}

export const AppModal: React.FC<AppModalProps> = ({
  open,
  title,
  subtitle,
  actions,
  children,
  onClose,
  maxWidth = 'sm',
  ...props
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3.5,
          border: `1px solid ${theme.palette.divider}`,
          p: 1,
        },
      }}
      {...props}
    >
      {title && (
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 1,
            pt: 2,
            px: 2.5,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8125rem', mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent sx={{ px: 2.5, py: 2 }}>{children}</DialogContent>

      {actions && (
        <DialogActions sx={{ px: 2.5, py: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};
