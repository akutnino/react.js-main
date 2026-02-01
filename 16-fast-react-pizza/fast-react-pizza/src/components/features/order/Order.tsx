// Test ID: IIDSAT, CQE92U
// Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

import { useDispatch, useSelector } from 'react-redux';
import { calcMinutesLeft } from '../../../utilities/calcMinutesLeft.ts';
import { formatCurrency } from '../../../utilities/formatCurrency.ts';
import { formatDate } from '../../../utilities/formatDate.ts';
import { selectOrder } from '../../../stores/selectors/orderSelectors.ts';
import { selectMenu } from '../../../stores/selectors/menuSelectors.ts';
import { updateOrderData } from '../../../stores/actions/orderActions.ts';
import type { AppDispatch } from '../../../types/stores/types.ts';
import type {
	OrderInitialStateType,
	OrderType,
} from '../../../types/stores/reducers/order-types.ts';
import type { MenuInitialStateType } from '../../../types/stores/reducers/menu-types.ts';

import Error from '../../common/Error.tsx';
import LoadingIndicator from '../../common/LoadingIndicator.tsx';
import OrderItem from './OrderItem.tsx';
import Button from '../../common/Button.tsx';

function Order() {
	const { errorMessage, isLoading, order }: OrderInitialStateType = useSelector(selectOrder); // prettier-ignore
	const { menu }: MenuInitialStateType = useSelector(selectMenu);
	const dispatch: AppDispatch = useDispatch();

	const isError: boolean = !isLoading && errorMessage !== null;
	const isOrderLoaded: boolean = !isLoading && !isError;

	const handleUpdateOrder = () => {
		if (order?.id === undefined) return;

		const updatedOrder: OrderType = {
			...order,
			priority: true,
		};

		dispatch(updateOrderData(order.id, updatedOrder));
	};

	return (
		<>
			{isLoading && <LoadingIndicator />}

			{isOrderLoaded && order !== null && order.cart !== null && (
				<div className='space-y-8 px-4 py-6'>
					<div className='flex flex-wrap items-center justify-between gap-2'>
						<h2 className='text-xl font-semibold'>Order #{order.id} status</h2>

						<div className='space-x-2'>
							{order.priority && (
								<span className='rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50'>
									Priority
								</span>
							)}
							<span className='rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50'>
								{order.status} order
							</span>
						</div>
					</div>

					<div className='flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5'>
						<p className='font-medium'>
							{Number(order.estimatedDelivery) >= 0
								? `Only ${calcMinutesLeft(order.estimatedDelivery)} minutes left 😃`
								: 'Order should have arrived'}
						</p>
						<p className='text-xs text-stone-500'>
							(Estimated delivery: {formatDate(order.estimatedDelivery)})
						</p>
					</div>

					<ul className='dive-stone-200 divide-y border-b border-t'>
						{order.cart.map((item) => (
							<OrderItem
								item={item}
								key={item.pizzaId}
								ingredients={
									menu?.find((menuItem) => menuItem.id === item.pizzaId)?.ingredients
								}
							/>
						))}
					</ul>

					<div className='space-y-2 bg-stone-200 px-6 py-5'>
						<p className='text-sm font-medium text-stone-600'>
							Price pizza: {formatCurrency(order.orderPrice)}
						</p>
						{order.priority && (
							<p className='text-sm font-medium text-stone-600'>
								Price priority: {formatCurrency(order.priorityPrice)}
							</p>
						)}
						<p className='font-bold'>
							To pay on delivery: {formatCurrency(order.orderPrice + order.priorityPrice)}
						</p>
					</div>

					{!order.priority && (
						<Button
							type='primary'
							onClick={handleUpdateOrder}
						>
							Make Priority
						</Button>
					)}
				</div>
			)}

			{isError && <Error />}
		</>
	);
}

export default Order;
