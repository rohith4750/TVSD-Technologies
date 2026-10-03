'use client';

import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { alpha, useTheme } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/api/api';
import { usePreferencesStore } from '@/store';
import {
  AppBreadcrumbs,
  AppButton,
  AppCard,
  AppStatsCard,
  AppStatusBadge,
  AppTable
} from '@/components/ui';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

export default function DashboardPage() {
  const theme = useTheme();
  const { layout, theme: currentTheme, industry, setIndustry } = usePreferencesStore();

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  });

  const activeUsersCount = users.filter((u) => u.status === 'ACTIVE').length;

  return (
    <Box className="fade-in">
      <AppBreadcrumbs items={[{ label: 'Command Center', active: true }]} />

      {/* Hero Welcome Banner */}
      <Card
        sx={{
          p: { xs: 2.5, md: 3.5 },
          mb: 3.5,
          borderRadius: 3.5,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(
            theme.palette.secondary.main,
            0.08
          )} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ maxWidth: 640 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <AutoAwesomeOutlinedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: '0.08em' }}>
                Executive Command Center
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 1 }}>
              TVSD Enterprise Platform
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              Connected to PostgreSQL database <strong>tvsd</strong>. Managing active workforce, security permissions, and dynamic layout/theme switches without reloading.
            </Typography>
          </Box>

          {/* Engine State Badges */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(8px)',
                border: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <LayersOutlinedIcon sx={{ color: 'primary.main', fontSize: 22 }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                  Layout Engine
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                  {layout}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(8px)',
                border: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <PaletteOutlinedIcon sx={{ color: 'secondary.main', fontSize: 22 }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                  Theme Engine
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, textTransform: 'capitalize' }}>
                  {currentTheme.replace('-', ' ')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>

      {/* KPI Stats */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <AppStatsCard
            title="Total Workforce"
            value={users.length}
            subtitle="registered accounts"
            change={{ value: '+4', isPositive: true }}
            icon={<PeopleAltOutlinedIcon fontSize="small" />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppStatsCard
            title="Active Operators"
            value={activeUsersCount}
            subtitle="online & verified"
            change={{ value: '100%', isPositive: true }}
            icon={<SecurityOutlinedIcon fontSize="small" />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppStatsCard
            title="Database Connection"
            value="tvsd"
            subtitle="PostgreSQL 5432"
            change={{ value: 'Connected', isPositive: true }}
            icon={<StorageOutlinedIcon fontSize="small" />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppStatsCard
            title="Active Domain"
            value={industry.toUpperCase()}
            subtitle="configured preset"
            change={{ value: 'Multi-Tenant', isPositive: true }}
            icon={<AutoAwesomeOutlinedIcon fontSize="small" />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Business Domain Preset Switcher */}
      <AppCard
        title="Application Vertical / Domain Preset"
        subheader="Instantly configure platform behavior for ERP, CRM, Healthcare, or HRMS"
        sx={{ mb: 3.5 }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {[
            { id: 'erp', label: 'Enterprise ERP', desc: 'Financials, operations, logistics' },
            { id: 'crm', label: 'Client CRM', desc: 'Customer lifecycles, lead pipelines' },
            { id: 'healthcare', label: 'Healthcare & EHR', desc: 'Clinical records, patient rosters' },
            { id: 'hotel', label: 'Hospitality Suites', desc: 'Guest concierge, reservations' },
            { id: 'hrms', label: 'HRMS Workforce', desc: 'Personnel directory, payroll' },
            { id: 'inventory', label: 'Logistics Depot', desc: 'Supply chains, warehouse aisles' },
          ].map((item) => {
            const isSelected = industry === item.id;

            return (
              <Box
                key={item.id}
                onClick={() => setIndustry(item.id as any)}
                sx={{
                  flex: { xs: '1 1 100%', sm: '1 1 200px' },
                  p: 2,
                  borderRadius: 2.5,
                  cursor: 'pointer',
                  border: `2px solid ${
                    isSelected ? theme.palette.primary.main : theme.palette.divider
                  }`,
                  backgroundColor: isSelected
                    ? alpha(theme.palette.primary.main, 0.08)
                    : 'transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: isSelected ? 'primary.main' : 'text.primary' }}>
                    {item.label}
                  </Typography>
                  {isSelected && <Chip label="Active" size="small" color="primary" sx={{ height: 18, fontSize: '0.65rem' }} />}
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {item.desc}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </AppCard>

      {/* Workforce Directory Preview */}
      <AppCard
        title="Enterprise Workforce Directory"
        subheader="Manage enterprise access, roles, and status"
        action={
          <Link href="/users" style={{ textDecoration: 'none' }}>
            <AppButton variant="outlined" size="small" endIcon={<ArrowForwardOutlinedIcon fontSize="small" />}>
              Open Full CRUD Manager
            </AppButton>
          </Link>
        }
        noPadding
      >
        <AppTable
          columns={[
            {
              id: 'name',
              label: 'Employee Name',
              minWidth: 220,
              render: (row) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar src={row.avatar} sx={{ width: 34, height: 34 }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {row.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                      {row.email}
                    </Typography>
                  </Box>
                </Box>
              ),
            },
            { id: 'department', label: 'Department', minWidth: 150 },
            {
              id: 'role',
              label: 'Role',
              minWidth: 140,
              render: (row) => (
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {row.role}
                </Typography>
              ),
            },
            {
              id: 'status',
              label: 'Status',
              render: (row) => <AppStatusBadge status={row.status} />,
            },
          ]}
          data={users.slice(0, 5)}
        />
      </AppCard>
    </Box>
  );
}
