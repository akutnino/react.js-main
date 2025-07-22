import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/index.css';

import App from './App.tsx';

const SECRET_URL: string = 'http://localhost:8000/questions';

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<App secretURL={SECRET_URL} />
	</StrictMode>
);
