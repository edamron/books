import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { BookshelfList } from './bookshelf-list';

import './../styles/bookshelf.css';

export const Bookshelf = () => {
	const [author, setAuthor] = useState('');
	const [title, setTitle] = useState('');
	const [pubDate, setPubDate] = useState('');
	const [rating, setRating] = useState('');
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchBooks = (): void => {
		const url = 'http://localhost:4001/api/books';
		setLoading(true);

		axios
			.get(url)
			.then((res) => {
				setBooks(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(`Error getting ${url}: ${err}`);
			});
	};

	useEffect(() => {
		fetchBooks();
	}, []);

	const handleInputsReset = (): void => {
		setAuthor('');
		setTitle('');
		setPubDate('');
		setRating('');
	};

	const handleBookCreate = (): void => {
		const url = 'http://localhost:4001/api/books';
		axios
			.post(url, {
				author: author,
				title: title,
				pubDate: pubDate,
				rating: rating,
			})
			.then((res) => {
				console.log(`POST to books successful: ${res.data}`);

				fetchBooks();
			})
			.catch((err) => {
				console.log(`Error postting '${url}': ${err}`);
			});
	};

	const handleBookSubmit = (): void => {
		if (
			author.length > 0 &&
			title.length > 0 &&
			pubDate.length > 0 &&
			rating.length > 0
		) {
			handleBookCreate();

			console.log(`${title} by ${author} added`);

			handleInputsReset();
		}
	};

	//TODO: add code to support 'remove' and 'reset' if desired

	return (
		<div className="book-list-wrapper">
			<div className="book-list-form">
				<div className="form-wrapper">
					<div className="form-row">
						<fieldset>
							<label htmlFor="title" className="form-label">
								Enter title:
							</label>
							<input
								id="title"
								type="text"
								className="form-input"
								value={title}
								onChange={(e) =>
									setTitle(e.currentTarget.value)
								}
							/>
						</fieldset>
						<fieldset>
							<label htmlFor="author" className="form-label">
								Enter author:
							</label>
							<input
								id="author"
								type="text"
								className="form-input"
								value={author}
								onChange={(e) =>
									setAuthor(e.currentTarget.value)
								}
							/>
						</fieldset>
					</div>
					<div className="form-row">
						<fieldset>
							<label htmlFor="pubDate" className="form-label">
								Enter pubDate:
							</label>
							<input
								id="pubDate"
								type="text"
								className="form-input"
								value={pubDate}
								onChange={(e) =>
									setPubDate(e.currentTarget.value)
								}
							/>
						</fieldset>
						<fieldset>
							<label htmlFor="rating" className="form-label">
								Enter rating:
							</label>
							<input
								id="rating"
								type="text"
								className="form-input"
								value={rating}
								onChange={(e) =>
									setRating(e.currentTarget.value)
								}
							/>
						</fieldset>
					</div>
					<button className="btn btn-add" onClick={handleBookSubmit}>
						Add the book
					</button>
				</div>
				<BookshelfList
					books={books}
					loading={loading}
					handleBookRemove={() => console.log('not implemented!')}
				/>
				{books.length > 0 && (
					<button
						className="btn btn-reset"
						onClick={() => console.log('not implemented')}
					>
						Reset book list
					</button>
				)}
			</div>
		</div>
	);
};
