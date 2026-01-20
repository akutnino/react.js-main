import type { orderTypes } from '../../../stores/_constants/orderTypes.ts';
import type { CartType } from '../reducers/cart-types.ts';
import type { OrderDataType } from '../reducers/order-types.ts';

export type FetchOrderDataResponseType = {
	status: 'success' | 'fail';
	data: OrderDataType;
};

export type OrderFetchStartActionType = {
	type: typeof orderTypes.ORDER_FETCH;
};

export type OrderFetchSuccessActionType = {
	type: typeof orderTypes.ORDER_FETCH_SUCCESS;
	payload: FetchOrderDataResponseType;
};

export type CreateOrderSuccessActionType = {
	type: typeof orderTypes.ORDER_CREATE;
	payload: FetchOrderDataResponseType;
};

export type UpdateOrderSuccessActionType = {
	type: typeof orderTypes.ORDER_UPDATE;
};

export type OrderFetchErrorActionType = {
	type: typeof orderTypes.ORDER_FETCH_ERROR;
	payload: string;
};

export type OrderClearErrorActionType = {
	type: typeof orderTypes.ORDER_CLEAR_ERROR;
};

export type OrderResetStateActionType = {
	type: typeof orderTypes.ORDER_RESET_STATE;
};

export type OrderReducerActionType =
	| OrderFetchStartActionType
	| OrderFetchSuccessActionType
	| CreateOrderSuccessActionType
	| UpdateOrderSuccessActionType
	| OrderFetchErrorActionType
	| OrderClearErrorActionType
	| OrderResetStateActionType;

export type CreateOrderObjectType = {
	customer: string;
	phone: string;
	address: string;
	withPriority: boolean;
	cart: CartType;
};
