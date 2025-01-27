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
		<li data-testid='packing-item'>
			<input
				type='checkbox'
				checked={packed}
				onChange={handleToggle}
				data-testid='checkbox-input'
			/>
			<span
				style={packed ? { textDecoration: 'line-through' } : {}}
				data-testid='item-name'
			>
				{quantity} {description}
			</span>
			<button
				type='button'
				onClick={handleDelete}
				data-testid='delete-btn'
			>
				❌
			</button>
		</li>
	);
}

export default PackingItem;
