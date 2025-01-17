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

	const handleDelete = () => {
		setItems((currentItems) => currentItems.filter((item: ItemType) => item.id !== id));
	};

	return (
		<li>
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
