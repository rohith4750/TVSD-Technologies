'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { alpha, useTheme } from '@mui/material/styles';
import { useAuthStore, useNotificationStore } from '@/store';
import { Role } from '@/types';
import { AppButton, AppInput } from '@/components/ui';
import { authService } from '@/api/api';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function LoginPage() {
  const theme = useTheme();
  const router = useRouter();
  const { setUser } = useAuthStore();
  const { showToast } = useNotificationStore();

  const [email, setEmail] = useState('alex.wright@tvsd.io');
  const [password, setPassword] = useState('new password');
  const [role, setRole] = useState<Role>('SUPER_ADMIN');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRoleSelect = (selectedRole: Role, defaultEmail: string) => {
    setRole(selectedRole);
    setEmail(defaultEmail);
    setPassword('new password');
    setErrorMessage(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await authService.login({ email, password });
      if (res.user) {
        setUser(res.user, res.token);
      }
      showToast({
        type: 'success',
        title: 'Authentication Successful',
        message: `Welcome back, ${res.user?.name || email}! Authenticated with PostgreSQL [tvsd].`,
      });
      router.push('/dashboard');
    } catch (err: any) {
      const msg = err?.message || 'Invalid email or password credentials.';
      setErrorMessage(msg);
      showToast({
        type: 'error',
        title: 'Authentication Failed',
        message: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2.5,
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Back to Landing Page link */}
      <Box sx={{ position: 'absolute', top: 24, left: 24 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <AppButton
            variant="text"
            size="small"
            startIcon={<ArrowBackIcon fontSize="small" />}
            sx={{ color: 'text.secondary' }}
          >
            Back to Overview
          </AppButton>
        </Link>
      </Box>

      <Card
        sx={{
          width: '100%',
          maxWidth: 480,
          p: { xs: 3.5, sm: 4.5 },
          borderRadius: 3.5,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {/* Brand & Heading */}
        <Box sx={{ textAlign: 'center', mb: 3.5 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              mx: 'auto',
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.4rem',
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
            }}
          >
            T
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.01em', mb: 0.5 }}>
            TVSD Technologies
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Enterprise Authentication Portal
          </Typography>
        </Box>

        {/* Database Config Banner */}
        <Alert
          icon={<StorageOutlinedIcon fontSize="small" />}
          severity="info"
          sx={{
            mb: 3,
            borderRadius: 2,
            fontSize: '0.8rem',
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            color: 'text.primary',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          Target Database: <strong>tvsd</strong> | Password: <strong>new password</strong>
        </Alert>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2, fontSize: '0.84375rem' }}>
            {errorMessage}
          </Alert>
        )}

        {/* Quick Demo Role Selector */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 1 }}>
            QUICK LOGIN ROLE PRESETS:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {[
              { r: 'SUPER_ADMIN' as Role, email: 'alex.wright@tvsd.io', label: 'Super Admin' },
              { r: 'ADMIN' as Role, email: 'sarah.chen@tvsd.io', label: 'Administrator' },
              { r: 'MANAGER' as Role, email: 'marcus.v@tvsd.io', label: 'Operations Lead' },
            ].map((item) => (
              <Chip
                key={item.r}
                label={item.label}
                clickable
                color={role === item.r ? 'primary' : 'default'}
                variant={role === item.r ? 'filled' : 'outlined'}
                onClick={() => handleRoleSelect(item.r, item.email)}
                sx={{ fontSize: '0.75rem', fontWeight: 600 }}
              />
            ))}
          </Box>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <AppInput
            label="Corporate Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startIcon={<EmailOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
            required
          />

          <AppInput
            label="Account Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            startIcon={<LockOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
            required
          />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FormControlLabel
              control={<Checkbox defaultChecked size="small" />}
              label={<Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>Remember session</Typography>}
            />
            <Typography variant="caption" sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 600 }}>
              Forgot password?
            </Typography>
          </Box>

          <AppButton
            type="submit"
            variant="gradient"
            size="large"
            loading={loading}
            sx={{ py: 1.3, mt: 1, borderRadius: 2.5 }}
          >
            Authenticate & Access Dashboard
          </AppButton>
        </Box>
      </Card>
    </Box>
  );
}
