const path = require('path');
const dbPath = path.resolve(__dirname, 'db/database.sqlite');

const knex = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: dbPath,
	},
	useNullAsDefault: true,
});

knex.schema
	.hasTable('books')
	.then((exists) => {
		if (!exists) {
			return knex.schema
				.createTable('books', (table) => {
					table.increments('id').primary();
					table.integer('author');
					table.string('title');
					table.string('pubDate');
					table.integer('rating');
				})
				.then(() => {
					console.log("Table 'books' created");
				})
				.catch((e) => {
					console.log(`There was an error creating table: ${e}`);
				});
		}
	})
	.then(() => {
		console.log('done');
	})
	.catch((e) => {
		console.log(`There was an error setting up the database: ${e}`);
	});

knex.select('*')
	.from('books')
	.then((data) => console.log(`books: ${data}`))
	.catch((e) => console.log(`error selecting from books: ${e}`));

module.exports = knex;
