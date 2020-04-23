import React from 'react';
import { BookshelfListRow } from './bookshelf-list-row';

import './../styles/bookshelf-list.css';

interface BookUI {
	id: number;
	author: string;
	title: string;
	pubDate: string;
	rating: string;
}

interface BookshelfListUI {
	books: BookUI[];
	loading: boolean;
	handleBookRemove: (id: number, title: string) => void;
}

export const BookshelfList = (props: BookshelfListUI) => {
	if (props.loading) {
		return <p>Leaderboard table is loading...</p>;
	}

	return (
		<table className="table">
			<thead>
				<tr>
					<th className="table-head-item">ID</th>
					<th className="table-head-item">Title</th>
					<th className="table-head-item">Author</th>
					<th className="table-head-item">Pub. Date</th>
					<th className="table-head-item">Rating</th>
					<th className="table-head-item" />
				</tr>
			</thead>
			<tbody className="table-body">
				{props.books.length > 0 ? (
					props.books.map((book: BookUI, idx) => (
						<BookshelfListRow
							key={book.id}
							book={book}
							position={idx}
							handleBookRemove={props.handleBookRemove}
						/>
					))
				) : (
					<tr className="table-row">
						<td
							className="table-item"
							style={{ textAlign: 'center' }}
							colSpan={6}
						></td>
					</tr>
				)}
			</tbody>
		</table>
	);
};
