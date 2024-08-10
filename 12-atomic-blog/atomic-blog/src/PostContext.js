import { createContext, useContext, useState } from 'react';
import { faker } from '@faker-js/faker';

const createRandomPost = () => {
	return {
		title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
		body: faker.hacker.phrase(),
	};
};

const lazyLoadedPosts = (length) => Array.from(Array(length), () => createRandomPost()); // returns an Array of Objects.

const PostContext = createContext();

function PostProvider(props) {
	const { children } = props;
	const [posts, setPosts] = useState(lazyLoadedPosts(30));
	const [searchQuery, setSearchQuery] = useState('');

	const filteredPosts = posts.filter((postObject) => {
		const titleStringsArray = postObject.title.toLowerCase().split(' ');
		const bodyStringsArray = postObject.body.toLowerCase().split(' ');
		const postContentsArray = [...titleStringsArray, ...bodyStringsArray];

		return postContentsArray.includes(searchQuery.toLowerCase());
	});

	const searchedPosts = searchQuery.length > 0 ? filteredPosts : posts;

	return (
		<PostContext.Provider
			value={{
				posts: searchedPosts,
				setPosts,
				searchQuery,
				setSearchQuery,
			}}
		>
			{children}
		</PostContext.Provider>
	);
}

function usePost() {
	const context = useContext(PostContext);
	const errorMessage = 'PostContext was used outside of the PostProvider';

	if (context === undefined) throw new Error(errorMessage);
	return context;
}

export { PostProvider, usePost, lazyLoadedPosts };
