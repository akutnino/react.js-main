export type ReduxBankInitialStateType = {
	balance: number;
	loan: number;
	loanPurpose: string;
};

export type CustomerInitialStateType = {
	fullName: string;
	nationalID: string;
	createdAt: string;
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

export type AccountReducerActionType =
	| AccountDepositActionType
	| AccountWithdrawActionType
	| AccountRequestLoanActionType
	| AccountPayLoanActionType;

export type CustomerCreateCustomerActionType = {
	type: 'customer/createCustomer';
	payload: CustomerInitialStateType;
};

export type CustomerUpdateNameActionType = {
	type: 'customer/updateName';
	payload: string;
};

export type CustomerReducerActionType =
	| CustomerCreateCustomerActionType
	| CustomerUpdateNameActionType;
