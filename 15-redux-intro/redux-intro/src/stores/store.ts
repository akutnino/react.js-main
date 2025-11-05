import { legacy_createStore as createStore, type Store } from 'redux';
import type {
	ReducerActionType,
	ReduxBankInitialStateType,
} from '../types/stores/type.ts';

const REDUX_BANK_INITIAL_STATE: ReduxBankInitialStateType = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
};

function reducer(
	currentState: ReduxBankInitialStateType = REDUX_BANK_INITIAL_STATE,
	action: ReducerActionType
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

const store: Store<ReduxBankInitialStateType, ReducerActionType> = createStore(reducer);

store.dispatch({ type: 'account/deposit', payload: 500 });
console.log(store.getState());

store.dispatch({ type: 'account/withdraw', payload: 200 });
console.log(store.getState());

store.dispatch({
	type: 'account/requestLoan',
	payload: {
		amount: 1000,
		purpose: 'buy a car',
	},
});
console.log(store.getState());

store.dispatch({ type: 'account/payLoan' });
console.log(store.getState());
