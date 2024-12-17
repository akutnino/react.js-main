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
	return <h1>Fast React Pizza Co.</h1>;
}

function Menu() {
	return (
		<div>
			<h2>Our Menu</h2>;
			<Pizza />
		</div>
	);
}

function Footer() {
	return <footer>{new Date().toLocaleTimeString()}we're currently open</footer>;
}

function Pizza() {
	return (
		<div>
			<img
				src='./public/spinaci.jpg'
				alt='spinaci.jpg'
			/>
			<h2>Pizza Spinaci</h2>
			<p>Tomato, mozarella, spinach, and ricotta cheese</p>
		</div>
	);
}

function App() {
	return (
		<div>
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

export default App;
