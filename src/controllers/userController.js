import { where } from "sequelize";
import { User, Permissions } from "../models/associations.js";
import argon2 from 'argon2'; // Import argon2 for password hashing

const userController = {
    // Display the sign-up page with available permissions
    signUpPage: async (req, res) => {
        try {
            const allPermissions = await Permissions.findAll();
            console.log('permissions:', allPermissions); 

            res.render('signUp.ejs', { permissions: allPermissions });
        } catch (error) {
            console.error('Error fetching permissions:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    // Create a new user with email and password
    createUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log('req' + JSON.stringify(req.body))

            // Basic validation
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            // Hash the password before saving it
            const hashedPassword = await argon2.hash(password);

            // Create the user in the database
            const user = await User.create({ email, password: hashedPassword });

            // Return the created user (excluding the password)
            res.status(201).json({ id: user.id, email: user.email });
        } catch (err) {
            console.error('Error creating user:', err);

            // Check if email is already in use (unique constraint)
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: 'Email already exists' });
            }

            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    deleteUser: async (req, res) => {
        const userId = req.params["id"];
        try {
            const result = await User.destroy({
                where: { id: userId }
            });
    
            if (result === 0) {
                // No user found with the given ID
                res.status(404).json({ error: 'User not found' });
            } else {
                res.status(200).json({ message: 'User deleted successfully' });
            }
        } catch (e) {
            console.error('Error deleting user:', e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export default userController;
