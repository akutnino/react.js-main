import { useRef, type ChangeEvent, type Dispatch } from 'react';
import { useKey } from '../hooks/useKey.ts';

function Search({
	query,
	setQuery,
}: {
	query: string;
	setQuery: Dispatch<React.SetStateAction<string>>;
}) {
	const inputElement = useRef<HTMLInputElement>(null);

	const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.currentTarget.value);
	};

	useKey('Enter', () => {
		if (document.activeElement === inputElement.current) return;
		inputElement.current?.focus();
		setQuery('');
	});

	return (
		<input
			className='search'
			type='text'
			placeholder='Search movies...'
			value={query}
			onChange={handleQuery}
			ref={inputElement}
		/>
	);
}

export default Search;
