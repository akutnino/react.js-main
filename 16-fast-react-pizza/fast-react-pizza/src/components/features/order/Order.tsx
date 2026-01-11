// Test ID: IIDSAT, CQE92U
// Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

import { useSelector } from 'react-redux';
import { calcMinutesLeft } from '../../../utilities/calcMinutesLeft.ts';
import { formatCurrency } from '../../../utilities/formatCurrency.ts';
import { formatDate } from '../../../utilities/formatDate.ts';
import { selectOrder } from '../../../stores/selectors/orderSelectors.ts';
import type { OrderInitialStateType } from '../../../types/stores/reducers/order-types.ts';

import Error from '../../common/Error.tsx';
import LoadingIndicator from '../../common/LoadingIndicator.tsx';

function Order() {
	const { errorMessage, isLoading, order }: OrderInitialStateType = useSelector(selectOrder); // prettier-ignore

	const isError: boolean = !isLoading && errorMessage !== null;
	const isOrderLoaded: boolean = !isLoading && !isError && order !== null;

	return (
		<>
			{isLoading && <LoadingIndicator />}

			{isOrderLoaded && (
				<div>
					<div>
						<h2>Status</h2>

						<div>
							{order!.priority && <span>Priority</span>}
							<span>{order!.status} order</span>
						</div>
					</div>

					<div>
						<p>
							{calcMinutesLeft(order!.estimatedDelivery) >= 0
								? `Only ${calcMinutesLeft(order!.estimatedDelivery)} minutes left 😃`
								: 'Order should have arrived'}
						</p>
						<p>(Estimated delivery: {formatDate(order!.estimatedDelivery)})</p>
					</div>

					<div>
						<p>Price pizza: {formatCurrency(order!.orderPrice)}</p>
						{order!.priority && (
							<p>Price priority: {formatCurrency(order!.priorityPrice)}</p>
						)}
						<p>
							To pay on delivery:{' '}
							{formatCurrency(order!.orderPrice + order!.priorityPrice)}
						</p>
					</div>
				</div>
			)}

			{isError && <Error />}
		</>
	);
}

export default Order;
