import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, type NavigateFunction } from 'react-router';
import { updatedUsername } from '../../../stores/actions/userActions.ts';
import type { AppDispatch } from '../../../types/stores/types.ts';

import Button from '../../common/Button.tsx';

function CreateUser() {
	const [username, setUsername] = useState<string>('');

	const dispatch: AppDispatch = useDispatch();
	const navigate: NavigateFunction = useNavigate();

	const handleUsernameInput = (event: ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (username === null) return;

		dispatch(updatedUsername(username));
		navigate('/menu');
		setUsername('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<p className='mb-4 text-sm text-stone-600 md:text-base'>
				👋 Welcome! Please start by telling us your name:
			</p>

			<input
				className='input mb-8 w-72'
				type='text'
				placeholder='Your full name'
				value={username}
				onChange={handleUsernameInput}
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
