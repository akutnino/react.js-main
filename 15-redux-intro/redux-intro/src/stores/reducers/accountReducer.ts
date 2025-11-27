import type { AccountReducerActionType } from '../../types/stores/actions/account-types.ts';
import type { ReduxBankInitialStateType } from '../../types/stores/reducers/types.ts';

const REDUX_BANK_INITIAL_STATE: ReduxBankInitialStateType = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
	isLoading: false,
};

const accountReducer = (
	currentState = REDUX_BANK_INITIAL_STATE,
	action: AccountReducerActionType
): ReduxBankInitialStateType => {
	switch (action.type) {
		case 'account/deposit': {
			return {
				...currentState,
				balance: currentState.balance + action.payload,
				isLoading: false,
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
				balance: currentState.balance + action.payload.amount,
				loan: action.payload.amount,
				loanPurpose: action.payload.purpose,
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
		case 'account/convertingCurrency': {
			return {
				...currentState,
				isLoading: true,
			};
		}
		default: {
			return currentState;
		}
	}
};

export { accountReducer, REDUX_BANK_INITIAL_STATE };
