import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
	const [userQuery, setUserQuery] = useState('');
	const navigate = useNavigate();

	const handleUserQuery = (event) => {
		setUserQuery(event.target.value);
	};

	const handleFormSumbit = (event) => {
		event.preventDefault();

		if (!userQuery) return;
		navigate(`/order/${userQuery}`);
		setUserQuery('');
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
