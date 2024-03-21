import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';
import { useState } from 'react';

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
