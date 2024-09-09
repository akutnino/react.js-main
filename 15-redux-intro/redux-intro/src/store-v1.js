import { combineReducers, createStore } from 'redux';

const INITIAL_STATE_ACCOUNT = {
	balance: 0,
	loanBalance: 0,
	loanPurpose: '',
};

const INITIAL_STATE_CUSTOMER = {
	fullName: '',
	nationalID: '',
	createdAt: '',
};

const accountReducer = (currentState = INITIAL_STATE_ACCOUNT, action) => {
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

const customerReducer = (currentState = INITIAL_STATE_CUSTOMER, action) => {
	switch (action.type) {
		case 'customer/createCustomer':
			return {
				...currentState,
				fullName: action.payload.fullName,
				nationalID: action.payload.nationalID,
				createdAt: action.payload.createdAt,
			};

		case 'customer/updateName':
			return {
				...currentState,
				fullName: action.payload,
			};

		default:
			return currentState;
	}
};

const rootReducer = combineReducers({
	account: accountReducer,
	customer: customerReducer,
});

const store = createStore(rootReducer);

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

function createCustomer(fullName, nationalID) {
	return {
		type: 'customer/createCustomer',
		payload: {
			fullName,
			nationalID,
			createdAt: new Date().toISOString(),
		},
	};
}

function updateName(fullName) {
	return { type: 'customer/updateName', payload: fullName };
}

store.dispatch(createCustomer('Nino Akut', '2rewf4wfw4f'));
store.dispatch(updateName('Louis Aranas'));
console.log(store.getState());
