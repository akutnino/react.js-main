import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE_ACCOUNT = {
	balance: 0,
	loanBalance: 0,
	loanPurpose: '',
	isLoading: false,
};

const accountSlice = createSlice({
	name: 'account',
	initialState: INITIAL_STATE_ACCOUNT,
	reducers: {
		deposit: (currentState, action) => {
			currentState.balance = currentState.balance + action.payload;
			currentState.isLoading = false;
		},
		withdraw: (currentState, action) => {
			currentState.balance = currentState.balance - action.payload;
		},
		requestLoan: {
			prepare: (loanAmount, loanPurpose) => {
				return { payload: { loanAmount, loanPurpose } };
			},
			reducer: (currentState, action) => {
				if (currentState.loanBalance > 0) return;
				currentState.balance = currentState.balance + action.payload.loanAmount;
				currentState.loanBalance = action.payload.loanAmount;
				currentState.loanPurpose = action.payload.loanPurpose;
			},
		},
		payLoan: (currentState) => {
			currentState.balance = currentState.balance - currentState.loanBalance;
			currentState.loanBalance = 0;
			currentState.loanPurpose = '';
		},
		convertingCurrency: (currentState) => {
			currentState.isLoading = true;
		},
	},
});

function deposit(amount, currency) {
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

const {
	reducer,
	actions: { withdraw, requestLoan, payLoan },
} = accountSlice;

export { reducer as default, deposit, withdraw, requestLoan, payLoan };
