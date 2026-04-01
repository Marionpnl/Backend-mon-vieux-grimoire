const Book = require('../models/book');

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);

    delete bookObject._id; // On supprime l'id envoyé par le client, on va en créer un nouveau avec MongoDB
    delete bookObject._userId; // On supprime l'userId envoyé par le client, on va le récupérer du token

    const book = new Book({
        ...bookObject,
        userId: req.auth.userId, // On associe le livre à l'utilisateur authentifié
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '' // Si une image a été uploadée, on construit son URL, sinon on laisse vide
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

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => res.status(200).json(book))
        .catch((error) => res.status(404).json({ error }));
}

exports.modifyBook = (req, res, next) => {
    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre modifié avec succès !' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
    Book.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre supprimé avec succès !' }))
        .catch((error) => res.status(400).json({ error }));
}