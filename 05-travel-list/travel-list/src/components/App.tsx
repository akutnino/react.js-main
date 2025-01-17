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
