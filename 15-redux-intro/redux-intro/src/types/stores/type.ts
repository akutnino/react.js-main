export type ReduxBankInitialStateType = {
	balance: number;
	loan: number;
	loanPurpose: string;
};

type AccountDepositActionType = {
	type: 'account/deposit';
	payload: number;
};

type AccountWithdrawActionType = {
	type: 'account/withdraw';
	payload: number;
};

type AccountRequestLoanActionType = {
	type: 'account/requestLoan';
	payload: {
		amount: number;
		purpose: string;
	};
};

type AccountPayLoanActionType = {
	type: 'account/payLoan';
};

export type ReducerActionType =
	| AccountDepositActionType
	| AccountWithdrawActionType
	| AccountRequestLoanActionType
	| AccountPayLoanActionType;
