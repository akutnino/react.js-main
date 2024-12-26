import Pizza from './Pizza.tsx';

export type PizzaDataType = {
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

function Menu({ pizzaArray = pizzaData }: { pizzaArray?: PizzaDataType[] }) {
	return (
		<main
			className='menu'
			data-testid='menu'
		>
			<h2>Our Menu</h2>

			{pizzaArray.length ? (
				<>
					<p data-testid='pizza-menu'>
						Authentic Italian cuisine. 6 creative dishes to choose from. All from our
						stone oven, all organic, all delicious.
					</p>
					<ul className='pizzas'>
						{pizzaData.map((pizzaObject: PizzaDataType) => (
							<Pizza
								{...pizzaObject}
								key={pizzaObject.name}
							/>
						))}
					</ul>
				</>
			) : (
				<p data-testid='menu-message'>We're still working on our menu.</p>
			)}
		</main>
	);
}

export default Menu;
