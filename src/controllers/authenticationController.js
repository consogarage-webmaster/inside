import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET;
// import { generateToken } from '../utils/auth.js';
import {User, Permissions} from '../models/associations.js';
import argon2 from 'argon2';


const authenticationController = {
    

    submitLogin: async (req, res) => {
        const { email, password } = req.body;
        try {
            const foundUser = await User.findOne({
                where: { email },
                include: [{ model: Permissions, as: 'permissions' }]
            });
    
            if (foundUser) {
                
                // Verify the password against the hashed password stored in the database
                const passwordMatch = await argon2.verify(foundUser.password, password);
    
                if (passwordMatch) {
                    const userPayload = {
                        id: foundUser.id,
                        name: foundUser.name,
                        email: foundUser.email,
                        permissions: foundUser.permissions.map(p => p.name)
                    };
                    const token = jwt.sign(userPayload, jwtSecret, { expiresIn: '1h' });
                    req.session.user = userPayload;

                    // Store JWT in a secure cookie
                    res.cookie('jwtToken', token, {
                        httpOnly: true,  // Prevent access to the cookie via JavaScript
                        secure: process.env.NODE_ENV === 'production', // Send cookie only over HTTPS in production
                        maxAge: 3600000  // 1 hour expiry (same as the token expiry)
                    });

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
        res.clearCookie('jwtToken'); 
        res.redirect('/');
    },
    controlUserConnection: (req, res, next) => {
        const token = req.cookies.jwtToken;
        console.log("token" + token)
        if (!token) {
            return res.redirect('/login');
        }
        try {
            // Verify the JWT
            const decoded = jwt.verify(token, jwtSecret);
            req.user = decoded;
            res.locals.user = decoded;
            console.log(req.user);
            next();
        } catch (err) {
            console.error('Invalid or expired token');
            res.redirect('/login');
        }
    }
};

export default authenticationController;

