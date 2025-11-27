export type AccountDepositActionType = {
	type: 'account/deposit';
	payload: number;
};

export type AccountWithdrawActionType = {
	type: 'account/withdraw';
	payload: number;
};

export type AccountRequestLoanActionType = {
	type: 'account/requestLoan';
	payload: {
		amount: number;
		purpose: string;
	};
};

export type AccountPayLoanActionType = {
	type: 'account/payLoan';
};

export type AccountConvertingCurrencyActionType = {
	type: 'account/convertingCurrency';
};

export type AccountReducerActionType =
	| AccountDepositActionType
	| AccountWithdrawActionType
	| AccountRequestLoanActionType
	| AccountPayLoanActionType
	| AccountConvertingCurrencyActionType;
