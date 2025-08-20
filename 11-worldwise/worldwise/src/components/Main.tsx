import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/Index.scss';

import App from '../components/App.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<App />
	</StrictMode>
);
