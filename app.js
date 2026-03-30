const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://marionpenel3_db_user:marionpenel3_db_user@cluster0.mayejo1.mongodb.net/?appName=Cluster0')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.error('Erreur de connexion à MongoDB :', error));

app.use((req, res, next) => {
  res.json({ message: 'Votre serveur Express fonctionne !' });
});

module.exports = app;