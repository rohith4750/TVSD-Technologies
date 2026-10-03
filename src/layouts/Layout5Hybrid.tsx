'use client';

import React from 'react';
import { HybridNav } from '@/components/navigation/HybridNav';

interface LayoutProps {
  onOpenPreferences: () => void;
  children: React.ReactNode;
}

export const Layout5Hybrid: React.FC<LayoutProps> = ({
  onOpenPreferences,
  children,
}) => {
  return (
    <HybridNav onOpenPreferences={onOpenPreferences}>
      {children}
    </HybridNav>
  );
};
