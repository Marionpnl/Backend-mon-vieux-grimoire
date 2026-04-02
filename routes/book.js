const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 
const bookCtrl = require('../controllers/book');
const multer = require('../middleware/multer-config');
const sharp = require('../middleware/sharp-config');

router.post('/', auth, multer, sharp, bookCtrl.createBook); // Privé (il faut être connecté)

router.get('/', bookCtrl.getAllBooks); // Public

router.get('/bestrating', bookCtrl.getBestBooks); // Public

router.get('/:id', bookCtrl.getOneBook); // Public

router.put('/:id', auth, multer, sharp, bookCtrl.modifyBook); // Privé

router.delete('/:id', auth, bookCtrl.deleteBook); // Privé

router.post('/:id/rating', auth, bookCtrl.createRating); // Privé

module.exports = router;