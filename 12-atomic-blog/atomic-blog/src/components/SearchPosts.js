function SearchPosts({ searchQuery, setSearchQuery }) {
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
