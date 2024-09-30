export function addItem(orderObject) {
	return { type: 'cart/addItem', payload: orderObject };
}

export function deleteItem(orderObjectPizzaId) {
	return { type: 'cart/deleteItem', payload: orderObjectPizzaId };
}

export function increaseItemQuantity(orderObjectPizzaId) {
	return { type: 'cart/increaseItemQuantity', payload: orderObjectPizzaId };
}

export function decreaseItemQuantity(orderObjectPizzaId) {
	return { type: 'cart/decreaseItemQuantity', payload: orderObjectPizzaId };
}

export function clearCart() {
	return { type: 'cart/clearCart' };
}
