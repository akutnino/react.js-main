import { type ChangeEvent, type FormEvent, Dispatch, useState } from 'react';
import { type ItemType } from './App.tsx';

function Form({ setItems }: { setItems: Dispatch<React.SetStateAction<ItemType[]>> }) {
	const [description, setDescription] = useState<string>('');
	const [quantity, setQuantity] = useState<number>(1);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!description) return;

		const newItem: ItemType = {
			id: Date.now(),
			description,
			quantity,
			packed: false,
		};

		console.log(newItem);

		setItems((currentItems) => [...currentItems, newItem]);
		setDescription('');
		setQuantity(1);
	};

	const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
		setDescription(event.target.value);
	};

	const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
		setQuantity(Number(event.target.value));
	};

	return (
		<form
			className='add-form'
			onSubmit={handleSubmit}
		>
			<h3>What do you need for your 😍 trip?</h3>
			<select
				value={quantity}
				onChange={handleSelect}
			>
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
			<button type='submit'>Add</button>
		</form>
	);
}

export default Form;
