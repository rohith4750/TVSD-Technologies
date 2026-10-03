'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import { alpha, useTheme } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { orderService, productService, userService } from '@/api/api';
import { usePreferencesStore } from '@/store';
import {
  AppBreadcrumbs,
  AppButton,
  AppCard,
  AppStatsCard,
  AppStatusBadge,
  AppTable
} from '@/components/ui';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Link from 'next/link';

export default function DashboardPage() {
  const theme = useTheme();
  const { layout, theme: currentTheme, industry, setIndustry } = usePreferencesStore();

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll,
  });

  const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: orderService.getAll,
  });

  const lowStockCount = products.filter((p) => p.status === 'LOW_STOCK' || p.status === 'OUT_OF_STOCK').length;
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'PAID')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <Box className="fade-in">
      {/* Breadcrumbs */}
      <AppBreadcrumbs items={[{ label: 'Executive Command Center', active: true }]} />

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
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ maxWidth: 640 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <AutoAwesomeOutlinedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: '0.08em' }}>
                Next.js Enterprise Monorepo Architecture
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 1 }}>
              Unified Business Engine
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              A single reusable foundation running multiple enterprise applications (ERP, CRM, Healthcare, Logistics, HRMS) with real-time dynamic layout and theme orchestration.
            </Typography>
          </Box>

          {/* Quick Engine Status Badges */}
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
                  Active Layout
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
                  Active Theme
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, textTransform: 'capitalize' }}>
                  {currentTheme.replace('-', ' ')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>

      {/* KPI Stats Grid */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <AppStatsCard
            title="Total Settled Revenue"
            value={`$${(totalRevenue / 1000).toFixed(1)}k`}
            subtitle="from paid orders"
            change={{ value: '18.4%', isPositive: true }}
            icon={<AttachMoneyIcon fontSize="small" />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppStatsCard
            title="Active Workforce"
            value={users.length}
            subtitle="enterprise accounts"
            change={{ value: '12 new', isPositive: true }}
            icon={<PeopleAltOutlinedIcon fontSize="small" />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppStatsCard
            title="Pending Orders"
            value={orders.filter((o) => o.fulfillmentStatus === 'PROCESSING').length}
            subtitle="in fulfillment queue"
            change={{ value: '4.2%', isPositive: true }}
            icon={<ShoppingCartOutlinedIcon fontSize="small" />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppStatsCard
            title="Stock Warnings"
            value={lowStockCount}
            subtitle="requires procurement"
            change={{ value: 'Critical', isPositive: false }}
            icon={<WarningAmberOutlinedIcon fontSize="small" />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Domain Preset Switcher Bar */}
      <AppCard
        title="Business Application Domain Preset"
        subheader="Switch business vertical on the fly without rewriting shared UI, layouts, or state"
        sx={{ mb: 3.5 }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {[
            { id: 'erp', label: 'Enterprise ERP', desc: 'Procurement, ledger, logistics' },
            { id: 'crm', label: 'Client CRM', desc: 'Leads, sales, contact velocity' },
            { id: 'healthcare', label: 'Healthcare & EHR', desc: 'Clinical telemetry, bed capacity' },
            { id: 'hotel', label: 'Hotel Management', desc: 'Suites, guest concierge, POS' },
            { id: 'hrms', label: 'HRMS Workforce', desc: 'Payroll, talent, leaves' },
            { id: 'inventory', label: 'Inventory Hub', desc: 'Depot aisles, stock tracking' },
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

      {/* Recent Orders Overview */}
      <AppCard
        title="Live Orders Pipeline"
        subheader="Real-time order statuses and customer fulfillment"
        action={
          <Link href="/orders" style={{ textDecoration: 'none' }}>
            <AppButton variant="outlined" size="small">
              View All Orders
            </AppButton>
          </Link>
        }
        noPadding
      >
        <AppTable
          columns={[
            { id: 'orderNumber', label: 'Order #', minWidth: 140 },
            { id: 'customerName', label: 'Customer', minWidth: 200 },
            {
              id: 'totalAmount',
              label: 'Amount',
              align: 'right',
              render: (row) => `$${row.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            },
            {
              id: 'paymentStatus',
              label: 'Payment',
              render: (row) => <AppStatusBadge status={row.paymentStatus} />,
            },
            {
              id: 'fulfillmentStatus',
              label: 'Fulfillment',
              render: (row) => <AppStatusBadge status={row.fulfillmentStatus} />,
            },
            {
              id: 'orderDate',
              label: 'Date',
              render: (row) => new Date(row.orderDate).toLocaleDateString(),
            },
          ]}
          data={orders.slice(0, 5)}
        />
      </AppCard>
    </Box>
  );
}
