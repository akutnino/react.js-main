import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

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
		<div className='container'>
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

function Header(props) {
	const cssStyle = {};

	return (
		<header className='header'>
			<h1 style={cssStyle}>Fast React Pizza Co.</h1>
		</header>
	);
}

function Menu(props) {
	return (
		<main className='menu'>
			<h2>Our Menu</h2>

			<ul className='pizzas'>
				{pizzaData.map((pizzaObject) => (
					<Pizza
						pizzaObject={pizzaObject}
						key={pizzaObject.name}
					/>
				))}
			</ul>
		</main>
	);
}

function Pizza(props) {
	const { pizzaObject } = props;
	const { name, ingredients, price, photoName, soldOut } = pizzaObject;

	return (
		<li className='pizza'>
			<img
				src={photoName}
				alt={photoName}
			/>
			<div>
				<h3>{name}</h3>
				<p>{ingredients}</p>
				<span>{price}</span>
			</div>
		</li>
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
		<footer className='footer'>
			{new Date().toLocaleTimeString()} We're currently open!
		</footer>
	);
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
