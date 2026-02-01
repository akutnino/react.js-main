import type { CartType } from './cart-types.ts';

export type OrderDataType = {
	customer: string;
	phone: string;
	address: string;
	status: string | 'delivered' | 'preparing';
	priority: boolean;
	cart: CartType;
	id: string;
	createdAt: string;
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
