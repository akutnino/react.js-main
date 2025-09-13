import { usePosts } from '../context/PostContext.js';

function SearchPosts() {
	const { searchQuery, setSearchQuery } = usePosts();

	const handleSearchInput = (event) => {
		setSearchQuery(event.target.value);
	};

	return (
		<input
			value={searchQuery}
			onChange={handleSearchInput}
			placeholder='Search posts...'
		/>
	);
}

export default SearchPosts;
