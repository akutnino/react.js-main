import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';

function SearchOrder() {
	const [query, setQuery] = useState<string>('');
	const navigate: NavigateFunction = useNavigate();

	const handleInputNumber = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.currentTarget.value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!query) return;
		navigate(`order/${query}`, { replace: true });
		setQuery('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				id='search'
				placeholder={`Search Order Number`}
				onChange={handleInputNumber}
				value={query}
			/>
		</form>
	);
}

export default SearchOrder;
