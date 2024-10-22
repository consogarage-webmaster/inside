import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key'; // Use the same secret key for signing

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
    // console.log("data : " + req.headers['authorization']);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        // Save decoded info to request object for use in other routes
        req.userId = decoded.userId;
        req.role = decoded.role;
        next(); // Call next middleware or route handler
    });
};

export default verifyToken;
