import { PizzaDataType } from './Menu.tsx';

function Pizza({ name, ingredients, price, photoName, soldOut }: PizzaDataType) {
	return (
		<li
			className={`pizza ${soldOut ? 'sold-out' : ''}`}
			data-testid='pizza'
		>
			<img
				src={photoName}
				alt={name}
			/>
			<div>
				<h3>{name}</h3>
				<p>{ingredients}</p>
				<span>{soldOut ? 'Sold Out' : price}</span>
			</div>
		</li>
	);
}

export default Pizza;