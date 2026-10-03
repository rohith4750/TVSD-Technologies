'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { inventoryService } from '@/api/api';
import { InventoryRecord } from '@/types';
import { useNotificationStore } from '@/store';
import {
  AppBreadcrumbs,
  AppCard,
  AppStatusBadge,
  AppTable,
  Column
} from '@/components/ui';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function InventoryPage() {
  const queryClient = useQueryClient();
  const { showToast } = useNotificationStore();

  const { data: inventory = [] } = useQuery({
    queryKey: ['inventory'],
    queryFn: inventoryService.getAll,
  });

  const adjustStockMutation = useMutation({
    mutationFn: ({ id, delta }: { id: string; delta: number }) =>
      inventoryService.adjustStock(id, delta),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      showToast({
        type: 'info',
        message: `${updated.itemName} stock adjusted to ${updated.quantityOnHand}`,
      });
    },
  });

  const columns: Column<InventoryRecord>[] = [
    {
      id: 'itemName',
      label: 'Item SKU & Description',
      minWidth: 240,
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {row.itemName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
            Code: {row.itemCode}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'warehouseLocation',
      label: 'Warehouse & Bay',
      minWidth: 200,
      render: (row) => (
        <Box>
          <Typography variant="body2">{row.warehouseLocation}</Typography>
          <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>
            {row.aisle}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'quantityOnHand',
      label: 'On Hand',
      align: 'right',
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {row.quantityOnHand} {row.unit}
        </Typography>
      ),
    },
    {
      id: 'availableQuantity',
      label: 'Available',
      align: 'right',
      render: (row) => (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            color: row.availableQuantity <= row.reorderPoint ? 'error.main' : 'success.main',
          }}
        >
          {row.availableQuantity}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'Stock Health',
      render: (row) => <AppStatusBadge status={row.status} />,
    },
    {
      id: 'actions',
      label: 'Quick Adjust',
      align: 'right',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
          <Tooltip title="Decrement 10 units">
            <IconButton
              size="small"
              onClick={() => adjustStockMutation.mutate({ id: row.id, delta: -10 })}
              sx={{ color: 'error.main' }}
            >
              <RemoveCircleOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add 10 units">
            <IconButton
              size="small"
              onClick={() => adjustStockMutation.mutate({ id: row.id, delta: 10 })}
              sx={{ color: 'success.main' }}
            >
              <AddCircleOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box className="fade-in">
      <AppBreadcrumbs
        items={[
          { label: 'Logistics', path: '/inventory' },
          { label: 'Warehouse Stock', active: true },
        ]}
      />

      <AppCard
        title="Warehouse Inventory & Depots"
        subheader="Multi-facility real-time inventory ledger with aisle dispatch and reorder thresholds"
        noPadding
      >
        <AppTable
          columns={columns}
          data={inventory}
          searchableKey="itemName"
          searchPlaceholder="Search warehouse items..."
        />
      </AppCard>
    </Box>
  );
}
