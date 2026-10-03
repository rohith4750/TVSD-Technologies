import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Box from '@mui/material/Box';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import { BreadcrumbItem } from '@/types';

export interface AppBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const AppBreadcrumbs: React.FC<AppBreadcrumbsProps> = ({ items }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
      aria-label="breadcrumb"
      sx={{ mb: 2.5 }}
    >
      <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Box
          component="span"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'text.secondary',
            cursor: 'pointer',
            fontSize: '0.8125rem',
            fontWeight: 500,
            '&:hover': { color: 'primary.main' },
          }}
        >
          <HomeIcon sx={{ fontSize: 16 }} />
          <span>Home</span>
        </Box>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return isLast || !item.path ? (
          <Typography
            key={item.label}
            variant="body2"
            sx={{
              color: 'text.primary',
              fontWeight: 600,
              fontSize: '0.8125rem',
            }}
          >
            {item.label}
          </Typography>
        ) : (
          <Link
            key={item.label}
            href={item.path}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: '0.8125rem',
                fontWeight: 500,
                '&:hover': { color: 'primary.main' },
              }}
            >
              {item.label}
            </Typography>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
