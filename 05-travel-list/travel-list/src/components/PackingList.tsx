import { type SetStateAction, type Dispatch } from 'react';
import { type ItemType } from './App.tsx';
import PackingItem from './PackingItem.tsx';

function PackingList({
	items,
	setItems,
}: {
	items: ItemType[];
	setItems: Dispatch<SetStateAction<ItemType[]>>;
}) {
	return (
		<div className='list'>
			<ul>
				{items.map((item: ItemType) => (
					<PackingItem
						item={item}
						setItems={setItems}
						key={item.id}
					/>
				))}
			</ul>
		</div>
	);
}

export default PackingList;
