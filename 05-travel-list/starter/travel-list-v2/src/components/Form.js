import { useState } from 'react';

export default function Form(props) {
	const { onAddItem } = props;
	const [quantity, setQuantity] = useState(Number(1));
	const [description, setDescription] = useState('');

	const handleSelect = (event) => {
		const targetValue = event.target.value;
		setQuantity(Number(targetValue));
	};

	const handleInput = (event) => {
		const targetValue = event.target.value;
		setDescription(targetValue);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!description) return;

		const newItem = {
			id: Date.now(),
			description,
			quantity,
			packed: false
		};

		console.log(newItem);
		onAddItem(newItem);
		setQuantity(Number(1));
		setDescription('');
	};

	return (
		<form
			className='add-form'
			onSubmit={handleSubmit}
		>
			<h3>What do you need for your 😍 trip?</h3>
			<select
				onChange={handleSelect}
				value={quantity}
			>
				{Array(10)
					.fill(0)
					.map((val, index) => (
						<option
							value={index + 1}
							key={index}
						>
							{index + 1}
						</option>
					))}
			</select>
			<input
				type='text'
				placeholder='Item...'
				onChange={handleInput}
				value={description}
			/>
			<button>Add</button>
		</form>
	);
}
