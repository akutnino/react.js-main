import type { CartType } from './cart-types.ts';

export type OrderDataType = {
	customer: string;
	status: string | 'delivered';
	priority: boolean;
	cart: CartType;
	id: string;
	estimatedDelivery: string;
	orderPrice: number;
	priorityPrice: number;
};

export type OrderType = OrderDataType | null;

export type OrderInitialStateType = {
	order: OrderType;
	isLoading: boolean;
	errorMessage: null | string;
};
