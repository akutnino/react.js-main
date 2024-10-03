import { formatCurrency } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../stores/actions/cartActions';
import { getCurrentQuantityById } from '../../stores/selectors/cartSelectors';
import PropTypes from 'prop-types';
import Button from '../../interfaces/Button';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

MenuItem.propTypes = {
	pizzaObject: PropTypes.object,
};

function MenuItem(props) {
	const { pizzaObject } = props;
	const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizzaObject;
	const pizzaQuantity = useSelector(getCurrentQuantityById(id));
	const dispatch = useDispatch();
	const isPizzaInCart = pizzaQuantity > 0;

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

					{isPizzaInCart && (
						<div className='flex items-center gap-3 sm:gap-8'>
							<UpdateItemQuantity
								pizzaId={id}
								quantity={pizzaQuantity}
							/>
							<DeleteItem pizzaId={id} />
						</div>
					)}

					{!soldOut && !isPizzaInCart && (
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
