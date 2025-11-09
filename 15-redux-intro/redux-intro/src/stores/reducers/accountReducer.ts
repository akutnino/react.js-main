import type { AccountReducerActionType } from '../../types/stores/actions/types.ts';
import type { ReduxBankInitialStateType } from '../../types/stores/reducers/types.ts';

const REDUX_BANK_INITIAL_STATE: ReduxBankInitialStateType = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
};

export function accountReducer(
	currentState: ReduxBankInitialStateType = REDUX_BANK_INITIAL_STATE,
	action: AccountReducerActionType
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
		default: {
			return currentState;
		}
	}
}
