export interface NavItemDef {
  id: string;
  title: string;
  path: string;
  badge?: string;
  badgeColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
}

export const MAIN_NAV_ITEMS: NavItemDef[] = [
  { id: 'dashboard', title: 'Dashboard', path: '/' },
  { id: 'users', title: 'Users', path: '/users', badge: '8', badgeColor: 'primary' },
  { id: 'products', title: 'Products', path: '/products', badge: 'Virtual', badgeColor: 'secondary' },
  { id: 'orders', title: 'Orders', path: '/orders', badge: 'New', badgeColor: 'success' },
  { id: 'customers', title: 'CRM & Clients', path: '/customers' },
  { id: 'inventory', title: 'Inventory', path: '/inventory', badge: 'Alerts', badgeColor: 'warning' },
  { id: 'billing', title: 'Invoices & Billing', path: '/billing' },
  { id: 'audit', title: 'Audit Logs', path: '/audit', badge: '2.5K', badgeColor: 'info' },
];
