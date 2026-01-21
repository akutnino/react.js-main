import type {
	CartAddCartItemActionType,
	CartClearCartItemActionType,
	CartDecreaseCartItemQuantityActionType,
	CartDeleteCartItemActionType,
	CartIncreaseCartItemQuantityActionType,
} from '../../types/stores/actions/cart-types.ts';
import { cartTypes } from '../_constants/cartTypes.ts';
import type { CartItemType } from '../../types/stores/reducers/cart-types.ts';

export function cartAddItem(newCartItem: CartItemType): CartAddCartItemActionType {
	return {
		type: cartTypes.CART_ADD_ITEM,
		payload: newCartItem,
	};
}

export function cartDeleteItem(pizzaID: number): CartDeleteCartItemActionType {
	return {
		type: cartTypes.CART_DELETE_ITEM,
		payload: pizzaID,
	};
}

export function cartIncreaseItemQuantity(
	pizzaID: number
): CartIncreaseCartItemQuantityActionType {
	return {
		type: cartTypes.CART_INCREASE_ITEM_QUANTITY,
		payload: pizzaID,
	};
}

export function cartDecreaseItemQuantity(
	pizzaID: number
): CartDecreaseCartItemQuantityActionType {
	return {
		type: cartTypes.CART_DECREASE_ITEM_QUANTITY,
		payload: pizzaID,
	};
}

export function clearCart(): CartClearCartItemActionType {
	return { type: cartTypes.CART_CLEAR };
}
