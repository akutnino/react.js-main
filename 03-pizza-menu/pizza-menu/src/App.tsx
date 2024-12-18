import './main.css';

type PizzaDataType = {
	name: string;
	ingredients: string;
	price: number;
	photoName: string;
	soldOut: boolean;
};

const pizzaData: PizzaDataType[] = [
	{
		name: 'Focaccia',
		ingredients: 'Bread with italian olive oil and rosemary',
		price: 6,
		photoName: '/focaccia.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Margherita',
		ingredients: 'Tomato and mozarella',
		price: 10,
		photoName: '/margherita.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Spinaci',
		ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
		price: 12,
		photoName: '/spinaci.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Funghi',
		ingredients: 'Tomato, mozarella, mushrooms, and onion',
		price: 12,
		photoName: '/funghi.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Salamino',
		ingredients: 'Tomato, mozarella, and pepperoni',
		price: 15,
		photoName: '/salamino.jpg',
		soldOut: true,
	},
	{
		name: 'Pizza Prosciutto',
		ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
		price: 18,
		photoName: '/prosciutto.jpg',
		soldOut: false,
	},
];

function Header() {
	const styleSample = { color: 'red', fontSize: '48px' };

	return (
		<header className='header'>
			<h1 style={styleSample}>Fast React Pizza Co.</h1>
		</header>
	);
}

function Menu() {
	const pizzaArray: PizzaDataType[] = pizzaData;

	return (
		<main className='menu'>
			<h2>Our Menu</h2>

			{pizzaArray.length ? (
				<ul className='pizzas'>
					{pizzaData.map((pizzaObject: PizzaDataType) => (
						<Pizza
							{...pizzaObject}
							key={pizzaObject.name}
						/>
					))}
				</ul>
			) : (
				<p>We're still working on our menu.</p>
			)}
		</main>
	);
}

function Footer() {
	const hour: number = new Date().getHours();
	const openHour = 12;
	const closeHour = 22;
	const isOpen = hour >= openHour && hour <= closeHour;

	return (
		<footer className='footer'>
			{isOpen ? (
				<Order closeHour={closeHour} />
			) : (
				<p>
					We're happy to welcome you between {openHour}:00 to {closeHour}:00.
				</p>
			)}
		</footer>
	);
}

function Order({ closeHour }: { closeHour: number }) {
	return (
		<div className='order'>
			<p>We're open until {closeHour}:00. Come visit us tomorrow.</p>
			<button
				type='button'
				className='btn'
			>
				Order
			</button>
		</div>
	);
}

function Pizza({ name, ingredients, price, photoName, soldOut }: PizzaDataType) {
	if (soldOut) return null;
	return (
		<li className='pizza'>
			<img
				src={photoName}
				alt={name}
			/>
			<div>
				<h3>{name}</h3>
				<p>{ingredients}</p>
				<span>{price}</span>
			</div>
		</li>
	);
}

function App() {
	return (
		<div className='container'>
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

export default App;
