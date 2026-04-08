# Mon Vieux Grimoire - Backend

Ce projet constitue le back-end du site de notation de livres "Mon Vieux Grimoire". Il a été réalisé dans le cadre de la formation Développeur Web d'OpenClassrooms.

## Technologies utilisées

* **Node.js** & **Express**
* **MongoDB Atlas** (Base de données NoSQL)
* **Mongoose** (Modélisation d'objets)
* **Multer** (Gestion des téléchargements de fichiers)
* **Sharp** (Optimisation et conversion des images en WebP)
* **JSON Web Token (JWT)** (Authentification sécurisée)


## Installation et Lancement

1. **Cloner le projet**
   ```Bash
   git clone git@github.com:Marionpnl/Backend-mon-vieux-grimoire.git
   cd Backend-mon-vieux-grimoire

2. **Installer les dépendances**
    ```Bash
    npm install

3. **Configurer les variables d'environnement**
<br>Créez un fichier **.env** à la racine du dossier et ajoutez les variables suivantes:
    ```Plaintext
    PORT=4000
    MONGO_URL=votre_lien_mongodb_atlas
    JWT_SECRET=votre_phrase_secrete

4. **Lancer le serveur**
    ```Bash
    # Mode développement (recommandé) : Utilise nodemon pour redémarrer le serveur à chaque modification
    npm run dev

    # Mode production : Lancement classique via Node.js
    npm start

## Fonctionnalités clés

* Inscription et connexion d'utilisateurs avec mot de passe haché.
* Ajout, modification et suppression de livres.
* Optimisation automatique des images lors de l'upload (redimensionnement et format WebP).
* Système de notation avec calcul automatique de la note moyenne.
* Récupération du "Top 3" des livres les mieux notés.

## Structure du projet

* **/controllers** : Logique métier des routes.
* **/models** : Schémas de données Mongoose.
* **/routes** : Définition des points d'entrée de l'API.
* **/middleware** : Authentification, configuration Multer et Sharp.
* **/images** : Stockage des fichiers images (optimisés).