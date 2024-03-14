import React from 'react';
import ReactDOM from 'react-dom/client';

const pizzaData = [
	{
		name: 'Focaccia',
		ingredients: 'Bread with italian olive oil and rosemary',
		price: 6,
		photoName: 'pizzas/focaccia.jpg',
		soldOut: false
	},
	{
		name: 'Pizza Margherita',
		ingredients: 'Tomato and mozarella',
		price: 10,
		photoName: 'pizzas/margherita.jpg',
		soldOut: false
	},
	{
		name: 'Pizza Spinaci',
		ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
		price: 12,
		photoName: 'pizzas/spinaci.jpg',
		soldOut: false
	},
	{
		name: 'Pizza Funghi',
		ingredients: 'Tomato, mozarella, mushrooms, and onion',
		price: 12,
		photoName: 'pizzas/funghi.jpg',
		soldOut: false
	},
	{
		name: 'Pizza Salamino',
		ingredients: 'Tomato, mozarella, and pepperoni',
		price: 15,
		photoName: 'pizzas/salamino.jpg',
		soldOut: true
	},
	{
		name: 'Pizza Prosciutto',
		ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
		price: 18,
		photoName: 'pizzas/prosciutto.jpg',
		soldOut: false
	}
];

function App(props) {
	return (
		<div>
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

function Header(props) {
	return <h1>Fast React Pizza Co.</h1>;
}

function Menu(props) {
	return (
		<div>
			<h2>Our Menu</h2>
			<Pizza />
			<Pizza />
			<Pizza />
		</div>
	);
}

function Footer(props) {
	const hour = new Date().getHours();
	const openHour = 12;
	const closeHour = 22;
	const isOpen = hour >= openHour && hour <= closeHour;

	// if (isOpen) alert('We are currently open!');
	// else alert('We are currently closed!');

	return (
		<footer>{new Date().toLocaleTimeString()} We're currently open!</footer>
	);
}

function Pizza(props) {
	return (
		<div>
			<img
				src='pizzas/spinaci.jpg'
				alt='spinaci'
			/>
			<h2>Pizza Spinaci</h2>
			<p>Tomato, mozarella, spinach, and ricotta cheese</p>
		</div>
	);
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
