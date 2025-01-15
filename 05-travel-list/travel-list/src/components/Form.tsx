import { type ChangeEvent, type FormEvent, useState } from 'react';

function Form() {
	const [description, setDescription] = useState<string>('');

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
		setDescription(event.target.value);
	};

	return (
		<form
			className='add-form'
			onSubmit={handleSubmit}
		>
			<h3>What do you need for your 😍 trip?</h3>
			<select>
				{Array.from(Array(20), (_, index) => index + 1).map((value) => (
					<option
						value={value}
						key={value}
					>
						{value}
					</option>
				))}
			</select>
			<input
				type='text'
				placeholder='Item...'
				value={description}
				onChange={handleInput}
			/>
			<button type='button'>Add</button>
		</form>
	);
}

export default Form;
