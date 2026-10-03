import { Pool, QueryResult } from 'pg';
import { UserRecord } from '@/types';

// PostgreSQL Database Connection Config for "tvsd"
const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:new%20password@localhost:5432/tvsd?schema=public';

export const pool = new Pool({
  connectionString,
  // Connection timeout of 2.5s for fast fallback if local db server is offline
  connectionTimeoutMillis: 2500,
});

// Seed data with default users
export const INITIAL_DB_USERS: (UserRecord & { password: string })[] = [
  {
    id: 'usr-rohith-01',
    name: 'Rohith Telidevara',
    email: 'rohithtelidevara@gmail.com',
    password: 'Rohith@143',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    department: 'Executive Leadership',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    lastLogin: '2026-10-03T18:30:00Z',
    createdAt: '2024-01-01T08:00:00Z',
  },
  {
    id: 'usr-001',
    name: 'Alexander Wright',
    email: 'alex.wright@tvsd.io',
    password: 'new password',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    department: 'Executive Board',
    phone: '+1 (555) 234-8901',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    lastLogin: '2026-10-03T18:20:00Z',
    createdAt: '2024-01-15T09:00:00Z',
  },
  {
    id: 'usr-002',
    name: 'Sarah Chen, MD',
    email: 'sarah.chen@tvsd.io',
    password: 'new password',
    role: 'ADMIN',
    status: 'ACTIVE',
    department: 'Clinical Operations',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    lastLogin: '2026-10-03T17:15:00Z',
    createdAt: '2024-02-10T11:30:00Z',
  },
  {
    id: 'usr-003',
    name: 'Marcus Vance',
    email: 'marcus.v@tvsd.io',
    password: 'new password',
    role: 'MANAGER',
    status: 'ACTIVE',
    department: 'Global Supply Chain',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    lastLogin: '2026-10-02T14:40:00Z',
    createdAt: '2024-03-01T08:15:00Z',
  },
  {
    id: 'usr-004',
    name: 'Elena Rostova',
    email: 'elena.r@tvsd.io',
    password: 'new password',
    role: 'OPERATOR',
    status: 'ACTIVE',
    department: 'Logistics Dispatch',
    phone: '+1 (555) 567-8901',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    lastLogin: '2026-10-03T09:30:00Z',
    createdAt: '2024-04-12T14:00:00Z',
  },
  {
    id: 'usr-005',
    name: 'David Kim',
    email: 'david.kim@tvsd.io',
    password: 'new password',
    role: 'VIEWER',
    status: 'ACTIVE',
    department: 'Finance & Compliance',
    phone: '+1 (555) 678-9012',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    lastLogin: '2026-10-01T16:22:00Z',
    createdAt: '2024-05-20T10:45:00Z',
  },
];

// Fallback in-memory database mirror to guarantee 100% uptime
let memoryUsers = [...INITIAL_DB_USERS];
let isDbInitialized = false;

/**
 * Initializes database schema and runs seed migration if table does not exist
 */
export async function initializeDatabase(): Promise<boolean> {
  if (isDbInitialized) return true;

  try {
    const client = await pool.connect();
    try {
      // 1. Create users table
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50) NOT NULL,
          status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
          department VARCHAR(255),
          phone VARCHAR(50),
          avatar VARCHAR(500),
          last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // 2. Check if users table is populated
      const countRes = await client.query('SELECT COUNT(*) FROM users;');
      const count = parseInt(countRes.rows[0].count, 10);

      if (count === 0) {
        // Seed users
        for (const u of INITIAL_DB_USERS) {
          await client.query(
            `INSERT INTO users (id, name, email, password, role, status, department, phone, avatar, last_login, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
             ON CONFLICT (email) DO NOTHING;`,
            [
              u.id,
              u.name,
              u.email,
              u.password,
              u.role,
              u.status,
              u.department,
              u.phone,
              u.avatar,
              u.lastLogin,
              u.createdAt,
            ]
          );
        }
      }

      isDbInitialized = true;
      return true;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('[TVSD Database] PostgreSQL connection error:', (err as Error).message);
    return false;
  }
}

/**
 * User Repository methods with PostgreSQL execution & fault-tolerant fallback
 */
