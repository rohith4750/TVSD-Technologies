'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { userService } from '@/api/api';
import { Role, UserRecord } from '@/types';
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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid work email required'),
  department: z.string().min(2, 'Department is required'),
  phone: z.string().min(6, 'Phone is required'),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'OPERATOR', 'VIEWER']),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
});

type UserFormData = z.infer<typeof userSchema>;

export default function UsersPage() {
  const queryClient = useQueryClient();
  const { showToast } = useNotificationStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [viewingUser, setViewingUser] = useState<UserRecord | null>(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      department: '',
      phone: '',
      role: 'OPERATOR',
      status: 'ACTIVE',
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: UserFormData) =>
      userService.create({
        ...data,
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showToast({ type: 'success', message: 'User created successfully' });
      handleCloseModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UserRecord> }) =>
      userService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showToast({ type: 'success', message: 'User updated successfully' });
      handleCloseModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: userService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showToast({ type: 'warning', message: 'User removed from system' });
    },
  });

  const handleOpenAdd = () => {
    setEditingUser(null);
    reset({
      name: '',
      email: '',
      department: '',
      phone: '',
      role: 'OPERATOR',
      status: 'ACTIVE',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (user: UserRecord) => {
    setEditingUser(user);
    reset({
      name: user.name,
      email: user.email,
      department: user.department,
      phone: user.phone,
      role: user.role,
      status: user.status,
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingUser(null);
  };

  const onSubmit = (data: UserFormData) => {
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const columns: Column<UserRecord>[] = [
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
    { id: 'phone', label: 'Phone', minWidth: 140 },
    {
      id: 'status',
      label: 'Status',
      render: (row) => <AppStatusBadge status={row.status} />,
    },
    {
      id: 'actions',
      label: 'Actions',
      align: 'right',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
          <IconButton size="small" onClick={() => setViewingUser(row)} sx={{ color: 'text.secondary' }}>
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => handleOpenEdit(row)} sx={{ color: 'text.secondary' }}>
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              if (confirm(`Delete user ${row.name}?`)) {
                deleteMutation.mutate(row.id);
              }
            }}
            sx={{ color: 'error.main' }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box className="fade-in">
      <AppBreadcrumbs
        items={[
          { label: 'Workforce', path: '/users' },
          { label: 'User Directory', active: true },
        ]}
      />

      <AppCard
        title="User Management"
        subheader="Manage enterprise access, roles, departments, and credentials"
        action={
          <AppButton startIcon={<AddIcon />} onClick={handleOpenAdd}>
            Add User
          </AppButton>
        }
        noPadding
      >
        <AppTable
          columns={columns}
          data={users}
          searchPlaceholder="Search employees by name..."
          searchableKey="name"
        />
      </AppCard>

      {/* Add / Edit Modal */}
      <AppModal
        open={modalOpen}
        onClose={handleCloseModal}
        title={editingUser ? 'Edit User Credentials' : 'Add New Enterprise User'}
        subtitle="Please provide employee credentials and permissions"
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <AppInput
            label="Full Name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <AppInput
            label="Work Email"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <AppInput
            label="Department"
            {...register('department')}
            error={!!errors.department}
            helperText={errors.department?.message}
          />
          <AppInput
            label="Phone"
            {...register('phone')}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />

          <AppSelect
            label="Role"
            defaultValue={editingUser ? editingUser.role : 'OPERATOR'}
            onChange={(e) => setValue('role', e.target.value as Role)}
            options={[
              { label: 'Super Admin', value: 'SUPER_ADMIN' },
              { label: 'Administrator', value: 'ADMIN' },
              { label: 'Operations Manager', value: 'MANAGER' },
              { label: 'Logistics Operator', value: 'OPERATOR' },
              { label: 'Compliance Viewer', value: 'VIEWER' },
            ]}
          />

          <AppSelect
            label="Status"
            defaultValue={editingUser ? editingUser.status : 'ACTIVE'}
            onChange={(e) => setValue('status', e.target.value as any)}
            options={[
              { label: 'Active', value: 'ACTIVE' },
              { label: 'Inactive', value: 'INACTIVE' },
              { label: 'Suspended', value: 'SUSPENDED' },
            ]}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 2 }}>
            <AppButton variant="outlined" onClick={handleCloseModal}>
              Cancel
            </AppButton>
            <AppButton
              type="submit"
              variant="contained"
              loading={createMutation.isPending || updateMutation.isPending}
            >
              {editingUser ? 'Save Changes' : 'Create User'}
            </AppButton>
          </Box>
        </Box>
      </AppModal>

      {/* View User Modal */}
      {viewingUser && (
        <AppModal
          open={!!viewingUser}
          onClose={() => setViewingUser(null)}
          title="User Profile Record"
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar src={viewingUser.avatar} sx={{ width: 64, height: 64 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {viewingUser.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {viewingUser.email}
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <AppStatusBadge status={viewingUser.status} />
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Department
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {viewingUser.department}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Role
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {viewingUser.role}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Phone
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {viewingUser.phone}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Member Since
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {new Date(viewingUser.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </AppModal>
      )}
    </Box>
  );
}
