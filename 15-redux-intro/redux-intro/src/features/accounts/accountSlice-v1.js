const INITIAL_STATE_ACCOUNT = {
	balance: 0,
	loanBalance: 0,
	loanPurpose: '',
	isLoading: false,
};

const accountReducer = (currentState = INITIAL_STATE_ACCOUNT, action) => {
	switch (action.type) {
		case 'account/deposit':
			return {
				...currentState,
				balance: currentState.balance + action.payload,
				isLoading: false,
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

		case 'account/convertingCurrency':
			return {
				...currentState,
				isLoading: true,
			};

		default:
			return currentState;
	}
};

export function deposit(amount, currency) {
	if (currency === 'USD') return { type: 'account/deposit', payload: amount };
	return async (dispatch, getState) => {
		try {
			dispatch({ type: 'account/convertingCurrency' });

			const host = 'api.frankfurter.app';
			const fetchURL = `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`;
			const fetchOptions = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			};

			const response = await fetch(fetchURL, fetchOptions);
			if (!response.ok) throw new Error('FETCH RESPONSE FAILED');

			const data = await response.json();
			const convertedAmount = data.rates.USD;

			dispatch({ type: 'account/deposit', payload: convertedAmount });
		} catch (error) {
			console.error({ error });
		}
	};
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
