import { useState } from 'react';

function SearchOrder() {
	const [userQuery, setUserQuery] = useState('');

	const handleUserQuery = (event) => {
		setUserQuery(event.target.value);
	};

	const handleFormSumbit = (event) => {
		event.preventDefault();
	};

	return (
		<form onSubmit={handleFormSumbit}>
			<input
				type='search'
				placeholder='Search Order #'
				value={userQuery}
				onChange={handleUserQuery}
			/>
		</form>
	);
}

export default SearchOrder;
