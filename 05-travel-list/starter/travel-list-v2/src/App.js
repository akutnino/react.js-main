import { useState } from 'react';

// const initialItems = [
// 	{
// 		id: 1,
// 		description: 'Passports',
// 		quantity: 2,
// 		packed: false
// 	},
// 	{
// 		id: 2,
// 		description: 'Socks',
// 		quantity: 12,
// 		packed: true
// 	}
// ];

export default function App(props) {
	const [itemsArray, setItemsArray] = useState([]);

	const handleAddItem = (newItem) => {
		setItemsArray((currentState) => [...currentState, newItem]);
	};

	const handleDelete = (id) => {
		return (event) =>
			setItemsArray((currentState) =>
				currentState.filter((element) => (element.id === id ? false : true))
			);
	};

	return (
		<div className='app'>
			<Logo />
			<Form onAddItem={handleAddItem} />
			<PackingList
				itemsArray={itemsArray}
				onDelete={handleDelete}
			/>
			<Stats />
		</div>
	);
}

function Logo(props) {
	return <h1>🌴 Far Away 👜</h1>;
}

function Form(props) {
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
			></input>
			<button>Add</button>
		</form>
	);
}

function PackingList(props) {
	const { itemsArray, onDelete } = props;

	return (
		<div className='list'>
			<ul>
				{itemsArray.map((item) => (
					<PackingItem
						onClick={onDelete}
						itemObject={item}
						key={item.id}
					/>
				))}
			</ul>
		</div>
	);
}

function PackingItem(props) {
	const { itemObject, onClick } = props;
	const { id, description, quantity, packed } = itemObject;
	const packedStyle = { textDecoration: 'line-through' };

	return (
		<li>
			<span style={packed ? packedStyle : {}}>
				{quantity} {description}
			</span>
			<button onClick={onClick(id)}>❌</button>
		</li>
	);
}

function Stats(props) {
	return (
		<footer className='stats'>
			<em>👜 You have X items on your list, and you already packed x (X%)</em>
		</footer>
	);
}
