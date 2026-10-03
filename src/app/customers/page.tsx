'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { customerService } from '@/api/api';
import { CustomerRecord } from '@/types';
import { useNotificationStore } from '@/store';
import {
  AppBreadcrumbs,
  AppButton,
  AppCard,
  AppInput,
  AppModal,
  AppSelect,
  AppStatusBadge,
  AppTable,
  Column
} from '@/components/ui';
import AddIcon from '@mui/icons-material/Add';

export default function CustomersPage() {
  const queryClient = useQueryClient();
  const { showToast } = useNotificationStore();
  const [modalOpen, setModalOpen] = useState(false);

  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: customerService.getAll,
  });

  const { register, handleSubmit, reset, setValue } = useForm<any>();

  const createMutation = useMutation({
    mutationFn: (data: any) =>
      customerService.create({
        ...data,
        totalSpend: 0,
        ordersCount: 0,
        lastContactDate: new Date().toISOString().split('T')[0],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      showToast({ type: 'success', message: 'Client account added' });
      setModalOpen(false);
    },
  });

  const handleOpenAdd = () => {
    reset({
      name: '',
      company: '',
      email: '',
      phone: '',
      tier: 'ENTERPRISE',
      status: 'ACTIVE',
      assignedAgent: 'Alexander Wright',
    });
    setModalOpen(true);
  };

  const columns: Column<CustomerRecord>[] = [
    {
      id: 'name',
      label: 'Key Contact & Company',
      minWidth: 240,
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {row.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
            {row.company}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'tier',
      label: 'Client Tier',
      render: (row) => <AppStatusBadge status={row.tier} />,
    },
    {
      id: 'totalSpend',
      label: 'Lifetime Value',
      align: 'right',
      render: (row) => `$${row.totalSpend.toLocaleString()}`,
    },
    { id: 'ordersCount', label: 'Orders', align: 'center' },
    { id: 'assignedAgent', label: 'Relationship Lead' },
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
          { label: 'CRM', path: '/customers' },
          { label: 'Corporate Accounts', active: true },
        ]}
      />

      <AppCard
        title="Corporate Accounts & CRM"
        subheader="Client relationships, contract tiers, and enterprise pipeline management"
        action={
          <AppButton startIcon={<AddIcon />} onClick={handleOpenAdd}>
            New Account
          </AppButton>
        }
        noPadding
      >
        <AppTable
          columns={columns}
          data={customers}
          searchableKey="company"
          searchPlaceholder="Search by company or client name..."
        />
      </AppCard>

      {/* Add Client Modal */}
      <AppModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Corporate Client Account"
      >
        <Box
          component="form"
          onSubmit={handleSubmit((d) => createMutation.mutate(d))}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}
        >
          <AppInput label="Contact Name" {...register('name', { required: true })} />
          <AppInput label="Company Name" {...register('company', { required: true })} />
          <AppInput label="Email" type="email" {...register('email', { required: true })} />
          <AppInput label="Phone" {...register('phone', { required: true })} />
          <AppSelect
            label="Tier"
            defaultValue="ENTERPRISE"
            onChange={(e) => setValue('tier', e.target.value)}
            options={[
              { label: 'Enterprise', value: 'ENTERPRISE' },
              { label: 'Professional', value: 'PRO' },
              { label: 'Standard', value: 'STANDARD' },
              { label: 'Sales Lead', value: 'LEAD' },
            ]}
          />
          <AppInput label="Assigned Lead" {...register('assignedAgent')} defaultValue="Alexander Wright" />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 2 }}>
            <AppButton variant="outlined" onClick={() => setModalOpen(false)}>
              Cancel
            </AppButton>
            <AppButton type="submit" variant="contained" loading={createMutation.isPending}>
              Create Account
            </AppButton>
          </Box>
        </Box>
      </AppModal>
    </Box>
  );
}
