import type { OrderCartType, OrderDataType } from '../reducers/order-types.ts';

export type FetchOrderDataResponseType = {
	status: 'success' | 'fail';
	data: OrderDataType;
};

export type OrderFetchStartActionType = {
	type: 'order/fetchStart';
};

export type OrderFetchSuccessActionType = {
	type: 'order/fetchSuccess';
	payload: FetchOrderDataResponseType;
};

export type CreateOrderSuccessActionType = {
	type: 'order/createOrderSuccess';
	payload: FetchOrderDataResponseType;
};

export type UpdateOrderSuccessActionType = {
	type: 'order/updateOrderSuccess';
};

export type OrderFetchErrorActionType = {
	type: 'order/fetchError';
	payload: string;
};

export type OrderClearErrorActionType = {
	type: 'order/clearError';
};

export type OrderResetStateActionType = {
	type: 'order/resetState';
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
	cart: OrderCartType;
};
