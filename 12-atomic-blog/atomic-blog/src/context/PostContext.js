import { createContext, useContext, useMemo, useState } from 'react';
import { createRandomPost } from '../functions/createRandomPost.js';

const PostContext = createContext();

function PostProvider({ children }) {
	const [posts, setPosts] = useState(() =>
		Array(30)
			.fill(null)
			.map(() => createRandomPost())
	);
	const [searchQuery, setSearchQuery] = useState('');

	const filteredPosts = posts.filter((post) =>
		`${post.title} ${post.body}`.toLowerCase().includes(searchQuery.toLowerCase())
	);
	const searchedPosts = searchQuery.length > 0 ? filteredPosts : posts;

	const contextValue = useMemo(() => {
		return {
			posts: searchedPosts,
			setPosts,
			searchQuery,
			setSearchQuery,
		};
	}, [searchedPosts, searchQuery]);

	return <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>;
}

function usePosts() {
	const context = useContext(PostContext);

	if (context === undefined) throw new Error('Outside of PostProvider scope.');
	return context;
}

export { PostProvider, usePosts };
