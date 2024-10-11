import jwt from 'jsonwebtoken';

// You can move this secret key to an environment variable for better security
const JWT_SECRET = 'your_jwt_secret_key';

const authenticationController = {
    submitLogin: async (req, res) => {
        const { username, password } = req.body; // Get username and password from request body

        // Dummy user credentials for demonstration purposes
        const dummyUser = {
            userId: 1,
            role: "italGeneral"
        };

        // Validate credentials (replace with actual validation logic)
        if (username) {
            // Create a JWT token
            const token = jwt.sign(dummyUser, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

            // Send the token as a JSON response
            return res.json({ token });
        }

        // If credentials are invalid, respond with an error
        return res.status(401).json({ message: 'Invalid username or password' });
    }
};

export default authenticationController;
