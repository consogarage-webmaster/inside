import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET;
import { generateToken } from '../utils/auth.js';
import {User, Permissions} from '../models/associations.js';
import argon2 from 'argon2';


const authenticationController = {
    

    submitLogin: async (req, res) => {
        const { email, password } = req.body;
        // console.log('foundUser', foundUser.password)
        try {
            // Find the user by email and include associated permissions
            const foundUser = await User.findOne({
                where: { email },
                include: [{ model: Permissions, as: 'permissions' }] // Assuming you have this association
            });
    
            if (foundUser) {
                
                // Verify the password against the hashed password stored in the database
                const passwordMatch = await argon2.verify(foundUser.password, password);
    
                if (passwordMatch) {
                    // Store user info in the session (including permissions)
                    req.session.user = {
                        id: foundUser.id,
                        name: foundUser.name,
                        email: foundUser.email,
                        permissions: foundUser.permissions.map(p => p.name)
                    };
                    // TODO maybe also send JWTtoken 
                    // const token = jwt.sign({ id: foundUser.id, name: user.foundUser,  permissions: foundUser.permissions.map(p => p.name)}, secretKey, { expiresIn: '1h' });
                    res.redirect('/');
                } else {
                    // Password did not match
                    res.render('login', { message: "Invalid password" });
                }
            } else {
                // User not found
                res.render('login', { message: "User not found" });
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).send('Internal Server Error');
        }
    },    
    logOut: (req,res) =>{
        req.session.user = null;
        res.redirect('/');
    }
};

export default authenticationController;

