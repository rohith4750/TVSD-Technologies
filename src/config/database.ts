export const DATABASE_CONFIG = {
  database: process.env.DB_NAME || 'tvsd',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'new password',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://postgres:new%20password@localhost:5432/tvsd?schema=public',
};
