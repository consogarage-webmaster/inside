// src/index.js
import express from 'express';
import sequelize from './db.js';
import Affaire from './models/Affaire.js'; // Import du modèle Affaire

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser les JSON
app.use(express.json());

// Exemple de route
app.get('/', async (req, res) => {
  try {
    const affaires = await Affaire.findAll();
    res.json(affaires);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des affaires.' });
  }
});

// Démarrage du serveur
const startServer = async () => {
  try {
    // Connexion à la base de données
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie.');

    // Synchronisation des modèles
    await sequelize.sync({ alter: true });
    console.log('Les tables ont été synchronisées.');

    // Démarrage du serveur Express
    app.listen(PORT, () => {
      console.log(`Le serveur tourne sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur :', error);
  }
};

// Appel de la fonction pour démarrer le serveur
startServer();
