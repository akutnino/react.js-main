import { ItemType } from './App.tsx';

function Stats({ items }: { items: ItemType[] }) {
	const totalItems: number = items.length;
	const totalPackedItems: number = items.reduce(
		(acc: number, curr: ItemType) => (curr.packed ? acc + 1 : acc),
		0
	);
	const packedItemsPercent: number = Math.round((totalPackedItems / totalItems) * 100);

	return (
		<footer
			className='stats'
			data-testid='stats'
		>
			<em data-testid='stats-em'>
				{packedItemsPercent === 100
					? 'You got everything! Ready to go!'
					: packedItemsPercent < 100
					? `👜 You have ${totalItems} items on your list, and you already packed ${totalPackedItems} (${packedItemsPercent}%)`
					: 'Start adding some items to your packing list 🚀'}
			</em>
		</footer>
	);
}

export default Stats;
