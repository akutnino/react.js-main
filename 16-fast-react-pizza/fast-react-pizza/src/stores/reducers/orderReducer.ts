import type { OrderReducerActionType } from '../../types/stores/actions/order-types.ts';
import type { OrderInitialStateType } from '../../types/stores/reducers/order-types.ts';
import { orderTypes } from '../_constants/orderTypes.ts';

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
		case orderTypes.ORDER_FETCH: {
			return {
				...currentState,
				isLoading: true,
				errorMessage: null,
			};
		}
		case orderTypes.ORDER_FETCH_SUCCESS: {
			return {
				...currentState,
				isLoading: false,
				order: action.payload.data,
			};
		}
		case orderTypes.ORDER_CREATE: {
			return {
				...currentState,
				isLoading: false,
				order: action.payload.data,
			};
		}
		case orderTypes.ORDER_UPDATE: {
			return {
				...currentState,
				order: action.payload.data,
				isLoading: false,
			};
		}
		case orderTypes.ORDER_FETCH_ERROR: {
			return {
				...currentState,
				errorMessage: action.payload,
				isLoading: false,
				order: null,
			};
		}
		case orderTypes.ORDER_CLEAR_ERROR: {
			return {
				...currentState,
				errorMessage: null,
			};
		}
		case orderTypes.ORDER_RESET_STATE: {
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
