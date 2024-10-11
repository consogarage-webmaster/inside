import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/auth.js';

// You can move this secret key to an environment variable for better security
const JWT_SECRET = 'your_jwt_secret_key';

const authenticationController = {
    submitLogin: async (req, res) => {
        const { username, password } = req.body;
        const user = { id: 1, username: 'user', password: 'password' };


        // Validate credentials (replace with real validation logic)
        if (username === user.username && password === user.password) {
            const token = generateToken(user);
            return res.json({ token });
        }
    
        return res.status(401).json({ message: 'Invalid credentials.' });
    }
    
};

export default authenticationController;
