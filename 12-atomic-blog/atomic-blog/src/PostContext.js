import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';

const createRandomPost = () => {
	return {
		title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
		body: faker.hacker.phrase(),
	};
};

const PostContext = createContext();

function PostProvider(props) {
	const { children } = props;

	const lazyLoadedPosts = useCallback((length) => {
		return Array.from(Array(length), () => createRandomPost());
	}, []);

	const [posts, setPosts] = useState(lazyLoadedPosts(30));
	const [searchQuery, setSearchQuery] = useState('');

	const filteredPosts = posts.filter((postObject) => {
		const titleStringsArray = postObject.title.toLowerCase().split(' ');
		const bodyStringsArray = postObject.body.toLowerCase().split(' ');
		const postContentsArray = [...titleStringsArray, ...bodyStringsArray];

		return postContentsArray.includes(searchQuery.toLowerCase());
	});

	const searchedPosts = searchQuery.length > 0 ? filteredPosts : posts;

	const value = useMemo(() => {
		return {
			posts: searchedPosts,
			setPosts,
			searchQuery,
			setSearchQuery,
			lazyLoadedPosts,
		};
	}, [searchedPosts, searchQuery, lazyLoadedPosts]);

	return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

function usePost() {
	const context = useContext(PostContext);
	const errorMessage = 'PostContext was used outside of the PostProvider';

	if (context === undefined) throw new Error(errorMessage);
	return context;
}

export { PostProvider, usePost };
