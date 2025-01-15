import { type ItemType } from './App.tsx';

function PackingItem({ description, quantity, packed }: ItemType) {
	return (
		<li>
			<span style={packed ? { textDecoration: 'line-through' } : {}}>
				{quantity} {description}
			</span>
			<button type='button'>❌</button>
		</li>
	);
}

export default PackingItem;
