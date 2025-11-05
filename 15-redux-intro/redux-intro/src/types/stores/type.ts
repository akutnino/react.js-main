export type ReduxBankInitialStateType = {
	balance: number;
	loan: number;
	loanPurpose: string;
};

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

export type ReducerActionType =
	| AccountDepositActionType
	| AccountWithdrawActionType
	| AccountRequestLoanActionType
	| AccountPayLoanActionType;
