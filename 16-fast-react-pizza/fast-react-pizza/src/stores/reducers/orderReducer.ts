import type { OrderReducerActionType } from '../../types/stores/actions/order-types.ts';
import type { OrderInitialStateType } from '../../types/stores/reducers/order-types.ts';

const ORDER_INITIAL_STATE: OrderInitialStateType = {
	order: null,
	isLoading: false,
	errorMessage: null,
};

function orderReducer(
	currentState = ORDER_INITIAL_STATE,
	action: OrderReducerActionType
): OrderInitialStateType {
	switch (action.type) {
		case 'order/fetchStart': {
			return {
				...currentState,
				isLoading: true,
				errorMessage: null,
			};
		}
		case 'order/fetchSuccess': {
			return {
				...currentState,
				isLoading: false,
				order: action.payload.data,
			};
		}
		case 'order/createOrderSuccess': {
			return {
				...currentState,
				isLoading: false,
				order: action.payload.data,
			};
		}
		case 'order/updateOrderSuccess': {
			return {
				...currentState,
				isLoading: false,
			};
		}
		case 'order/fetchError': {
			return {
				...currentState,
				errorMessage: action.payload,
				isLoading: false,
				order: null,
			};
		}
		case 'order/clearError': {
			return {
				...currentState,
				errorMessage: null,
			};
		}
		case 'order/resetState': {
			return {
				...currentState,
				order: null,
				isLoading: false,
				errorMessage: null,
			};
		}
		default: {
			return currentState;
		}
	}
}

export { orderReducer, ORDER_INITIAL_STATE };
