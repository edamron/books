// based on https://medium.com/javascript-in-plain-english/how-to-build-an-app-with-react-express-and-sqlite-c2c24fc7ae3d

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';
import { Bookshelf } from './components/bookshelf';

const rootElement = document.getElementById('root');

ReactDOM.render(<Bookshelf />, rootElement);
