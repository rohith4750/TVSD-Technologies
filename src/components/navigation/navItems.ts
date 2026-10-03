export interface NavItemDef {
  id: string;
  title: string;
  path: string;
  badge?: string;
  badgeColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
}

export const MAIN_NAV_ITEMS: NavItemDef[] = [
  { id: 'dashboard', title: 'Dashboard', path: '/dashboard' },
  { id: 'users', title: 'User Management', path: '/users', badge: 'Active', badgeColor: 'primary' },
];
