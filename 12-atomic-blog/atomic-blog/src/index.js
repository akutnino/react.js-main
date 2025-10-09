import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.css';
import App from './components/App-memo.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
