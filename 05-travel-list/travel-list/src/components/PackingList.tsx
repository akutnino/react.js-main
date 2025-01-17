import { type ItemType } from './App.tsx';
import PackingItem from './PackingItem.tsx';

function PackingList({ items }: { items: ItemType[] }) {
	return (
		<div className='list'>
			<ul>
				{items.map((item: ItemType) => (
					<PackingItem
						{...item}
						key={item.id}
					/>
				))}
			</ul>
		</div>
	);
}

export default PackingList;
