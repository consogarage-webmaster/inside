import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/auth.js';

// You can move this secret key to an environment variable for better security
const JWT_SECRET = 'your_jwt_secret_key';

const userObject = {
    name:"username",
            permissions:{
                italDirection:false
            }
}

const authenticationController = {
    submitLogin: async (req, res) => {
        const { username, password } = req.body;
        console.log("user" + username);
        req.session.user = userObject;
        req.session.user.name = username;
        req.session.user.permissions.italDirection = true;
        res.redirect('/');
    },
    logOut: (req,res) =>{
        req.session.user = null;
        res.redirect('/');
    }
};

export default authenticationController;