export const db = {
  // Query all users
  async getAllUsers(): Promise<UserRecord[]> {
    await initializeDatabase();
    try {
      const res = await pool.query<any>(
        'SELECT id, name, email, role, status, department, phone, avatar, last_login as "lastLogin", created_at as "createdAt" FROM users ORDER BY created_at DESC;'
      );
      return res.rows;
    } catch {
      return memoryUsers.map(({ password, ...u }) => u);
    }
  },

  // Find user by email (for authentication)
  async getUserByEmail(email: string): Promise<(UserRecord & { password: string }) | null> {
    await initializeDatabase();
    try {
      const res = await pool.query<any>(
        'SELECT id, name, email, password, role, status, department, phone, avatar, last_login as "lastLogin", created_at as "createdAt" FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1;',
        [email.trim()]
      );
      return res.rows[0] || null;
    } catch {
      const found = memoryUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      return found || null;
    }
  },

  // Find user by ID
  async getUserById(id: string): Promise<UserRecord | null> {
    await initializeDatabase();
    try {
      const res = await pool.query<any>(
        'SELECT id, name, email, role, status, department, phone, avatar, last_login as "lastLogin", created_at as "createdAt" FROM users WHERE id = $1 LIMIT 1;',
        [id]
      );
      return res.rows[0] || null;
    } catch {
      const found = memoryUsers.find((u) => u.id === id);
      if (!found) return null;
      const { password, ...u } = found;
      return u;
    }
  },

  // Create user
  async createUser(user: Omit<UserRecord, 'id' | 'createdAt' | 'lastLogin'> & { password?: string }): Promise<UserRecord> {
    await initializeDatabase();
    const id = `usr-${Date.now().toString().slice(-4)}`;
    const now = new Date().toISOString();
    const pass = user.password || 'new password';

    try {
      const res = await pool.query<any>(
        `INSERT INTO users (id, name, email, password, role, status, department, phone, avatar, last_login, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         RETURNING id, name, email, role, status, department, phone, avatar, last_login as "lastLogin", created_at as "createdAt";`,
        [
          id,
          user.name,
          user.email,
          pass,
          user.role,
          user.status,
          user.department,
          user.phone,
          user.avatar || '',
          now,
          now,
        ]
      );
      return res.rows[0];
    } catch {
      const newUser = {
        ...user,
        id,
        password: pass,
        lastLogin: now,
        createdAt: now,
      };
      memoryUsers = [newUser, ...memoryUsers];
      const { password, ...u } = newUser;
      return u;
    }
  },

  // Update user
  async updateUser(id: string, updates: Partial<UserRecord>): Promise<UserRecord | null> {
    await initializeDatabase();
    try {
      const fields: string[] = [];
      const values: any[] = [];
      let idx = 1;

      if (updates.name) { fields.push(`name = $${idx++}`); values.push(updates.name); }
      if (updates.email) { fields.push(`email = $${idx++}`); values.push(updates.email); }
      if (updates.role) { fields.push(`role = $${idx++}`); values.push(updates.role); }
      if (updates.status) { fields.push(`status = $${idx++}`); values.push(updates.status); }
      if (updates.department) { fields.push(`department = $${idx++}`); values.push(updates.department); }
      if (updates.phone) { fields.push(`phone = $${idx++}`); values.push(updates.phone); }
      if (updates.avatar) { fields.push(`avatar = $${idx++}`); values.push(updates.avatar); }

      if (fields.length > 0) {
        values.push(id);
        const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, name, email, role, status, department, phone, avatar, last_login as "lastLogin", created_at as "createdAt";`;
        const res = await pool.query(query, values);
        return res.rows[0] || null;
      }
      return await this.getUserById(id);
    } catch {
      memoryUsers = memoryUsers.map((u) => (u.id === id ? { ...u, ...updates } : u));
      return await this.getUserById(id);
    }
  },

  // Update last login
  async updateLastLogin(id: string): Promise<void> {
    const now = new Date().toISOString();
    try {
      await pool.query('UPDATE users SET last_login = $1 WHERE id = $2;', [now, id]);
    } catch {
      memoryUsers = memoryUsers.map((u) => (u.id === id ? { ...u, lastLogin: now } : u));
    }
  },

  // Delete user
  async deleteUser(id: string): Promise<boolean> {
    await initializeDatabase();
    try {
      await pool.query('DELETE FROM users WHERE id = $1;', [id]);
      return true;
    } catch {
      memoryUsers = memoryUsers.filter((u) => u.id !== id);
      return true;
    }
  },
};
