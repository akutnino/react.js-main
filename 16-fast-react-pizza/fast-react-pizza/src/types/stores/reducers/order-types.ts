export type OrderDataType = {
	customer: string;
	status: string | 'delivered';
	priority: boolean;
	cart: {
		addIngredients: string[];
		removeIngredients: string[];
		pizzaId: number;
		name: string;
		quantity: number;
		unitPrice: number;
		totalPrice: number;
	}[];
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
