import { createStore } from 'redux';

const INITIAL_STATE = {
	balance: 0,
	loanBalance: 0,
	loanPurpose: '',
};

const reducerFunc = (currentState = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'account/deposit':
			return {
				...currentState,
				balance: currentState.balance + action.payload,
			};

		case 'account/withdraw':
			return {
				...currentState,
				balance: currentState.balance - action.payload,
			};

		case 'account/requestLoan':
			if (currentState.loanBalance > 0) return currentState;
			return {
				...currentState,
				balance: currentState.balance + action.payload.amount,
				loanBalance: action.payload.amount,
				loanPurpose: action.payload.purpose,
			};

		case 'account/payLoan':
			return {
				...currentState,
				balance: currentState.balance - currentState.loanBalance,
				loanBalance: 0,
				loanPurpose: '',
			};

		default:
			return currentState;
	}
};

const store = createStore(reducerFunc);

store.dispatch({ type: 'account/deposit', payload: 500 });
store.dispatch({ type: 'account/withdraw', payload: 400 });
store.dispatch({
	type: 'account/requestLoan',
	payload: { amount: 1000, purpose: 'buy a car' },
});
store.dispatch({ type: 'account/payLoan' });

console.log(store.getState());
