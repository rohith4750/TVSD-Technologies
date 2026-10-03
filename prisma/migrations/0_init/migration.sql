-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'MANAGER', 'OPERATOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateTable users
CREATE TABLE IF NOT EXISTS "users" (
    "id" VARCHAR(255) NOT NULL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL DEFAULT 'new password',
    "role" VARCHAR(50) NOT NULL DEFAULT 'OPERATOR',
    "status" VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    "department" VARCHAR(255),
    "phone" VARCHAR(50),
    "avatar" VARCHAR(500),
    "last_login" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial users
INSERT INTO "users" ("id", "name", "email", "password", "role", "status", "department", "phone", "avatar")
VALUES
('usr-rohith-01', 'Rohith Telidevara', 'rohithtelidevara@gmail.com', 'Rohith@143', 'SUPER_ADMIN', 'ACTIVE', 'Executive Leadership', '+91 98765 43210', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'),
('usr-001', 'Alexander Wright', 'alex.wright@tvsd.io', 'new password', 'SUPER_ADMIN', 'ACTIVE', 'Executive Board', '+1 (555) 234-8901', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'),
('usr-002', 'Sarah Chen, MD', 'sarah.chen@tvsd.io', 'new password', 'ADMIN', 'ACTIVE', 'Clinical Operations', '+1 (555) 345-6789', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80'),
('usr-003', 'Marcus Vance', 'marcus.v@tvsd.io', 'new password', 'MANAGER', 'ACTIVE', 'Global Supply Chain', '+1 (555) 456-7890', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'),
('usr-004', 'Elena Rostova', 'elena.r@tvsd.io', 'new password', 'OPERATOR', 'ACTIVE', 'Logistics Dispatch', '+1 (555) 567-8901', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'),
('usr-005', 'David Kim', 'david.kim@tvsd.io', 'new password', 'VIEWER', 'ACTIVE', 'Finance & Compliance', '+1 (555) 678-9012', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80')
ON CONFLICT ("email") DO NOTHING;
