import { useState } from 'react';

function Search() {
	const [query, setQuery] = useState<string>('');

	return (
		<input
			className='search'
			type='text'
			placeholder='Search movies...'
			value={query}
			onChange={(e) => setQuery(e.target.value)}
		/>
	);
}

export default Search;
