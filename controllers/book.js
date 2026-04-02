const Book = require('../models/book');
const fs = require('fs'); 

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);

    delete bookObject._id; // On supprime l'id envoyé par le client, on va en créer un nouveau avec MongoDB
    delete bookObject._userId; // On supprime l'userId envoyé par le client, on va le récupérer du token

    const book = new Book({
        ...bookObject,
        userId: req.auth.userId, // On associe le livre à l'utilisateur authentifié
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '' 
    });
    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré avec succès !' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(400).json({ error }));
};

exports.getBestBooks = (req, res, next) => {
    Book.find()
        .sort({ averageRating: -1 })
        .limit(3)
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => res.status(200).json(book))
        .catch((error) => res.status(404).json({ error }));
}

exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject._userId;
    
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId !== req.auth.userId) {
                res.status(403).json({ message: 'Non autorisé' });
            }
            if (req.file && book.imageUrl) {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) console.log("Erreur suppression ancienne image :", err);
                });
            }
            Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Livre modifié avec succès !' }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId !== req.auth.userId) {
                res.status(403).json({ message: 'Non autorisé' });
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    if (err) console.log("Erreur suppression image :", err);
                    
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Livre supprimé avec succès !' }))
                        .catch((error) => res.status(400).json({ error }));
                });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.createRating = (req, res, next) => {
    if (req.body.rating < 0 || req.body.rating > 5) {
        return res.status(400).json({ message: 'La note doit être comprise entre 0 et 5' });
    }

    const ratingObject = {
        userId: req.auth.userId,
        grade: req.body.rating
    };

    Book.findOne({ _id: req.params.id })
        .then(book => {
            // On vérifie si l'utilisateur a déjà noté ce livre
            const userAlreadyRated = book.ratings.find(r => r.userId === req.auth.userId);
            if (userAlreadyRated) {
                return res.status(400).json({ message: 'Livre déjà noté' });
            }
            // On ajoute la nouvelle note au tableau
            book.ratings.push(ratingObject);

            // On recalcule la moyenne (somme de toutes les notes / Nombre de notes)
            const totalRatings = book.ratings.length;
            const sumOfRates = book.ratings.reduce((sum, rating) => sum + rating.grade, 0);
            book.averageRating = parseFloat((sumOfRates / totalRatings).toFixed(1)); // On arrondit à 1 décimale

            // On sauvegarde le livre mis à jour
            return book.save();
        })
        .then(updatedBook => res.status(200).json(updatedBook)) 
        .catch(error => res.status(500).json({ error }));
};
