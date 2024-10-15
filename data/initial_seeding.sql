-- Begin transaction
BEGIN;

-- Insert user
INSERT INTO users (name, email, password)
VALUES ('webmaster consogarage', 'web@consogarage.com', 'consogarage31');

-- Insert permissions
INSERT INTO permissions (name)
VALUES ('superadmin'), ('ital-direction');

-- Assign 'superadmin' permission to the user
INSERT INTO users_permissions (id_user, id_permission)
SELECT u.id, p.id
FROM users u, permissions p
WHERE u.email = 'web@consogarage.com' AND p.name = 'superadmin';

-- Commit the transaction
COMMIT;
