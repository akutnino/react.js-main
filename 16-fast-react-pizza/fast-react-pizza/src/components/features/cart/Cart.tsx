import { Link, Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../stores/selectors/userSelectors.ts';
import { selectCart } from '../../../stores/selectors/cartSelectors.ts';
import type { UserInitialStateType } from '../../../types/stores/reducers/user-types.ts';
import type { CartInitialStateType } from '../../../types/stores/reducers/cart-types.ts';

import CartItem from './CartItem.tsx';
import Button from '../../common/Button.tsx';

function Cart() {
	const { username }: UserInitialStateType = useSelector(selectUser);
	const { cart }: CartInitialStateType = useSelector(selectCart);

	return (
		<>
			{cart !== null && (
				<div className='px-4 py-3'>
					<Link
						className='text-sm text-blue-500 hover:text-blue-600 hover:underline'
						to='/menu'
					>
						&larr; Back to menu
					</Link>

					<h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>

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
			)}

			{cart === null && (
				<Navigate
					to={'/menu'}
					replace={true}
				/>
			)}
		</>
	);
}

export default Cart;
