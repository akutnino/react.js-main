import { useEffect, useRef, type ChangeEvent, type Dispatch } from 'react';
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

	// useEffect(() => {
	// 	const handleKeydown = (event: KeyboardEvent) => {
	// 		if (document.activeElement === inputElement.current) return;

	// 		if (event.code === 'Enter') {
	// 			inputElement.current?.focus();
	// 			setQuery('');
	// 		}
	// 	};

	// 	document.addEventListener('keydown', handleKeydown);

	// 	return () => {
	// 		document.removeEventListener('keydown', handleKeydown);
	// 	};
	// }, [setQuery]);

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
