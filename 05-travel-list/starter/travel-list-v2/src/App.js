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

	const handlePacked = (id) => {
		return (event) =>
			setItemsArray((currentState) =>
				currentState.map((element) =>
					element.id === id ? { ...element, packed: !element.packed } : element
				)
			);
	};

	const handleClearList = () => {
		const confirmed = window.confirm('Are you sure to clear list?');
		if (confirmed) setItemsArray([]);
	};

	return (
		<div className='app'>
			<Logo />
			<Form onAddItem={handleAddItem} />
			<PackingList
				itemsArray={itemsArray}
				onDelete={handleDelete}
				onPacked={handlePacked}
				onClearList={handleClearList}
			/>
			<Stats itemsArray={itemsArray} />
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
	const { itemsArray, onDelete, onPacked, onClearList } = props;
	const [sortedBy, setSortedBy] = useState('input');
	let sortedItems;

	if (sortedBy === 'input') sortedItems = itemsArray;
	if (sortedBy === 'description')
		sortedItems = itemsArray.toSorted((a, b) =>
			a.description > b.description ? -1 : 1
		);
	if (sortedBy === 'packed')
		sortedItems = itemsArray.toSorted(
			(a, b) => Number(a.packed) - Number(b.packed)
		);

	const handleSelect = (event) => {
		const targetValue = event.target.value;
		setSortedBy(targetValue);
	};

	return (
		<div className='list'>
			<ul>
				{sortedItems.map((item) => (
					<PackingItem
						onPacked={onPacked}
						onClick={onDelete}
						itemObject={item}
						key={item.id}
					/>
				))}
			</ul>

			<div className='actions'>
				<select
					onChange={handleSelect}
					value={sortedBy}
				>
					<option value='input'>Sort by Input Order</option>
					<option value='description'>Sort by Description</option>
					<option value='packed'>Sort by Packed Status</option>
				</select>

				<button onClick={onClearList}>Clear List</button>
			</div>
		</div>
	);
}

function PackingItem(props) {
	const { itemObject, onClick, onPacked } = props;
	const { id, description, quantity, packed } = itemObject;
	const packedStyle = { textDecoration: 'line-through' };

	return (
		<li>
			<input
				type='checkbox'
				value={packed}
				onChange={onPacked(id)}
			/>
			<span style={packed ? packedStyle : {}}>
				{quantity} {description}
			</span>
			<button onClick={onClick(id)}>❌</button>
		</li>
	);
}

function Stats(props) {
	const { itemsArray } = props;
	const totalLength = itemsArray.length;
	const totalPackedItems = itemsArray.reduce(
		(acc, curr) => (curr.packed ? (acc += 1) : (acc += 0)),
		0
	);
	const packedItemsPercentage = Number(
		((totalPackedItems / totalLength) * 100).toFixed()
	);

	// prettier-ignore
	return (
		<footer className='stats'>
			<em>
				{totalLength === 0 ? `Start Packin` : null}
				{packedItemsPercentage === 100 ? `Let's Go!` : null}
				{totalLength > 0 && packedItemsPercentage < 100
					? `👜 You have ${totalLength} items on your list, and you already packed 
						${totalPackedItems} (${packedItemsPercentage ? packedItemsPercentage : 0}%)`
					: null}
			</em>
		</footer>
	);
}
