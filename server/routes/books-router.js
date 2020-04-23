const express = require('express');
const booksRoutes = require('../controllers/books-controller');

const router = express.Router();

router.get('/', (req, res) =>
	res.json({ message: 'Welcome to the books API!' }),
);
router.get('/books', booksRoutes.booksAll);
router.get('/books/:bookId', booksRoutes.booksOne);
router.post('/books', booksRoutes.booksCreate);

//TODO: add routes for /remove and /removeAll (whatever they're called)

module.exports = router;
