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

-- Create 'users' table if it doesn't exist
DO
$do$
BEGIN
   IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users') THEN
      CREATE TABLE users (
         id SERIAL PRIMARY KEY,  -- Serial automatically increments
         name TEXT NOT NULL,
         email TEXT UNIQUE NOT NULL,
         password TEXT NOT NULL
      );
   END IF;
END
$do$;

-- Create 'permissions' table if it doesn't exist
DO
$do$
BEGIN
   IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'permissions') THEN
      CREATE TABLE permissions (
         id SERIAL PRIMARY KEY,  -- Serial automatically increments
         name TEXT NOT NULL,
         user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      );
   END IF;
END
$do$;
