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

const {
	reducer,
	actions: { deposit, withdraw, requestLoan, payLoan },
} = accountSlice;

export { reducer as default, deposit, withdraw, requestLoan, payLoan };
