import type { ReduxBankInitialStateType } from '../types/stores/type.ts';

const REDUX_BANK_INITIAL_STATE: ReduxBankInitialStateType = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
};

function reducer(
	currentState: ReduxBankInitialStateType,
	action
): ReduxBankInitialStateType {
	switch (action.type) {
		case 'account/deposit': {
			return {
				...currentState,
				balance: currentState.balance + action.payload,
			};
		}
		case 'account/withdraw': {
			return {
				...currentState,
				balance: currentState.balance - action.payload,
			};
		}
		case 'account/requestLoan': {
			if (currentState.loan > 0) return currentState;

			return {
				...currentState,
				balance: currentState.balance - action.payload,
				loan: action.payload,
			};
		}
		case 'account/payLoan': {
			return {
				...currentState,
				balance: currentState.balance - currentState.loan,
				loan: 0,
				loanPurpose: '',
			};
		}
		default: {
			return currentState;
		}
	}
}
