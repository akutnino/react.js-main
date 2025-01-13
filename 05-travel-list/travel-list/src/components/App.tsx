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

const initialItems: ItemType[] = [
	{ id: 1, description: 'Passports', quantity: 2, packed: false },
	{ id: 2, description: 'Socks', quantity: 12, packed: false },
	{ id: 3, description: 'Charger', quantity: 1, packed: true },
];

function App() {
	return (
		<div className='app'>
			<Logo />
			<Form />
			<PackingList initialItems={initialItems} />
			<Stats />
		</div>
	);
}

export default App;
