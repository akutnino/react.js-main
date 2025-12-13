import { useState, type ChangeEvent, type FormEvent } from 'react';

function CreateUser() {
	const [username, setUsername] = useState<string>('');

	const handleUsernameInput = (event: ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit}>
			<p>👋 Welcome! Please start by telling us your name:</p>

			<input
				type='text'
				placeholder='Your full name'
				value={username}
				onChange={handleUsernameInput}
			/>

			{username !== '' && (
				<div>
					<button>Start ordering</button>
				</div>
			)}
		</form>
	);
}

export default CreateUser;
