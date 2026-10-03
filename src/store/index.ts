import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IndustryPreset, LayoutType, Role, ThemeType, User, UserPreferences, UserRecord } from '@/types';

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

// Auth Store (Persistent Session - NO hardcoded CURRENT_USER)
interface AuthState {
  user: UserRecord | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: UserRecord, token?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user: UserRecord, token?: string) => {
        if (typeof document !== 'undefined' && token) {
          document.cookie = `tvsd_auth_token=${token}; path=/; max-age=86400; SameSite=Lax`;
        }
        if (typeof window !== 'undefined' && token) {
          localStorage.setItem('tvsd_auth_token', token);
        }
        set({
          user,
          token: token || null,
          isAuthenticated: true,
        });
      },
      logout: () => {
        if (typeof document !== 'undefined') {
          document.cookie = 'tvsd_auth_token=; path=/; max-age=0; SameSite=Lax';
        }
        if (typeof window !== 'undefined') {
          localStorage.removeItem('tvsd_auth_token');
          localStorage.removeItem('tvsd_auth_session');
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'tvsd_auth_session',
    }
  )
);
