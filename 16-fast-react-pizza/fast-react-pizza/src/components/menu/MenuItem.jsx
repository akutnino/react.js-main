import { formatCurrency } from '../../utils/helpers';
import { useDispatch } from 'react-redux';
import { addItem } from '../../stores/actions/cartActions';
import PropTypes from 'prop-types';
import Button from '../../interfaces/Button';

MenuItem.propTypes = {
	pizzaObject: PropTypes.object,
};

function MenuItem(props) {
	const { pizzaObject } = props;
	const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizzaObject;
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		const newCartItem = {
			pizzaId: id,
			name,
			quantity: 1,
			unitPrice,
			totalPrice: unitPrice * 1,
		};

		dispatch(addItem(newCartItem));
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

					{!soldOut && (
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
