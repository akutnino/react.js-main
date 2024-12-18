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
			<Pizza
				pizzaName='Pizza Spinaci'
				pizzaIngredients='Tomato, mozarella, spinach, and ricotta cheese'
				pizzaImage='/spinaci.jpg'
				pizzaPrice={10}
			/>
			<Pizza
				pizzaName='Pizza Funghi'
				pizzaIngredients='Tomato, mozarella, mushrooms, and onion'
				pizzaImage='/funghi.jpg'
				pizzaPrice={12}
			/>
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

function Pizza({
	pizzaName,
	pizzaIngredients,
	pizzaImage,
	pizzaPrice,
}: {
	pizzaName: string;
	pizzaIngredients: string;
	pizzaImage: string;
	pizzaPrice: number;
}) {
	return (
		<div className='pizza'>
			<img
				src={pizzaImage}
				alt={pizzaName}
			/>
			<div>
				<h3>{pizzaName}</h3>
				<p>{pizzaIngredients}</p>
				<span>{pizzaPrice}</span>
			</div>
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
