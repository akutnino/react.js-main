import type { CartInitialStateType } from '../../types/stores/reducers/cart-types.ts';
import type { AppState } from '../../types/stores/types.ts';

const selectCart = (store: AppState): CartInitialStateType => store.cart;

export { selectCart };
