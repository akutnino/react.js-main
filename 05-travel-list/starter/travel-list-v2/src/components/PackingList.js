import PackingItem from './PackingItem';
import { useState } from 'react';

export default function PackingList(props) {
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
