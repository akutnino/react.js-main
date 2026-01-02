import {
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore,
} from 'redux';
import { thunk, type ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { MENU_INITIAL_STATE, menuReducer } from './reducers/menuReducer.ts';
import { ORDER_INITIAL_STATE, orderReducer } from './reducers/orderReducer.ts';
import type { MenuInitialStateType } from '../types/stores/reducers/menu-types.ts';
import type { OrderInitialStateType } from '../types/stores/reducers/order-types.ts';
import type {
	AppActions,
	AppState,
	RootReducerType,
	StoreType,
} from '../types/stores/types.ts';

const preLoadedState: {
	menu: MenuInitialStateType;
	order: OrderInitialStateType;
} = {
	menu: MENU_INITIAL_STATE,
	order: ORDER_INITIAL_STATE,
};

const rootReducer: RootReducerType = combineReducers({
	menu: menuReducer,
	order: orderReducer,
});

const store: StoreType = createStore(
	rootReducer,
	preLoadedState,
	composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>))
);

export { store as default, rootReducer, preLoadedState };
