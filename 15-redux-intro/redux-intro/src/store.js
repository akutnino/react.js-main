const INITIAL_STATE = {
	balance: 0,
	loanBalance: 0,
	loanPurpose: '',
};

const reducerFunc = (currentState = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'account/deposit':
			return {
				balance: currentState.balance + action.payload,
				...currentState,
			};

		case 'account/withdraw':
			return {
				balance: currentState.balance - action.payload,
				...currentState,
			};

		case 'account/requestLoan':
			if (currentState.loanBalance > 0) return currentState;
			return {
				loanBalance: action.payload,
				...currentState,
			};

		case 'account/payLoan':
			return {
				balance: currentState.balance - currentState.loanBalance,
				loanBalance: 0,
				loanPurpose: '',
				...currentState,
			};

		default:
			return currentState;
	}
};
