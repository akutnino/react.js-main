import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCustomer } from './customerSlice';

function Customer() {
	const [fullName, setFullName] = useState('');
	const [nationalId, setNationalId] = useState('');
	const dispatch = useDispatch();

	const handleFullNameInput = (event) => {
		setFullName(event.target.value);
	};

	const handleNationalIdInput = (event) => {
		setNationalId(event.target.value);
	};

	const handleCreateCustomer = () => {
		if (!fullName || !nationalId) return;
		dispatch(createCustomer(fullName, nationalId));
	};

	return (
		<div>
			<h2>Create new customer</h2>
			<div className='inputs'>
				<div>
					<label>Customer full name</label>
					<input
						value={fullName}
						onChange={handleFullNameInput}
					/>
				</div>
				<div>
					<label>National ID</label>
					<input
						value={nationalId}
						onChange={handleNationalIdInput}
					/>
				</div>
				<button onClick={handleCreateCustomer}>Create new customer</button>
			</div>
		</div>
	);
}

export default Customer;
