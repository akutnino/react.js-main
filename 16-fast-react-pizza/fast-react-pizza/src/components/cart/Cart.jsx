import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsername } from '../../stores/selectors/userSelectors';
import { getCartArray } from '../../stores/selectors/cartSelectors';
import { clearCart } from '../../stores/actions/cartActions';
import LinkButton from '../../interfaces/LinkButton';
import CartItem from './CartItem';
import Button from '../../interfaces/Button';
import EmptyCart from './EmptyCart';

function Cart() {
	const cartArray = useSelector(getCartArray);
	const userName = useSelector(getUsername);
	const dispatch = useDispatch();

	const handleClearCart = () => {
		dispatch(clearCart());
	};

	if (!cartArray.length) return <EmptyCart />;
	return (
		<div className='px-4 py-3'>
			<LinkButton to='/menu'>&larr; Back to menu</LinkButton>

			<h2 className='mt-7 text-xl font-semibold'>Your cart, {userName}</h2>

			<ul className='mt-3 divide-y divide-stone-200 border-b'>
				{cartArray.map((item) => (
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

				<Button
					type='secondary'
					onClick={handleClearCart}
				>
					Clear cart
				</Button>
			</div>
		</div>
	);
}

export default Cart;
