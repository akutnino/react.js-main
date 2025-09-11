import Results from './Results.js';
import SearchPosts from './SearchPosts.js';

function Header({ posts, setPosts, searchQuery, setSearchQuery }) {
	const handleClearPosts = () => {
		setPosts([]);
	};

	return (
		<header>
			<h1>
				<span>⚛️</span>The Atomic Blog
			</h1>
			<div>
				<Results posts={posts} />
				<SearchPosts
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
				<button onClick={handleClearPosts}>Clear posts</button>
			</div>
		</header>
	);
}

export default Header;
