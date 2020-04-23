const knex = require('./../db');

exports.booksAll = async (req, res) => {
	console.log('booksAll()');
	knex.select('*')
		.from('books')
		.then((userData) => {
			res.json(userData);
		})
		.catch((err) => {
			res.json({ message: `Error retrieving bookss: ${err}` });
		});
};

exports.booksOne = async (req, res) => {
	console.log(`booksOne(${req.params.bookId})`);
	knex.select('*')
		.from('books')
		.where('id', req.params.bookId)
		.then((userData) => {
			res.json(userData);
		})
		.catch((err) => {
			res.json({ message: `Error retrieving bookss: ${err}` });
		});
};

exports.booksCreate = async (req, res) => {
	knex('books')
		.insert({
			author: req.body.author,
			title: req.body.title,
			pubDate: req.body.pubDate,
			rating: req.body.rating,
		})
		.then(() => {
			res.json({ message: 'books row created successfully' });
		})
		.catch((err) => {
			res.json({ message: `Error inserting to table 'books': ${err}` });
		});
};

//TODO: add methods for remove & remove all
