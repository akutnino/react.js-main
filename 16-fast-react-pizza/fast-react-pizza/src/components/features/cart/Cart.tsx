import { Link } from 'react-router';
import CartItem from './CartItem.tsx';
import Button from '../../common/Button.tsx';

const fakeCart = [
	{
		addIngredients: [],
		removeIngredients: [],
		pizzaId: 12,
		name: 'Mediterranean',
		quantity: 2,
		unitPrice: 16,
		totalPrice: 32,
	},
	{
		addIngredients: [],
		removeIngredients: [],
		pizzaId: 6,
		name: 'Vegetale',
		quantity: 1,
		unitPrice: 13,
		totalPrice: 13,
	},
	{
		addIngredients: [],
		removeIngredients: [],
		pizzaId: 11,
		name: 'Spinach and Mushroom',
		quantity: 1,
		unitPrice: 15,
		totalPrice: 15,
	},
];

function Cart() {
	const cart = fakeCart;

	return (
		<div className='px-4 py-3'>
			<Link
				className='text-sm text-blue-500 hover:text-blue-600 hover:underline'
				to='/menu'
			>
				&larr; Back to menu
			</Link>

			<h2 className='mt-7 text-xl font-semibold'>Your cart, %NAME%</h2>

			<ul className='mt-3 divide-y divide-stone-200 border-b'>
				{cart.map((item) => (
					<CartItem
						item={item}
						key={item.pizzaId}
					/>
				))}
			</ul>

			<div className='mt-6 space-x-2'>
				<Button
					to='/order/new'
					type='primary'
				>
					Order pizzas
				</Button>

				<Button type='secondary'>Clear cart</Button>
			</div>
		</div>
	);
}

export default Cart;
