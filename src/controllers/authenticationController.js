import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET;
// import { generateToken } from '../utils/auth.js';
import { User, Permissions, UsersItalSectors } from '../models/associations.js';
import argon2 from 'argon2';

const authenticationController = {
  submitLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const foundUser = await User.findOne({
        where: { email },
        include: [
          { model: Permissions, as: 'permissions' },
          { model: UsersItalSectors, as: 'italSectors' },
        ],
      });

      if (foundUser) {
        const passwordMatch = await argon2.verify(foundUser.password, password);

        if (passwordMatch) {
          const userPayload = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            permissions: foundUser.permissions.map(p => p.name),
            sector: foundUser.italSectors[0]?.id_group || null,
          };
          const token = jwt.sign(userPayload, jwtSecret, { expiresIn: '1h' });
          req.session.user = userPayload;

          res.cookie('jwtToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
          });

          res.redirect('/');
        } else {
          res.render('login', { message: 'Invalid password' });
        }
      } else {
        res.render('login', { message: 'User not found' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Internal Server Error');
    }
  },
  logOut: (req, res) => {
    req.session.user = null;
    res.clearCookie('jwtToken');
    res.redirect('/');
  },
  controlUserConnection: (req, res, next) => {
    const token = req.cookies.jwtToken;
    console.log('token' + token);
    if (!token) {
      return res.redirect('/login');
    }
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      res.locals.user = decoded;
      console.log(req.user);
      next();
    } catch (err) {
      console.error('Invalid or expired token');
      res.redirect('/login');
    }
  },
};

export default authenticationController;
