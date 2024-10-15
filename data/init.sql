-- Begin transaction
BEGIN;

-- Drop tables if they exist
DROP TABLE IF EXISTS users_permissions CASCADE;
DROP TABLE IF EXISTS permissions CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS leads_timeline CASCADE;
DROP TABLE IF EXISTS leads_quotations CASCADE;
DROP TABLE IF EXISTS leads CASCADE;

-- Create role and database if they don't exist
DO
$do$
BEGIN
   -- Check if role 'inside' exists, if not, create it
   IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'inside') THEN
      CREATE ROLE inside WITH LOGIN PASSWORD 'inside';
   END IF;

   -- Check if database 'inside' exists, if not, create it
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'inside') THEN
      CREATE DATABASE inside OWNER inside;
   END IF;
END
$do$;

-- Connect to the 'inside' database
\c inside;

-- Create 'users' table
CREATE TABLE IF NOT EXISTS users (
   id SERIAL PRIMARY KEY,  -- Serial automatically increments
   name TEXT NOT NULL,
   email TEXT UNIQUE NOT NULL,
   password TEXT NOT NULL
);

-- Create 'permissions' table
CREATE TABLE IF NOT EXISTS permissions (
   id SERIAL PRIMARY KEY,  -- Serial automatically increments
   name TEXT UNIQUE NOT NULL
);

-- Create 'users_permissions' table
CREATE TABLE IF NOT EXISTS users_permissions (
   id SERIAL PRIMARY KEY,  -- Serial automatically increments
   id_user INTEGER REFERENCES users(id) ON DELETE CASCADE,
   id_permission INTEGER REFERENCES permissions(id) ON DELETE CASCADE
);

-- Create 'leads' table
CREATE TABLE IF NOT EXISTS leads (
   id SERIAL PRIMARY KEY,  -- Serial automatically increments
   date_creation DATE DEFAULT CURRENT_DATE,
   date_update DATE DEFAULT CURRENT_DATE,
   origin INTEGER NULL,
   id_customer INTEGER NULL,
   email TEXT NOT NULL,
   firstname TEXT NULL,
   lastname TEXT NULL,
   code_ital TEXT NULL,
   company TEXT NULL,
   is_leasing BOOLEAN DEFAULT FALSE
);

-- Create 'leads_timeline' table
CREATE TABLE IF NOT EXISTS leads_timeline (
   id SERIAL PRIMARY KEY,  -- Serial automatically increments
   date_creation DATE DEFAULT CURRENT_DATE,
   date_update DATE DEFAULT CURRENT_DATE,
   id_lead INTEGER REFERENCES leads(id) ON DELETE CASCADE,
   content TEXT NOT NULL
);

-- Create 'leads_quotations' table
CREATE TABLE IF NOT EXISTS leads_quotations (
   id SERIAL PRIMARY KEY,  -- Serial automatically increments
   date_creation DATE DEFAULT CURRENT_DATE,
   date_update DATE DEFAULT CURRENT_DATE,
   id_lead INTEGER REFERENCES leads(id) ON DELETE CASCADE,
   quotation_reference TEXT NOT NULL
);

-- Commit the transaction
COMMIT;
