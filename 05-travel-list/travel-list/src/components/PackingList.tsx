import { ItemType } from './App.tsx';
import PackingItem from './PackingItem.tsx';

function PackingList({ initialItems }: { initialItems: ItemType[] }) {
	return (
		<div className='list'>
			<ul>
				{initialItems.map((item: ItemType) => (
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
