import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key'; // Make sure to keep this key secure and use environment variables in production

// Generate JWT Token
export const generateToken = (user) => {
    // Payload can include user data (e.g., id, username)
    const payload = {
        id: user.id,
        username: user.username,
    };

    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Middleware to verify JWT Token
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('auth'+req.headers['authorization'])
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer <token>
    // const token = authHeader;

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid.'+ req.headers['authorization'] });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }

        // Attach user data from token to the request object
        req.user = user;req.headers['authorization']
        next();
    });
};