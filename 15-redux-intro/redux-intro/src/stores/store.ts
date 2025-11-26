import {
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore,
} from 'redux';
import { thunk, type ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { accountReducer, REDUX_BANK_INITIAL_STATE } from './reducers/accountReducer.ts';
import { customerReducer, CUSTOMER_INITIAL_STATE } from './reducers/customerReducer.ts';
import type {
	AppActions,
	AppState,
	RootReducerType,
	StoreType,
} from '../types/stores/types.ts';
import type {
	CustomerInitialStateType,
	ReduxBankInitialStateType,
} from '../types/stores/reducers/types.ts';

const preLoadedState: {
	account: ReduxBankInitialStateType;
	customer: CustomerInitialStateType;
} = {
	account: REDUX_BANK_INITIAL_STATE,
	customer: CUSTOMER_INITIAL_STATE,
};

const rootReducer: RootReducerType = combineReducers({
	account: accountReducer,
	customer: customerReducer,
});

const store: StoreType = createStore<AppState, AppActions, {}, {}>(
	rootReducer,
	preLoadedState,
	composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>))
);

export { store as default, rootReducer, preLoadedState };
