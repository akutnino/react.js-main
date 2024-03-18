const initialItems = [
	{
		id: 1,
		description: 'Passports',
		quantity: 2,
		packed: false
	},
	{
		id: 2,
		description: 'Socks',
		quantity: 12,
		packed: true
	}
];

export default function App(props) {
	return (
		<div className='app'>
			<Logo />
			<Form />
			<PackingList />
			<Stats />
		</div>
	);
}

function Logo(props) {
	return <h1>🌴 Far Away 👜</h1>;
}

function Form(props) {
	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<form
			className='add-form'
			onSubmit={handleSubmit}
		>
			<h3>What do you need for your 😍 trip?</h3>
			<select>
				{Array(10)
					.fill(0)
					.map((val, index) => (
						<option key={index}>{index + 1}</option>
					))}
			</select>
			<input
				type='text'
				placeholder='Item...'
			></input>
			<button>Add</button>
		</form>
	);
}

function PackingList(props) {
	return (
		<div className='list'>
			<ul>
				{initialItems.map((item) => (
					<PackingItem
						itemObject={item}
						key={item.id}
					/>
				))}
			</ul>
		</div>
	);
}

function PackingItem(props) {
	const { itemObject } = props;
	const { id, description, quantity, packed } = itemObject;
	const packedStyle = { textDecoration: 'line-through' };

	return (
		<li>
			<span style={packed ? packedStyle : {}}>
				{quantity} {description}
			</span>
			<button>❌</button>
		</li>
	);
}

function Stats(props) {
	return (
		<footer className='stats'>
			<em>👜 You have X items on your list, and you already packed x (X%)</em>
		</footer>
	);
}
