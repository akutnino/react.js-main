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

function deposit(amount) {
	return { type: 'account/deposit', payload: amount };
}

function withdraw(amount) {
	return { type: 'account/withdraw', payload: amount };
}

function requestLoan(amount, purpose) {
	return { type: 'account/requestLoan', payload: { amount, purpose } };
}

function payload() {
	return { type: 'account/payLoan' };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(1000, 'buy a car'));
store.dispatch(payload());

console.log(store.getState());
