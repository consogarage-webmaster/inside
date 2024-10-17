BEGIN;

-- Drop existing tables
DROP TABLE IF EXISTS users_permissions, leads_timeline, leads_quotations, leads, permissions, users CASCADE;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create permissions table
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- Create users_permissions table (many-to-many relationship between users and permissions)
CREATE TABLE users_permissions (
    id SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL,
    id_permission INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_permission) REFERENCES permissions(id) ON DELETE CASCADE
);

-- Create leads table
CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    origin INTEGER NOT NULL,
    id_customer INTEGER NOT NULL,
    email TEXT NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    code_ital TEXT,
    company TEXT,
    is_leasing BOOLEAN NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create leads_quotations table (one-to-many relationship with leads)
CREATE TABLE leads_quotations (
    id SERIAL PRIMARY KEY,
    id_lead INTEGER NOT NULL,
    quotation_reference TEXT NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_lead) REFERENCES leads(id) ON DELETE CASCADE
);

-- Create leads_timeline table (one-to-many relationship with leads)
CREATE TABLE leads_timeline (
    id SERIAL PRIMARY KEY,
    id_lead INTEGER NOT NULL,
    content TEXT NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_lead) REFERENCES leads(id) ON DELETE CASCADE
);

COMMIT;
