'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { billingService } from '@/api/api';
import { InvoiceRecord } from '@/types';
import { useNotificationStore } from '@/store';
import {
  AppBreadcrumbs,
  AppButton,
  AppCard,
  AppInput,
  AppModal,
  AppStatusBadge,
  AppTable,
  Column
} from '@/components/ui';
import AddIcon from '@mui/icons-material/Add';

export default function BillingPage() {
  const queryClient = useQueryClient();
  const { showToast } = useNotificationStore();
  const [modalOpen, setModalOpen] = useState(false);

  const { data: invoices = [] } = useQuery({
    queryKey: ['invoices'],
    queryFn: billingService.getAll,
  });

  const { register, handleSubmit, reset } = useForm<any>();

  const createMutation = useMutation({
    mutationFn: (data: any) => {
      const subtotal = parseFloat(data.subtotal) || 0;
      const tax = subtotal * 0.1;
      return billingService.create({
        invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: data.dueDate,
        subtotal,
        tax,
        total: subtotal + tax,
        status: 'UNPAID',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      showToast({ type: 'success', message: 'Invoice generated' });
      setModalOpen(false);
    },
  });

  const columns: Column<InvoiceRecord>[] = [
    {
      id: 'invoiceNumber',
      label: 'Invoice #',
      minWidth: 160,
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
          {row.invoiceNumber}
        </Typography>
      ),
    },
    {
      id: 'clientName',
      label: 'Client / Account',
      minWidth: 220,
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {row.clientName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {row.clientEmail}
          </Typography>
        </Box>
      ),
    },
    { id: 'issueDate', label: 'Issue Date' },
    { id: 'dueDate', label: 'Due Date' },
    {
      id: 'total',
      label: 'Total Amount',
      align: 'right',
      render: (row) => `$${row.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
    },
    {
      id: 'status',
      label: 'Status',
      render: (row) => <AppStatusBadge status={row.status} />,
    },
  ];

  return (
    <Box className="fade-in">
      <AppBreadcrumbs
        items={[
          { label: 'Financials', path: '/billing' },
          { label: 'Invoices & Ledger', active: true },
        ]}
      />

      <AppCard
        title="Enterprise Invoices & Billing"
        subheader="Generate B2B receivables, track tax withholdings, and monitor payment cycles"
        action={
          <AppButton startIcon={<AddIcon />} onClick={() => setModalOpen(true)}>
            Create Invoice
          </AppButton>
        }
        noPadding
      >
        <AppTable
          columns={columns}
          data={invoices}
          searchableKey="clientName"
          searchPlaceholder="Search invoices by client..."
        />
      </AppCard>

      {/* Create Invoice Modal */}
      <AppModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Generate Enterprise Invoice"
      >
        <Box
          component="form"
          onSubmit={handleSubmit((d) => createMutation.mutate(d))}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}
        >
          <AppInput label="Client Name" {...register('clientName', { required: true })} />
          <AppInput label="Client Email" type="email" {...register('clientEmail', { required: true })} />
          <AppInput label="Subtotal ($)" type="number" step="0.01" {...register('subtotal', { required: true })} />
          <AppInput label="Due Date" type="date" InputLabelProps={{ shrink: true }} {...register('dueDate', { required: true })} />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 2 }}>
            <AppButton variant="outlined" onClick={() => setModalOpen(false)}>
              Cancel
            </AppButton>
            <AppButton type="submit" variant="contained" loading={createMutation.isPending}>
              Issue Invoice
            </AppButton>
          </Box>
        </Box>
      </AppModal>
    </Box>
  );
}
