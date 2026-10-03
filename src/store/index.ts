import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IndustryPreset, LayoutType, Role, ThemeType, User, UserPreferences } from '@/types';

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  userId: 'usr_enterprise_001',
  layout: 'layout1',
  theme: 'corporate-light',
  industry: 'erp',
  sidebarCollapsed: false,
  density: 'standard',
  notificationsEnabled: true,
  breadcrumbsVisible: true,
};

interface PreferencesState extends UserPreferences {
  setLayout: (layout: LayoutType) => void;
  setTheme: (theme: ThemeType) => void;
  setIndustry: (industry: IndustryPreset) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setDensity: (density: 'compact' | 'standard' | 'spacious') => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  resetPreferences: () => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...DEFAULT_USER_PREFERENCES,
      setLayout: (layout: LayoutType) => set({ layout }),
      setTheme: (theme: ThemeType) => set({ theme }),
      setIndustry: (industry: IndustryPreset) => set({ industry }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed: boolean) => set({ sidebarCollapsed: collapsed }),
      setDensity: (density) => set({ density }),
      setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled }),
      resetPreferences: () => set(DEFAULT_USER_PREFERENCES),
    }),
    {
      name: 'tvsd_user_preferences',
    }
  )
);

// Toast Notification Store
export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
}

interface NotificationState {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  toasts: [],
  showToast: (toast) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));

    const duration = toast.duration ?? 4000;
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, duration);
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

// Auth Store
export const CURRENT_USER: User = {
  id: 'usr_super_01',
  name: 'Alexander Wright',
  email: 'alex.wright@tvsd.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'SUPER_ADMIN',
  permissions: [
    'users.create',
    'users.read',
    'users.update',
    'users.delete',
    'products.create',
    'products.read',
    'products.update',
    'products.delete',
    'orders.create',
    'orders.read',
    'orders.update',
    'orders.delete',
    'inventory.manage',
    'billing.manage',
    'system.settings',
  ],
  department: 'Executive Office',
  status: 'ACTIVE',
  createdAt: '2024-01-15T08:00:00Z',
};

interface AuthState {
  user: User;
  token: string;
  isAuthenticated: boolean;
  switchRole: (role: Role) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: CURRENT_USER,
  token: 'jwt_mock_enterprise_token_2026',
  isAuthenticated: true,
  switchRole: (role: Role) =>
    set((state) => ({
      user: { ...state.user, role },
    })),
}));
