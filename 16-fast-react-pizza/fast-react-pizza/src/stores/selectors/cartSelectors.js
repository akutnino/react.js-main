export const getTotalPizzasQuantity = (store) => {
	return store.cart.cartArray.reduce((acc, curr) => curr.quantity + acc, 0);
};

export const getTotalCartPrice = (store) => {
	return store.cart.cartArray.reduce((acc, curr) => curr.totalPrice + acc, 0);
};

export const getCartArray = (store) => {
	return store.cart.cartArray;
};

export const getCurrentQuantityById = (id) => {
	return (store) => {
		const cartArray = store.cart.cartArray;
		const pizzaObject = cartArray.find((obj) => obj.pizzaId === id);

		return pizzaObject?.quantity ?? 0;
	};
};
