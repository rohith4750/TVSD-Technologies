const { Client } = require('pg');

async function setup() {
  console.log('--- TVSD Database Setup & Verification ---');
  
  // 1. First, connect to default 'postgres' database to check/create 'tvsd' database
  const serverConfig = {
    user: 'postgres',
    password: 'new password',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
  };

  let client = new Client(serverConfig);
  try {
    console.log('Connecting to PostgreSQL server at localhost:5432 (default DB "postgres")...');
    await client.connect();
    console.log('Connected successfully to PostgreSQL server!');

    // Check if database 'tvsd' exists
    const checkDbRes = await client.query("SELECT 1 FROM pg_database WHERE datname = 'tvsd'");
    if (checkDbRes.rows.length === 0) {
      console.log('Database "tvsd" does not exist yet. Creating database "tvsd"...');
      await client.query('CREATE DATABASE tvsd;');
      console.log('Database "tvsd" created successfully!');
    } else {
      console.log('Database "tvsd" already exists.');
    }
  } catch (err) {
    console.error('Error connecting to postgres database:', err.message);
    if (err.code === '28P01') {
      console.error('Authentication failed: Invalid password for user "postgres".');
    } else if (err.code === 'ECONNREFUSED') {
      console.error('Connection refused: Is PostgreSQL service running on localhost:5432?');
    }
    await client.end().catch(() => {});
    process.exit(1);
  } finally {
    await client.end().catch(() => {});
  }

  // 2. Now connect to 'tvsd' database directly
  const tvsdClient = new Client({
    user: 'postgres',
    password: 'new password',
    host: 'localhost',
    port: 5432,
    database: 'tvsd',
  });

  try {
    console.log('Connecting to database "tvsd"...');
    await tvsdClient.connect();
    console.log('Connected to database "tvsd"!');

    // Create users table
    console.log('Creating table "users" if not exists...');
    await tvsdClient.query(`
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
    console.log('Table "users" created successfully or already exists!');

    // Check count and list tables
    const tablesRes = await tvsdClient.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `);
    console.log('Existing tables in "tvsd":', tablesRes.rows.map(r => r.table_name));

    // Seed users
    const usersToInsert = [
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
        lastLogin: new Date().toISOString(),
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
        lastLogin: new Date().toISOString(),
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
        lastLogin: new Date().toISOString(),
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
        lastLogin: new Date().toISOString(),
        createdAt: '2024-03-01T08:15:00Z',
      },
    ];

    console.log('Inserting / Updating users...');
    for (const u of usersToInsert) {
      await tvsdClient.query(`
        INSERT INTO users (id, name, email, password, role, status, department, phone, avatar, last_login, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (email) DO UPDATE 
        SET password = EXCLUDED.password,
            role = EXCLUDED.role,
            status = EXCLUDED.status,
            name = EXCLUDED.name;
      `, [
        u.id, u.name, u.email, u.password, u.role, u.status, u.department, u.phone, u.avatar, u.lastLogin, u.createdAt
      ]);
    }

    const countRes = await tvsdClient.query('SELECT COUNT(*) FROM users');
    console.log(`Total users in table "users": ${countRes.rows[0].count}`);

    const usersList = await tvsdClient.query('SELECT id, name, email, role, status FROM users');
    console.table(usersList.rows);
    console.log('✅ Database setup completed successfully!');
  } catch (err) {
    console.error('Error during database operation:', err);
  } finally {
    await tvsdClient.end().catch(() => {});
  }
}

setup();
