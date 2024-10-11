dotenv.config();

import express from 'express';
import dotenv from 'dotenv';
// import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './src/views');
app.set('view engine', 'ejs');


// Test de connexion à la base de données
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));
import User from './models/user.js';

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
  });

app.use(express.json());

app.get('/', (req, res) => {
  res.render('index.ejs');
});
app.post('/users', async (req, res) => {
    try {
      const { firstName, lastName, email } = req.body;
      const user = await User.create({ firstName, lastName, email });
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
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
