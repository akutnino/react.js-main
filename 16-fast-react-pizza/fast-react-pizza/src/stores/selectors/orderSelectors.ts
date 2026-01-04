import type { OrderInitialStateType } from '../../types/stores/reducers/order-types.ts';
import type { AppState } from '../../types/stores/types.ts';

const selectOrder = (store: AppState): OrderInitialStateType => store.order;

export { selectOrder };
