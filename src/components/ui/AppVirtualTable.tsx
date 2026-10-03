'use client';

import React, { useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { AppInput } from './AppInput';
import SearchIcon from '@mui/icons-material/Search';

export interface VirtualColumn<T> {
  id: string;
  label: string;
  width?: number | string;
  render: (row: T) => React.ReactNode;
}

export interface AppVirtualTableProps<T> {
  columns: VirtualColumn<T>[];
  data: T[];
  rowHeight?: number;
  height?: number;
  searchableKey?: keyof T;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
}

export function AppVirtualTable<T extends { id: string | number }>({
  columns,
  data,
  rowHeight = 52,
  height = 540,
  searchableKey,
  searchPlaceholder = 'Search in virtualized rows...',
  actions,
}: AppVirtualTableProps<T>) {
  const theme = useTheme();
  const parentRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');

  const filteredData = React.useMemo(() => {
    if (!search || !searchableKey) return data;
    const term = search.toLowerCase();
    return data.filter((item) => {
      const val = item[searchableKey];
      return String(val).toLowerCase().includes(term);
    });
  }, [data, search, searchableKey]);

  const rowVirtualizer = useVirtualizer({
    count: filteredData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 10,
  });

  return (
    <Box sx={{ width: '100%' }}>
      {/* Search and Action Bar */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {searchableKey && (
            <Box sx={{ width: 280 }}>
              <AppInput
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                startIcon={<SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
              />
            </Box>
          )}
          <Box
            sx={{
              px: 1.25,
              py: 0.5,
              borderRadius: 1.5,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: 'primary.main',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            ⚡ Virtualized: {filteredData.length.toLocaleString()} rows (60fps)
          </Box>
        </Box>
        {actions && <Box>{actions}</Box>}
      </Box>

      {/* Header Row */}
      <Box
        sx={{
          display: 'flex',
          backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#f1f5f9',
          borderBottom: `1px solid ${theme.palette.divider}`,
          px: 2,
          py: 1.5,
          fontWeight: 600,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'text.secondary',
        }}
      >
        {columns.map((col) => (
          <Box
            key={col.id}
            sx={{
              flex: typeof col.width === 'number' ? `0 0 ${col.width}px` : col.width || 1,
              px: 1,
            }}
          >
            {col.label}
          </Box>
        ))}
      </Box>

      {/* Virtual Scroll Window */}
      <div
        ref={parentRef}
        style={{
          height: `${height}px`,
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = filteredData[virtualRow.index];
            if (!row) return null;

            return (
              <Box
                key={row.id}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  transition: 'background-color 0.1s ease',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                  },
                }}
              >
                {columns.map((col) => (
                  <Box
                    key={col.id}
                    sx={{
                      flex: typeof col.width === 'number' ? `0 0 ${col.width}px` : col.width || 1,
                      px: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontSize: '0.84375rem',
                    }}
                  >
                    {col.render(row)}
                  </Box>
                ))}
              </Box>
            );
          })}
        </div>
      </div>
    </Box>
  );
}
