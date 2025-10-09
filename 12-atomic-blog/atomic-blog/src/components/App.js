import { useEffect, useState } from 'react';
import { PostProvider } from '../context/PostContext.js';

import Footer from './Footer.js';
import Archive from './Archive.js';
import Main from './Main.js';
import Header from './Header.js';

function App() {
	const [isFakeDark, setIsFakeDark] = useState(false);

	const handleDarkModeToggle = () => {
		setIsFakeDark((isFakeDark) => !isFakeDark);
	};

	// Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
	useEffect(() => {
		document.documentElement.classList.toggle('fake-dark-mode');
	}, [isFakeDark]);

	return (
		<section>
			<button
				onClick={handleDarkModeToggle}
				className='btn-fake-dark-mode'
			>
				{isFakeDark ? '☀️' : '🌙'}
			</button>

			<PostProvider>
				<Header />
				<Main />
				<Archive />
				<Footer />
			</PostProvider>
		</section>
	);
}

export default App;
