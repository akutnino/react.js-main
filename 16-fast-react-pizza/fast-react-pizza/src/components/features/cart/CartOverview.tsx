import { useSelector } from 'react-redux';
import { Link, useLocation, type Location } from 'react-router';
import {
	getTotalCartPrice,
	getTotalCartQuantity,
} from '../../../stores/selectors/cartSelectors.ts';
import { formatCurrency } from '../../../utilities/formatCurrency.ts';

function CartOverview() {
	const totalCartQuantity: number = useSelector(getTotalCartQuantity);
	const totalCartPrice: number = useSelector(getTotalCartPrice);
	const location: Location = useLocation();

	return (
		<>
			{totalCartQuantity !== 0 && (
				<div className='flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base'>
					<p className='space-x-4 font-semibold text-stone-300 sm:space-x-6'>
						<span>{totalCartQuantity} pizzas</span>
						<span>{formatCurrency(totalCartPrice)}</span>
					</p>

					{location.pathname !== '/cart' && <Link to='/cart'>Open cart &rarr;</Link>}
				</div>
			)}
		</>
	);
}

export default CartOverview;
