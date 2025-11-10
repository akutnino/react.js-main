import { combineReducers, legacy_createStore as createStore } from 'redux';
import { accountReducer } from './reducers/accountReducer.ts';
import { customerReducer } from './reducers/customerReducer.ts';

const rootReducer = combineReducers({
	account: accountReducer,
	customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;
