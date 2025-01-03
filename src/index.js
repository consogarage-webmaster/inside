dotenv.config();

import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
// import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/db.js';
import authenticationController from './controllers/authenticationController.js'
import userController from './controllers/userController.js';
import adminController from './controllers/adminController.js';
import consogarageController from './controllers/consogarageController.js';
// import userController from './controllers/userController.js';
// import adminController from './controllers/adminController.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import verifyToken from './middlewares/verifyToken.js';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET; 
const app = express();
const PORT = process.env.PORT || 3000;
import {User} from './models/associations.js';
// import {User} from './models/associations.js';
import { authenticateToken, generateToken } from './utils/auth.js'
import customerController from './controllers/customerController.js';
import italExpressController from './controllers/italExpressController.js';
// import verifySessionUser from './middlewares/authMiddleware.js';

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// parsers
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser()); 

app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
// app.use((req, res, next) => {
//   res.locals.user = req.user || null;
//   next();
// });

// Test de connexion à la base de données
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Formateur de nombres
app.locals.formatNumber = (number) => {
  return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
  }).format(number);
};



app.get('/', authenticationController.controlUserConnection, (req, res) => {
  res.render('index.ejs');
});
app.get('/login', (req, res) => {
  res.render('login.ejs');
});
app.post('/login', authenticationController.submitLogin);
app.get('/logout', authenticationController.logOut);
app.get('/signup', userController.signUpPage);
// Admin pages
app.get('/utilisateurs',authenticationController.controlUserConnection, adminController.usersPage);
app.post('/utilisateurs', userController.createUser);
app.delete('/utilisateurs/:id', userController.deleteUser);

// Consogarage pages
app.get('/affaires', authenticationController.controlUserConnection, consogarageController.affairespage);

// Ital Express pages
app.get('/ital-clients', authenticationController.controlUserConnection, italExpressController.customersPage);
app.get('/devis', authenticationController.controlUserConnection, italExpressController.quotationsPage);
app.get('/prospects', authenticationController.controlUserConnection, italExpressController.propsectsPage);


// Errors
app.get('/*',authenticationController.controlUserConnection, (req,res)=>{
  res.render('error/404.ejs');
})
  
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
  console.log(`Server is running on port http://localhost:${PORT}`);
});
