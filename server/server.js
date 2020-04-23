// based on https://medium.com/javascript-in-plain-english/how-to-build-an-app-with-react-express-and-sqlite-c2c24fc7ae3d

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const booksRouter = require('./routes/books-router');

const PORT = process.env.PORT || 4001;

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', booksRouter);

// 500 error route
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('something is broken');
});

// 404 error route
app.use(function (req, res, next) {
	res.status(404).send('sorry, we could not find that');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
