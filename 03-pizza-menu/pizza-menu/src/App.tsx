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
		photoName: 'pizzas/focaccia.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Margherita',
		ingredients: 'Tomato and mozarella',
		price: 10,
		photoName: 'pizzas/margherita.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Spinaci',
		ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
		price: 12,
		photoName: 'pizzas/spinaci.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Funghi',
		ingredients: 'Tomato, mozarella, mushrooms, and onion',
		price: 12,
		photoName: 'pizzas/funghi.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Salamino',
		ingredients: 'Tomato, mozarella, and pepperoni',
		price: 15,
		photoName: 'pizzas/salamino.jpg',
		soldOut: true,
	},
	{
		name: 'Pizza Prosciutto',
		ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
		price: 18,
		photoName: 'pizzas/prosciutto.jpg',
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
	return (
		<main className='menu'>
			<h2>Our Menu</h2>
			<Pizza />
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
			{new Date().toLocaleTimeString()}we're currently open
		</footer>
	);
}

function Pizza() {
	return (
		<div>
			<img
				src='/spinaci.jpg'
				alt='spinaci.jpg'
			/>
			<h2>Pizza Spinaci</h2>
			<p>Tomato, mozarella, spinach, and ricotta cheese</p>
		</div>
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
