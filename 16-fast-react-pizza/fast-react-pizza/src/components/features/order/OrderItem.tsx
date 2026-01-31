import type { CartItemType } from '../../../types/stores/reducers/cart-types.ts';
import { formatCurrency } from '../../../utilities/formatCurrency.ts';

// const props = { item, isLoadingIngredients, ingredients };

function OrderItem({
	item,
	ingredients,
}: {
	item: CartItemType;
	ingredients: string[] | undefined;
}) {
	const { quantity, name, totalPrice } = item;

	return (
		<li className='py-3'>
			<div className='flex items-center justify-between gap-4 text-sm'>
				<p>
					<span className='font-bold'>{quantity}&times;</span> {name}
				</p>
				<p className='font-bold'>{formatCurrency(totalPrice)}</p>
			</div>
			<p className='text-sm capitalize italic text-stone-500'>
				{ingredients?.join(', ')}
			</p>
		</li>
	);
}

export default OrderItem;
