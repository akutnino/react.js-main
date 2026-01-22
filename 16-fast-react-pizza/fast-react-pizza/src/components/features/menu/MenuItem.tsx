import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../types/stores/types.ts';
import type { MenuDataType } from '../../../types/stores/reducers/menu-types.ts';
import type { CartItemType } from '../../../types/stores/reducers/cart-types.ts';
import { formatCurrency } from '../../../utilities/formatCurrency.ts';
import { cartAddItem, cartDeleteItem } from '../../../stores/actions/cartActions.ts';
import { getCartItemQuantityById } from '../../../stores/selectors/cartSelectors.ts';

import Button from '../../common/Button.tsx';
import CartItemQuantityUpdate from '../cart/CartItemQuantityUpdate.tsx';

function MenuItem({ pizza }: { pizza: MenuDataType }) {
	const { name, unitPrice, ingredients, soldOut, imageUrl, id } = pizza;
	const cartItemQuantity: number = useSelector(getCartItemQuantityById(id));
	const isInCart: boolean = cartItemQuantity > 0;

	const dispatch: AppDispatch = useDispatch();

	const handleAddToCart = () => {
		const newCartItem: CartItemType = {
			addIngredients: [],
			removeIngredients: [],
			pizzaId: id,
			name,
			quantity: 1,
			unitPrice,
			totalPrice: unitPrice * 1,
		};

		dispatch(cartAddItem(newCartItem));
	};

	const handleDeleteItem = () => {
		dispatch(cartDeleteItem(id));
	};

	return (
		<li className='flex gap-4 py-2'>
			<img
				src={imageUrl}
				alt={name}
				className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
			/>
			<div className='flex grow flex-col pt-0.5'>
				<p className='font-medium'>{name}</p>
				<p className='text-sm capitalize italic text-stone-500'>
					{ingredients.join(', ')}
				</p>
				<div className='mt-auto flex items-center justify-between'>
					{!soldOut ? (
						<p className='text-sm'>{formatCurrency(unitPrice)}</p>
					) : (
						<p className='text-sm font-medium uppercase text-stone-500'>Sold out</p>
					)}

					{isInCart && (
						<div className='flex items-center gap-3 sm:gap-8'>
							<CartItemQuantityUpdate
								pizzaId={id}
								quantity={cartItemQuantity}
							/>

							<Button
								type='small'
								onClick={handleDeleteItem}
							>
								Delete
							</Button>
						</div>
					)}

					{!soldOut && !isInCart && (
						<Button
							type='small'
							onClick={handleAddToCart}
						>
							Add to cart
						</Button>
					)}
				</div>
			</div>
		</li>
	);
}

export default MenuItem;
