export type ReduxBankInitialStateType = {
	balance: number;
	loan: number;
	loanPurpose: string;
	isLoading: boolean;
};

export type CustomerInitialStateType = {
	fullName: string;
	nationalID: string;
	createdAt: string;
};
