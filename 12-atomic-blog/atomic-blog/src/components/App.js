import { createContext, useEffect, useState } from 'react';
import { createRandomPost } from '../functions/createRandomPost.js';

import Footer from './Footer.js';
import Archive from './Archive.js';
import Main from './Main.js';
import Header from './Header.js';

export const PostContext = createContext();

function App() {
	const [posts, setPosts] = useState(() =>
		Array(30)
			.fill(null)
			.map(() => createRandomPost())
	);
	const [searchQuery, setSearchQuery] = useState('');
	const [isFakeDark, setIsFakeDark] = useState(false);
	const filteredPosts = posts.filter((post) =>
		`${post.title} ${post.body}`.toLowerCase().includes(searchQuery.toLowerCase())
	);
	const searchedPosts = searchQuery.length > 0 ? filteredPosts : posts;

	const handleDarkModeToggle = () => {
		setIsFakeDark((isFakeDark) => !isFakeDark);
	};

	// Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
	useEffect(
		function () {
			document.documentElement.classList.toggle('fake-dark-mode');
		},
		[isFakeDark]
	);

	return (
		<PostContext.Provider
			value={{
				posts: searchedPosts,
				setPosts,
				searchQuery,
				setSearchQuery,
			}}
		>
			<section>
				<button
					onClick={handleDarkModeToggle}
					className='btn-fake-dark-mode'
				>
					{isFakeDark ? '☀️' : '🌙'}
				</button>

				<Header />
				<Main />
				<Archive />
				<Footer />
			</section>
		</PostContext.Provider>
	);
}

export default App;
