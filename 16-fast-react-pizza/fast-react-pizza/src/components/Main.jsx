import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './../styles/Main.scss';
import App from './App.jsx';
import store from '../stores/store.js';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
);
