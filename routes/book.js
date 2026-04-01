const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 
const bookCtrl = require('../controllers/book');

router.post('/', auth, bookCtrl.createBook); // Privé (il faut être connecté)

router.get('/', bookCtrl.getAllBooks); // Public

router.get('/:id', bookCtrl.getOneBook); // Public

router.put('/:id', auth, bookCtrl.modifyBook); // Privé

router.delete('/:id', auth, bookCtrl.deleteBook); // Privé

module.exports = router;