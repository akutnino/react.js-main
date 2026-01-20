import type {
	CreateOrderObjectType,
	FetchOrderDataResponseType,
	OrderClearErrorActionType,
	OrderResetStateActionType,
} from '../../types/stores/actions/order-types.ts';
import type { AsyncThunkAction } from '../../types/stores/types.ts';
import { orderTypes } from '../_constants/orderTypes.ts';

export function fetchOrderData(orderID: string): AsyncThunkAction {
	const ThunkMiddleWare: AsyncThunkAction = async (dispatch) => {
		try {
			dispatch({
				type: orderTypes.ORDER_FETCH,
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
				type: orderTypes.ORDER_FETCH_SUCCESS,
				payload: data,
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: orderTypes.ORDER_FETCH_ERROR,
					payload: error.message,
				});
			}
		}
	};

	return ThunkMiddleWare;
}

export function createOrderData(newOrder: CreateOrderObjectType): AsyncThunkAction {
	const ThunkMiddleWare: AsyncThunkAction = async (dispatch) => {
		try {
			dispatch({
				type: orderTypes.ORDER_FETCH,
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
				type: orderTypes.ORDER_CREATE,
				payload: data,
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: orderTypes.ORDER_FETCH_ERROR,
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
				type: orderTypes.ORDER_FETCH,
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
				type: orderTypes.ORDER_UPDATE,
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: orderTypes.ORDER_FETCH_ERROR,
					payload: error.message,
				});
			}
		}
	};

	return ThunkMiddleWare;
}

export function clearOrderError(): OrderClearErrorActionType {
	return { type: orderTypes.ORDER_CLEAR_ERROR };
}

export function resetOrderState(): OrderResetStateActionType {
	return { type: orderTypes.ORDER_RESET_STATE };
}
