import { type SetStateAction, type Dispatch } from 'react';
import { type ItemType } from './App.tsx';

function PackingItem({
	item,
	setItems,
}: {
	item: ItemType;
	setItems: Dispatch<SetStateAction<ItemType[]>>;
}) {
	const { id, description, quantity, packed } = item;

	const handleToggle = () => {
		setItems((currentItems) =>
			currentItems.map((item: ItemType) =>
				item.id === id ? { ...item, packed: !item.packed } : item
			)
		);
	};

	const handleDelete = () => {
		setItems((currentItems) => currentItems.filter((item: ItemType) => item.id !== id));
	};

	return (
		<li>
			<input
				type='checkbox'
				checked={packed}
				onChange={handleToggle}
				data-testid='packingList'
			/>
			<span style={packed ? { textDecoration: 'line-through' } : {}}>
				{quantity} {description}
			</span>
			<button
				type='button'
				onClick={handleDelete}
			>
				❌
			</button>
		</li>
	);
}

export default PackingItem;
