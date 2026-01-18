import type { CartReducerActionType } from '../../types/stores/actions/cart-types.ts';
import type { CartInitialStateType } from '../../types/stores/reducers/cart-types.ts';

const CART_INITIAL_STATE: CartInitialStateType = {
	cart: null,
};

function cartReducer(
	currentState = CART_INITIAL_STATE,
	action: CartReducerActionType
): CartInitialStateType {
	switch (action.type) {
		case 'cart/addCartItem': {
			return {
				...currentState,
			};
		}
		case 'cart/deleteCartItem': {
			return {
				...currentState,
			};
		}
		case 'cart/increaseCartItemQuantity': {
			return {
				...currentState,
			};
		}
		case 'cart/decreaseCartItemQuantity': {
			return {
				...currentState,
			};
		}
		case 'cart/clearCart': {
			return {
				...currentState,
			};
		}
		default: {
			return currentState;
		}
	}
}

export { cartReducer, CART_INITIAL_STATE };
