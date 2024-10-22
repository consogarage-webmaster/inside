dotenv.config();

import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
// import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/db.js';
import authenticationController from './controllers/authenticationController.js';
import userController from './controllers/userController.js';
import adminController from './controllers/adminController.js';
// import userController from './controllers/userController.js';
// import adminController from './controllers/adminController.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import verifyToken from './middlewares/verifyToken.js';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'your_jwt_secret_key'; 
const app = express();
const PORT = process.env.PORT || 3000;
import {User} from './models/associations.js';
// import {User} from './models/associations.js';
import { authenticateToken, generateToken } from './utils/auth.js'
import customerController from './controllers/customerController.js';
import italExpressController from './controllers/italExpressController.js';
import verifySessionUser from './middlewares/verifySessionUser.js';

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded());

app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Test de connexion à la base de données
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// import verifyToken from './middlewares/verifyToken.js';
// sequelize.sync({ force: true })
//   .then(() => {
//     console.log('Database & tables created!');
//   });

app.use(express.json());

app.get('/', verifySessionUser, (req, res) => {
  res.render('index.ejs');
});
app.get('/login', (req, res) => {
  res.render('login.ejs');
});
app.post('/login', authenticationController.submitLogin);
app.get('/logout', authenticationController.logOut);
app.get('/signup', userController.signUpPage);
// Admin pages
app.get('/utilisateurs', adminController.usersPage);
app.post('/utilisateurs', userController.createUser);


// Ital Express pages
app.get('/ital-clients', customerController.italCustomers);
app.get('/devis', italExpressController.quotationsPage);

  
  app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
