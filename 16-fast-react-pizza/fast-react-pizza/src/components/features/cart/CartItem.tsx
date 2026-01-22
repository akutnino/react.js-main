import { useDispatch } from 'react-redux';
import { cartDeleteItem } from '../../../stores/actions/cartActions.ts';
import { formatCurrency } from '../../../utilities/formatCurrency.ts';
import type { CartItemType } from '../../../types/stores/reducers/cart-types.ts';
import type { AppDispatch } from '../../../types/stores/types.ts';

import Button from '../../common/Button.tsx';

function CartItem({ item }: { item: CartItemType }) {
	const { name, quantity, totalPrice, pizzaId } = item;
	const dispatch: AppDispatch = useDispatch();

	const handleDeleteItem = () => {
		dispatch(cartDeleteItem(pizzaId));
	};

	return (
		<li className='py-3 sm:flex sm:items-center sm:justify-between'>
			<p className='mb-1 sm:mb-0'>
				{quantity}&times; {name}
			</p>
			<div className='flex items-center justify-between sm:gap-6'>
				<p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
				<Button
					type='small'
					onClick={handleDeleteItem}
				>
					Delete
				</Button>
			</div>
		</li>
	);
}

export default CartItem;
