import { useEffect, useRef, type ChangeEvent, type Dispatch } from 'react';

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

	useEffect(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.code === 'Enter') {
				inputElement.current?.focus();
				setQuery('');
			}
		};

		if (document.activeElement === inputElement.current) return;
		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	}, [setQuery]);

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
