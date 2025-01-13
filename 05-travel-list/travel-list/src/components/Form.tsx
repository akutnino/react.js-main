import { type FormEvent } from 'react';

function Form() {
	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
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
			/>
			<button type='button'>Add</button>
		</form>
	);
}

export default Form;
