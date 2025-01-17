import { useState } from 'react';
import Form from './Form.tsx';
import Logo from './Logo.tsx';
import PackingList from './PackingList.tsx';
import Stats from './Stats.tsx';

export type ItemType = {
	id: number;
	description: string;
	quantity: number;
	packed: boolean;
};

// const initialItems: ItemType[] = [
// 	{ id: 1, description: 'Passports', quantity: 2, packed: false },
// 	{ id: 2, description: 'Socks', quantity: 12, packed: false },
// 	{ id: 3, description: 'Charger', quantity: 1, packed: true },
// ];

function App() {
	const [items, setItems] = useState<ItemType[]>([]);

	return (
		<div className='app'>
			<Logo />
			<Form setItems={setItems} />
			<PackingList items={items} />
			<Stats />
		</div>
	);
}

export default App;
