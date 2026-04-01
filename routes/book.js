const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 
const bookCtrl = require('../controllers/book');

router.get('/', bookCtrl.getAllBooks); // Public (tout le monde peut voir les livres)

router.post('/', auth, bookCtrl.createBook); // Privé (il faut être connecté)

router.get('/:id', bookCtrl.getOneBook); // Public

router.put('/:id', auth, bookCtrl.modifyBook); // Privé

router.delete('/:id', auth, bookCtrl.deleteBook); // Privé

module.exports = router;