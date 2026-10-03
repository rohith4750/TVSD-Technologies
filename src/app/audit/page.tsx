'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useQuery } from '@tanstack/react-query';
import { auditService } from '@/api/api';
import { AuditLogRecord } from '@/types';
import {
  AppBreadcrumbs,
  AppCard,
  AppStatusBadge,
  AppVirtualTable,
  VirtualColumn
} from '@/components/ui';

export default function AuditPage() {
  const { data: logs = [] } = useQuery({
    queryKey: ['auditLogs'],
    queryFn: auditService.getVirtualLogs,
  });

  const columns: VirtualColumn<AuditLogRecord>[] = [
    {
      id: 'timestamp',
      label: 'Timestamp',
      width: 170,
      render: (row) => new Date(row.timestamp).toLocaleString(),
    },
    {
      id: 'actor',
      label: 'Actor & IP',
      width: 220,
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {row.actor}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {row.ipAddress}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'action',
      label: 'Event Type',
      width: 190,
      render: (row) => (
        <Chip
          label={row.action}
          size="small"
          sx={{ fontFamily: 'monospace', fontSize: '0.72rem', fontWeight: 600 }}
        />
      ),
    },
    {
      id: 'module',
      label: 'Module',
      width: 110,
      render: (row) => (
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>
          {row.module}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'Outcome',
      width: 120,
      render: (row) => <AppStatusBadge status={row.status} />,
    },
    {
      id: 'details',
      label: 'Security & Audit Trace',
      width: '100%',
      render: (row) => (
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
          {row.details}
        </Typography>
      ),
    },
  ];

  return (
    <Box className="fade-in">
      <AppBreadcrumbs
        items={[
          { label: 'Security & Compliance', path: '/audit' },
          { label: 'Virtualized Audit Vault', active: true },
        ]}
      />

      <AppCard
        title="Virtualized Enterprise Audit Logs"
        subheader="High-performance TanStack Virtual viewport rendering 2,500+ records at 60 FPS without DOM bloat"
        noPadding
      >
        <AppVirtualTable
          columns={columns}
          data={logs}
          searchableKey="actor"
          searchPlaceholder="Search audit events by actor name..."
          height={580}
        />
      </AppCard>
    </Box>
  );
}
