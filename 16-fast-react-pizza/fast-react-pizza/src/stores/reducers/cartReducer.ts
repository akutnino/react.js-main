import type { CartReducerActionType } from '../../types/stores/actions/cart-types.ts';
import type {
	CartInitialStateType,
	CartItemType,
	CartType,
} from '../../types/stores/reducers/cart-types.ts';
import { cartTypes } from '../_constants/cartTypes.ts';

const CART_INITIAL_STATE: CartInitialStateType = {
	cart: null,
};

function cartReducer(
	currentState = CART_INITIAL_STATE,
	action: CartReducerActionType
): CartInitialStateType {
	switch (action.type) {
		case cartTypes.CART_ADD_ITEM: {
			if (currentState.cart === null) return { ...currentState, cart: [action.payload] };

			return {
				...currentState,
				cart: [...currentState.cart, action.payload],
			};
		}
		case cartTypes.CART_DELETE_ITEM: {
			if (currentState.cart === null) return { ...currentState };

			const filteredCart: CartItemType[] = currentState.cart.filter(
				(item) => item.pizzaId !== action.payload
			);

			const isFilteredCartEmpty: boolean = filteredCart?.length === 0;
			const updatedCart: CartType = isFilteredCartEmpty ? null : filteredCart;

			return {
				...currentState,
				cart: updatedCart,
			};
		}
		case cartTypes.CART_INCREASE_ITEM_QUANTITY: {
			if (currentState.cart === null) return { ...currentState };

			const cartItem = currentState.cart.find((item) => item.pizzaId === action.payload);
			if (cartItem === undefined) return { ...currentState };

			const updatedItemQuantity: number = cartItem.quantity + 1;
			const updatedItemTotalPrice: number = updatedItemQuantity * cartItem.unitPrice;

			const updatedCartItem: CartItemType = {
				...cartItem,
				quantity: updatedItemQuantity,
				totalPrice: updatedItemTotalPrice,
			};

			return {
				...currentState,
				cart: [...currentState.cart, updatedCartItem],
			};
		}
		case cartTypes.CART_DECREASE_ITEM_QUANTITY: {
			if (currentState.cart === null) return { ...currentState };

			const cartItem = currentState.cart.find((item) => item.pizzaId === action.payload);
			if (cartItem === undefined) return { ...currentState };

			const updatedItemQuantity: number = cartItem.quantity - 1;
			const updatedItemTotalPrice: number = updatedItemQuantity * cartItem.unitPrice;

			const updatedCartItem: CartItemType = {
				...cartItem,
				quantity: updatedItemQuantity,
				totalPrice: updatedItemTotalPrice,
			};

			return {
				cart: [...currentState.cart, updatedCartItem],
			};
		}
		case cartTypes.CART_CLEAR: {
			return {
				...currentState,
				cart: null,
			};
		}
		default: {
			return currentState;
		}
	}
}

export { cartReducer, CART_INITIAL_STATE };
