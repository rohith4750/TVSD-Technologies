'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/api/api';
import { OrderRecord } from '@/types';
import { useNotificationStore } from '@/store';
import {
  AppBreadcrumbs,
  AppButton,
  AppCard,
  AppModal,
  AppStatusBadge,
  AppTable,
  Column
} from '@/components/ui';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function OrdersPage() {
  const queryClient = useQueryClient();
  const { showToast } = useNotificationStore();

  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [statusMenuAnchor, setStatusMenuAnchor] = useState<null | HTMLElement>(null);
  const [activeOrderForStatus, setActiveOrderForStatus] = useState<OrderRecord | null>(null);

  const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: orderService.getAll,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderRecord['fulfillmentStatus'] }) =>
      orderService.updateStatus(id, status),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      showToast({ type: 'success', message: `Order #${updated.orderNumber} marked as ${updated.fulfillmentStatus}` });
      setStatusMenuAnchor(null);
    },
  });

  const columns: Column<OrderRecord>[] = [
    {
      id: 'orderNumber',
      label: 'Order ID',
      minWidth: 160,
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
          {row.orderNumber}
        </Typography>
      ),
    },
    {
      id: 'customerName',
      label: 'Customer Entity',
      minWidth: 220,
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {row.customerName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {row.customerEmail}
          </Typography>
        </Box>
      ),
    },
    { id: 'itemsCount', label: 'Units', align: 'center', minWidth: 90 },
    {
      id: 'totalAmount',
      label: 'Invoice Total',
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
      id: 'actions',
      label: 'Update Status',
      align: 'right',
      render: (row) => (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <AppButton
            variant="soft"
            size="small"
            startIcon={<ChangeCircleOutlinedIcon />}
            onClick={(e) => {
              setActiveOrderForStatus(row);
              setStatusMenuAnchor(e.currentTarget);
            }}
          >
            Status
          </AppButton>
          <AppButton
            variant="outlined"
            size="small"
            startIcon={<InfoOutlinedIcon />}
            onClick={() => setSelectedOrder(row)}
          >
            Details
          </AppButton>
        </Box>
      ),
    },
  ];

  return (
    <Box className="fade-in">
      <AppBreadcrumbs
        items={[
          { label: 'Operations', path: '/orders' },
          { label: 'Orders & Dispatch', active: true },
        ]}
      />

      <AppCard
        title="Orders & Dispatch Pipeline"
        subheader="Track cross-facility shipments, customer procurement, and payment clearance"
        noPadding
      >
        <AppTable
          columns={columns}
          data={orders}
          searchableKey="customerName"
          searchPlaceholder="Search by customer name..."
        />
      </AppCard>

      {/* Fulfillment Status Menu */}
      <Menu
        anchorEl={statusMenuAnchor}
        open={Boolean(statusMenuAnchor)}
        onClose={() => setStatusMenuAnchor(null)}
      >
        {(['PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as const).map((st) => (
          <MenuItem
            key={st}
            onClick={() => {
              if (activeOrderForStatus) {
                updateStatusMutation.mutate({ id: activeOrderForStatus.id, status: st });
              }
            }}
            selected={activeOrderForStatus?.fulfillmentStatus === st}
          >
            {st}
          </MenuItem>
        ))}
      </Menu>

      {/* Order Details Modal */}
      {selectedOrder && (
        <AppModal
          open={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title={`Order Manifest #${selectedOrder.orderNumber}`}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'action.hover' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Customer Account
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                {selectedOrder.customerName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {selectedOrder.customerEmail}
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Items Quantity
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {selectedOrder.itemsCount} units
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Total Settlement
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, color: 'success.main' }}>
                  ${selectedOrder.totalAmount.toLocaleString()}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Payment Status
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <AppStatusBadge status={selectedOrder.paymentStatus} />
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Fulfillment Status
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <AppStatusBadge status={selectedOrder.fulfillmentStatus} />
                </Box>
              </Box>
            </Box>
          </Box>
        </AppModal>
      )}
    </Box>
  );
}
