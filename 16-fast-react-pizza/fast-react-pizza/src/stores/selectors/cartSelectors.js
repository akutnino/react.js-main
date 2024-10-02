export const getTotalPizzasQuantity = (store) => {
	return store.cart.cartArray.reduce((acc, curr) => curr.quantity + acc, 0);
};

export const getTotalCartPrice = (store) => {
	return store.cart.cartArray.reduce((acc, curr) => curr.totalPrice + acc, 0);
};

export const getCartArray = (store) => {
	return store.cart.cartArray;
};
