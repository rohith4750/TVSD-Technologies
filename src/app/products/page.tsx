'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { productService } from '@/api/api';
import { ProductRecord } from '@/types';
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
  AppVirtualTable,
  Column,
  VirtualColumn
} from '@/components/ui';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TableViewIcon from '@mui/icons-material/TableView';
import FlashOnIcon from '@mui/icons-material/FlashOn';

const productSchema = z.object({
  name: z.string().min(2, 'Product name required'),
  sku: z.string().min(3, 'SKU required'),
  category: z.string().min(2, 'Category required'),
  price: z.coerce.number().positive('Price must be positive'),
  costPrice: z.coerce.number().positive('Cost price must be positive'),
  stock: z.coerce.number().int().nonnegative('Stock cannot be negative'),
  minStockLevel: z.coerce.number().int().nonnegative('Min stock cannot be negative'),
  status: z.enum(['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK', 'DISCONTINUED']),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const { showToast } = useNotificationStore();

  const [isVirtualMode, setIsVirtualMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductRecord | null>(null);

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll,
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const createMutation = useMutation({
    mutationFn: (data: ProductFormData) =>
      productService.create({
        ...data,
        rating: 4.8,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      showToast({ type: 'success', message: 'Product added to catalog' });
      handleCloseModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProductRecord> }) =>
      productService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      showToast({ type: 'success', message: 'Product updated' });
      handleCloseModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      showToast({ type: 'warning', message: 'Product deleted' });
    },
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    reset({
      name: '',
      sku: '',
      category: 'Medical Devices',
      price: 199.99,
      costPrice: 99.99,
      stock: 50,
      minStockLevel: 10,
      status: 'IN_STOCK',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p: ProductRecord) => {
    setEditingProduct(p);
    reset({
      name: p.name,
      sku: p.sku,
      category: p.category,
      price: p.price,
      costPrice: p.costPrice,
      stock: p.stock,
      minStockLevel: p.minStockLevel,
      status: p.status,
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  const onSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const columns: Column<ProductRecord>[] = [
    {
      id: 'name',
      label: 'Product Title',
      minWidth: 240,
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {row.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
            SKU: {row.sku}
          </Typography>
        </Box>
      ),
    },
    { id: 'category', label: 'Category', minWidth: 160 },
    {
      id: 'price',
      label: 'Unit Price',
      align: 'right',
      render: (row) => `$${row.price.toFixed(2)}`,
    },
    {
      id: 'stock',
      label: 'In Stock',
      align: 'right',
      render: (row) => (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            color: row.stock <= row.minStockLevel ? 'error.main' : 'text.primary',
          }}
        >
          {row.stock} units
        </Typography>
      ),
    },
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
          <IconButton size="small" onClick={() => handleOpenEdit(row)} sx={{ color: 'text.secondary' }}>
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              if (confirm(`Delete product ${row.name}?`)) {
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

  const virtualColumns: VirtualColumn<ProductRecord>[] = [
    {
      id: 'name',
      label: 'Product & SKU',
      width: '35%',
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {row.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {row.sku}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'category',
      label: 'Category',
      width: '20%',
      render: (row) => row.category,
    },
    {
      id: 'price',
      label: 'Price',
      width: '15%',
      render: (row) => `$${row.price.toFixed(2)}`,
    },
    {
      id: 'stock',
      label: 'Stock',
      width: '15%',
      render: (row) => `${row.stock} units`,
    },
    {
      id: 'status',
      label: 'Status',
      width: '15%',
      render: (row) => <AppStatusBadge status={row.status} />,
    },
  ];

  return (
    <Box className="fade-in">
      <AppBreadcrumbs
        items={[
          { label: 'Catalog', path: '/products' },
          { label: 'Product Inventory', active: true },
        ]}
      />

      <AppCard
        title="Product Catalog & SKUs"
        subheader="Manage enterprise SKUs with standard and high-performance virtualized table modes"
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {/* View Mode Toggle */}
            <ButtonGroup size="small">
              <AppButton
                variant={!isVirtualMode ? 'contained' : 'outlined'}
                startIcon={<TableViewIcon />}
                onClick={() => setIsVirtualMode(false)}
              >
                Standard
              </AppButton>
              <AppButton
                variant={isVirtualMode ? 'contained' : 'outlined'}
                startIcon={<FlashOnIcon />}
                onClick={() => setIsVirtualMode(true)}
              >
                TanStack Virtual
              </AppButton>
            </ButtonGroup>

            <AppButton startIcon={<AddIcon />} onClick={handleOpenAdd}>
              New Product
            </AppButton>
          </Box>
        }
        noPadding
      >
        {isVirtualMode ? (
          <AppVirtualTable
            columns={virtualColumns}
            data={products}
            searchableKey="name"
            searchPlaceholder="Filter products in virtual viewport..."
          />
        ) : (
          <AppTable
            columns={columns}
            data={products}
            searchPlaceholder="Search products by title..."
            searchableKey="name"
          />
        )}
      </AppCard>

      {/* Modal */}
      <AppModal
        open={modalOpen}
        onClose={handleCloseModal}
        title={editingProduct ? 'Edit Product Item' : 'Create New Product SKU'}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <AppInput
            label="Product Title"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <AppInput
            label="SKU Identifier"
            {...register('sku')}
            error={!!errors.sku}
            helperText={errors.sku?.message}
          />
          <AppInput
            label="Category"
            {...register('category')}
            error={!!errors.category}
            helperText={errors.category?.message}
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <AppInput
              label="Selling Price ($)"
              type="number"
              step="0.01"
              {...register('price')}
              error={!!errors.price}
            />
            <AppInput
              label="Cost Price ($)"
              type="number"
              step="0.01"
              {...register('costPrice')}
              error={!!errors.costPrice}
            />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <AppInput
              label="Current Stock"
              type="number"
              {...register('stock')}
              error={!!errors.stock}
            />
            <AppInput
              label="Min Stock Level"
              type="number"
              {...register('minStockLevel')}
              error={!!errors.minStockLevel}
            />
          </Box>

          <AppSelect
            label="Stock Status"
            defaultValue={editingProduct ? editingProduct.status : 'IN_STOCK'}
            onChange={(e) => setValue('status', e.target.value as any)}
            options={[
              { label: 'In Stock', value: 'IN_STOCK' },
              { label: 'Low Stock', value: 'LOW_STOCK' },
              { label: 'Out of Stock', value: 'OUT_OF_STOCK' },
              { label: 'Discontinued', value: 'DISCONTINUED' },
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
              {editingProduct ? 'Save Product' : 'Add to Catalog'}
            </AppButton>
          </Box>
        </Box>
      </AppModal>
    </Box>
  );
}
