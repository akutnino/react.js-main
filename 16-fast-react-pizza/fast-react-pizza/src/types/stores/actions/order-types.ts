import type { OrderDataType } from '../reducers/order-types.ts';

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

export type OrderFetchErrorActionType = {
	type: 'order/fetchError';
	payload: string;
};

export type OrderFetchEndActionType = {
	type: 'order/fetchEnd';
};

export type CreateOrderSuccessActionType = {
	type: 'order/createOrderSuccess';
	payload: FetchOrderDataResponseType;
};

export type UpdateOrderSuccessActionType = {
	type: 'order/updateOrderSuccess';
};

export type OrderReducerActionType =
	| OrderFetchStartActionType
	| OrderFetchSuccessActionType
	| OrderFetchErrorActionType
	| OrderFetchEndActionType
	| CreateOrderSuccessActionType
	| UpdateOrderSuccessActionType;
