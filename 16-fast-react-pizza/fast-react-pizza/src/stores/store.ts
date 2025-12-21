import {
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore,
} from 'redux';
import { thunk, type ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { MENU_INITIAL_STATE, menuReducer } from './reducers/menuReducer.ts';
import type { MenuInitialStateType } from '../types/stores/reducers/types.ts';
import type {
	AppActions,
	AppState,
	RootReducerType,
	StoreType,
} from '../types/stores/types.ts';

const preLoadedState: {
	menu: MenuInitialStateType;
} = {
	menu: MENU_INITIAL_STATE,
};

const rootReducer: RootReducerType = combineReducers({
	menu: menuReducer,
});

const store: StoreType = createStore(
	rootReducer,
	preLoadedState,
	composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>))
);

export { store as default, rootReducer, preLoadedState };
