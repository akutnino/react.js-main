import { combineReducers, legacy_createStore as createStore } from 'redux';
import { accountReducer } from './reducers/accountReducer.ts';
import { customerReducer } from './reducers/customerReducer.ts';
import { deposit, payLoan, requestLoan, withdraw } from './actions/accountActions.ts';
import { createCustomer, updateName } from './actions/customerActions.ts';

const rootReducer = combineReducers({
	account: accountReducer,
	customer: customerReducer,
});

const store = createStore(rootReducer);

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(1000, 'buy a car'));
store.dispatch(payLoan());
console.log(store.getState());

store.dispatch(createCustomer('Nino Akut', '121212'));
console.log(store.getState());
store.dispatch(updateName('LeBron James'));
console.log(store.getState());
