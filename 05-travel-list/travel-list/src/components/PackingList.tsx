import { type SetStateAction, type Dispatch, type ChangeEvent, useState } from 'react';
import { type ItemType } from './App.tsx';
import PackingItem from './PackingItem.tsx';

function PackingList({
	items,
	setItems,
}: {
	items: ItemType[];
	setItems: Dispatch<SetStateAction<ItemType[]>>;
}) {
	const [sortBy, setSortBy] = useState<string>('input');
	let sortedItems: ItemType[] = items;

	if (sortBy === 'input') {
		sortedItems = items.toSorted((a: ItemType, b: ItemType) => a.id - b.id);
	}

	if (sortBy === 'description') {
		sortedItems = items.toSorted((a: ItemType, b: ItemType) =>
			a.description.localeCompare(b.description)
		);
	}

	if (sortBy === 'packed') {
		sortedItems = items.toSorted(
			(a: ItemType, b: ItemType) => Number(b.packed) - Number(a.packed)
		);
	}

	const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
		setSortBy(event.target.value);
	};

	const handleClear = () => {
		const confirmed = window.confirm('Are you sure to clear all items?');

		if (confirmed) setItems([]);
	};

	return (
		<div
			className='list'
			data-testid='packingList'
		>
			<ul>
				{sortedItems.map((item: ItemType) => (
					<PackingItem
						item={item}
						setItems={setItems}
						key={item.id}
					/>
				))}
			</ul>
			<div className='actions'>
				<select
					value={sortBy}
					onChange={handleSort}
				>
					<option value='input'>Sort by input order</option>
					<option value='description'>Sort by input description</option>
					<option value='packed'>Sort by input packer status</option>
				</select>
				<button
					type='button'
					onClick={handleClear}
				>
					Clear list
				</button>
			</div>
		</div>
	);
}

export default PackingList;
