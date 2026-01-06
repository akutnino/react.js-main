import type {
	FetchOrderDataResponseType,
	OrderClearErrorActionType,
	OrderResetStateActionType,
} from '../../types/stores/actions/order-types.ts';
import type { AsyncThunkAction } from '../../types/stores/types.ts';

export function fetchOrderData(orderID: string): AsyncThunkAction {
	const ThunkMiddleWare: AsyncThunkAction = async (dispatch) => {
		try {
			dispatch({
				type: 'order/fetchStart',
			});

			const fetchURL: RequestInfo = `${import.meta.env.VITE_ORDER_API}/${orderID}`;
			const fetchOptions: RequestInit = {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			};

			const response: Response = await fetch(fetchURL, fetchOptions);
			if (!response.ok) throw new Error('Order Number Not Found');

			const data: FetchOrderDataResponseType = await response.json();
			if (data.status !== 'success') throw new Error(`Status Not Successful: ${data.status}`); // prettier-ignore

			dispatch({
				type: 'order/fetchSuccess',
				payload: data,
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: 'order/fetchError',
					payload: error.message,
				});
			}
		}
	};

	return ThunkMiddleWare;
}

export function createOrderData(newOrder: string): AsyncThunkAction {
	const ThunkMiddleWare: AsyncThunkAction = async (dispatch) => {
		try {
			dispatch({
				type: 'order/fetchStart',
			});

			const fetchURL: RequestInfo = `${import.meta.env.VITE_ORDER_API}`;
			const fetchOptions: RequestInit = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newOrder),
			};

			const response: Response = await fetch(fetchURL, fetchOptions);
			if (!response.ok) throw new Error('Create Order Failed');

			const data: FetchOrderDataResponseType = await response.json();
			if (data.status !== 'success') throw new Error(`Status Not Successful: ${data.status}`); // prettier-ignore

			dispatch({
				type: 'order/createOrderSuccess',
				payload: data,
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: 'order/fetchError',
					payload: error.message,
				});
			}
		}
	};

	return ThunkMiddleWare;
}

export function updateOrderData(orderID: string, updateObj: string): AsyncThunkAction {
	const ThunkMiddleWare: AsyncThunkAction = async (dispatch) => {
		try {
			dispatch({
				type: 'order/fetchStart',
			});

			const fetchURL: RequestInfo = `${import.meta.env.VITE_ORDER_API}/${orderID}`;
			const fetchOptions: RequestInit = {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updateObj),
			};

			const response: Response = await fetch(fetchURL, fetchOptions);
			if (!response.ok) throw new Error('Order Update Failed');

			dispatch({
				type: 'order/updateOrderSuccess',
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: 'order/fetchError',
					payload: error.message,
				});
			}
		}
	};

	return ThunkMiddleWare;
}

export function clearError(): OrderClearErrorActionType {
	return { type: 'order/clearError' };
}

export function resetState(): OrderResetStateActionType {
	return { type: 'order/resetState' };
}
