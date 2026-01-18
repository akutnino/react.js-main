export type CartItemType = {
	addIngredients: string[];
	removeIngredients: string[];
	pizzaId: number;
	name: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
};

export type CartArrayType = CartItemType[];

export type CartType = CartArrayType | null;

export type CartInitialStateType = {
	cart: CartType;
};
