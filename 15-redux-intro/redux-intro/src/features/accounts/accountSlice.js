const INITIAL_STATE_ACCOUNT = {
	balance: 0,
	loanBalance: 0,
	loanPurpose: '',
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

export function deposit(amount) {
	return { type: 'account/deposit', payload: amount };
}

export function withdraw(amount) {
	return { type: 'account/withdraw', payload: amount };
}

export function requestLoan(amount, purpose) {
	return { type: 'account/requestLoan', payload: { amount, purpose } };
}

export function payload() {
	return { type: 'account/payLoan' };
}

export default accountReducer;
