import { UserRecord } from '@/types';

/**
 * Enterprise API Client for TVSD Platform
 * Direct communication with backend / Next.js API routes connected to PostgreSQL
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: UserRecord;
}

// 1. Authentication Service
export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Authentication failed');
    }

    // Persist token in safe storage
    if (typeof window !== 'undefined' && data.token) {
      localStorage.setItem('tvsd_auth_token', data.token);
    }

    return data;
  },

  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tvsd_auth_token');
    }
  },
};

// 2. User Service (CRUD with PostgreSQL Database)
export const userService = {
  async getAll(): Promise<UserRecord[]> {
    const res = await fetch('/api/users');
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to fetch users');
    }
    return data.data;
  },

  async getById(id: string): Promise<UserRecord> {
    const res = await fetch(`/api/users/${id}`);
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to fetch user');
    }
    return data.data;
  },

  async create(user: Omit<UserRecord, 'id' | 'createdAt' | 'lastLogin'>): Promise<UserRecord> {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to create user');
    }
    return data.data;
  },

  async update(id: string, updates: Partial<UserRecord>): Promise<UserRecord> {
    const res = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to update user');
    }
    return data.data;
  },

  async delete(id: string): Promise<boolean> {
    const res = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to delete user');
    }
    return true;
  },
};
