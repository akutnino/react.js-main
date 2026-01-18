export type CartAddCartItemActionType = {
	type: 'cart/addCartItem';
};

export type CartDeleteCartItemActionType = {
	type: 'cart/deleteCartItem';
};

export type CartIncreaseCartItemQuantityActionType = {
	type: 'cart/increaseCartItemQuantity';
};

export type CartDecreaseCartItemQuantityActionType = {
	type: 'cart/decreaseCartItemQuantity';
};

export type CartClearCartItemActionType = {
	type: 'cart/clearCart';
};

export type CartReducerActionType =
	| CartAddCartItemActionType
	| CartDeleteCartItemActionType
	| CartIncreaseCartItemQuantityActionType
	| CartDecreaseCartItemQuantityActionType
	| CartClearCartItemActionType;
