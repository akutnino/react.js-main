import { type ChangeEvent, type Dispatch } from 'react';

function Search({
	query,
	setQuery,
}: {
	query: string;
	setQuery: Dispatch<React.SetStateAction<string>>;
}) {
	const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.currentTarget.value);
	};

	return (
		<input
			className='search'
			type='text'
			placeholder='Search movies...'
			value={query}
			onChange={handleQuery}
		/>
	);
}

export default Search;
