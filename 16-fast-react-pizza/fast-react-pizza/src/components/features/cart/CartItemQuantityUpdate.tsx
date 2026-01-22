import { useDispatch } from 'react-redux';
import {
	cartDecreaseItemQuantity,
	cartIncreaseItemQuantity,
} from '../../../stores/actions/cartActions.ts';
import type { AppDispatch } from '../../../types/stores/types.ts';

import Button from '../../common/Button.tsx';

function CartItemQuantityUpdate({
	pizzaId,
	quantity,
}: {
	pizzaId: number;
	quantity: number;
}) {
	const dispatch: AppDispatch = useDispatch();

	const handleDecrease = () => {
		dispatch(cartDecreaseItemQuantity(pizzaId));
	};

	const handleIncrease = () => {
		dispatch(cartIncreaseItemQuantity(pizzaId));
	};

	return (
		<div className='flex gap-1 items-center md:gap-3'>
			<Button
				type='round'
				onClick={handleDecrease}
			>
				-
			</Button>

			<span className='text-sm front-medium'>{quantity}</span>

			<Button
				type='round'
				onClick={handleIncrease}
			>
				+
			</Button>
		</div>
	);
}

export default CartItemQuantityUpdate;
