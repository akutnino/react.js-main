import { useContext } from 'react';
import { PostContext } from './App.js';

import Results from './Results.js';
import SearchPosts from './SearchPosts.js';

function Header() {
	const { setPosts } = useContext(PostContext);

	const handleClearPosts = () => {
		setPosts([]);
	};

	return (
		<header>
			<h1>
				<span>⚛️</span>The Atomic Blog
			</h1>
			<div>
				<Results />
				<SearchPosts />
				<button onClick={handleClearPosts}>Clear posts</button>
			</div>
		</header>
	);
}

export default Header;
