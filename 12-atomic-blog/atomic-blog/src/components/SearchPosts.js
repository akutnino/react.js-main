import { useContext } from 'react';
import { PostContext } from './App.js';

function SearchPosts() {
	const { searchQuery, setSearchQuery } = useContext(PostContext);

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
