import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Create the root of the app using React 18's `createRoot`
const root = ReactDOM.createRoot(document.getElementById('root')!); // Use the non-null assertion operator

root.render(
    <App />
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
