import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import '../styles/index.css';
// import App from './App.tsx';
import StarRating from './StarRating.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		{/* <App /> */}
		<StarRating maxRating={5} />
	</StrictMode>
);
