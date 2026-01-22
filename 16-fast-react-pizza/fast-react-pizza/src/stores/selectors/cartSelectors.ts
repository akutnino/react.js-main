import type {
	CartInitialStateType,
	CartItemType,
} from '../../types/stores/reducers/cart-types.ts';
import type { AppState } from '../../types/stores/types.ts';

const selectCart = (store: AppState): CartInitialStateType => store.cart;

const getTotalCartQuantity = (store: AppState): number => {
	if (store.cart.cart === null) return 0;
	return store.cart.cart.reduce((acc, curr: CartItemType) => acc + curr.quantity, 0);
};

const getTotalCartPrice = (store: AppState): number => {
	if (store.cart.cart === null) return 0;
	return store.cart.cart.reduce((acc, curr: CartItemType) => acc + curr.totalPrice, 0);
};

const getCartItemQuantityById = (pizzaID: number) => {
	return (store: AppState): number => {
		if (store.cart.cart === null) return 0;

		const item: CartItemType | undefined = store.cart.cart.find(
			(item) => item.pizzaId === pizzaID
		);

		if (item === undefined) return 0;
		return item.quantity;
	};
};

export { selectCart, getTotalCartQuantity, getTotalCartPrice, getCartItemQuantityById };
