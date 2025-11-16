import { useState, type ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import type { Dispatch } from 'redux';
import { createCustomer } from '../stores/actions/customerActions.ts';

function CreateCustomer() {
	const [fullName, setFullName] = useState<string>('');
	const [nationalId, setNationalId] = useState<string>('');
	const dispatch: Dispatch = useDispatch();

	const handleFullNameInput = (event: ChangeEvent<HTMLInputElement>) => {
		setFullName(event.target.value);
	};

	const handleIDInput = (event: ChangeEvent<HTMLInputElement>) => {
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
						onChange={handleIDInput}
					/>
				</div>
				<button
					type='button'
					onClick={handleCreateCustomer}
				>
					Create new customer
				</button>
			</div>
		</div>
	);
}

export default CreateCustomer;
