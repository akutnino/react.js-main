import type { cartTypes } from '../../../stores/_constants/cartTypes.ts';
import type { CartItemType } from '../reducers/cart-types.ts';

export type CartAddCartItemActionType = {
	type: typeof cartTypes.CART_ADD_ITEM;
	payload: CartItemType;
};

export type CartDeleteCartItemActionType = {
	type: typeof cartTypes.CART_DELETE_ITEM;
	payload: number;
};

export type CartIncreaseCartItemQuantityActionType = {
	type: typeof cartTypes.CART_INCREASE_ITEM_QUANTITY;
	payload: number;
};

export type CartDecreaseCartItemQuantityActionType = {
	type: typeof cartTypes.CART_DECREASE_ITEM_QUANTITY;
	payload: number;
};

export type CartClearCartItemActionType = {
	type: typeof cartTypes.CART_CLEAR;
};

export type CartReducerActionType =
	| CartAddCartItemActionType
	| CartDeleteCartItemActionType
	| CartIncreaseCartItemQuantityActionType
	| CartDecreaseCartItemQuantityActionType
	| CartClearCartItemActionType;
