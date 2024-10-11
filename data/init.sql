DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'inside') THEN
      CREATE ROLE inside WITH LOGIN PASSWORD 'inside';
   END IF;

    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'inside') THEN
      CREATE DATABASE inside OWNER inside;
   END IF;
END
$do$;

-- Create the database if it doesn't exist
-- CREATE DATABASE inside OWNER inside;
