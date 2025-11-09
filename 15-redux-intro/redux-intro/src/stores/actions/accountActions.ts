import type {
	AccountDepositActionType,
	AccountPayLoanActionType,
	AccountRequestLoanActionType,
	AccountWithdrawActionType,
} from '../../types/stores/actions/types.ts';

export function deposit(depositAmount: number): AccountDepositActionType {
	return {
		type: 'account/deposit',
		payload: depositAmount,
	};
}

export function withdraw(withdrawAmount: number): AccountWithdrawActionType {
	return {
		type: 'account/withdraw',
		payload: withdrawAmount,
	};
}

export function requestLoan(
	requestLoanAmount: number,
	loanPurpose: string
): AccountRequestLoanActionType {
	return {
		type: 'account/requestLoan',
		payload: {
			amount: requestLoanAmount,
			purpose: loanPurpose,
		},
	};
}

export function payLoan(): AccountPayLoanActionType {
	return { type: 'account/payLoan' };
}
