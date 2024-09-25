import { useState } from 'react';
import Button from '../../interfaces/Button';

function CreateUser() {
	const [username, setUsername] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const handleUserInput = (event) => {
		setUsername(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<p className='mb-4 text-sm text-stone-600 md:text-base'>
				👋 Welcome! Please start by telling us your name:
			</p>

			<input
				type='text'
				placeholder='Your full name'
				value={username}
				onChange={handleUserInput}
				className='input mb-8 w-72'
			/>

			{username !== '' && (
				<div>
					<Button type='primary'>Start ordering</Button>
				</div>
			)}
		</form>
	);
}

export default CreateUser;
