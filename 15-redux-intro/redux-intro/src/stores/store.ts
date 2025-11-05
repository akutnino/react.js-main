import { legacy_createStore as createStore, type Store } from 'redux';
import type {
	AccountDepositActionType,
	AccountPayLoanActionType,
	AccountRequestLoanActionType,
	AccountWithdrawActionType,
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

// store.dispatch({ type: 'account/deposit', payload: 500 });
// console.log(store.getState());

// store.dispatch({ type: 'account/withdraw', payload: 200 });
// console.log(store.getState());

// store.dispatch({
// 	type: 'account/requestLoan',
// 	payload: {
// 		amount: 1000,
// 		purpose: 'buy a car',
// 	},
// });
// console.log(store.getState());

// store.dispatch({ type: 'account/payLoan' });
// console.log(store.getState());

function deposit(depositAmount: number): AccountDepositActionType {
	return {
		type: 'account/deposit',
		payload: depositAmount,
	};
}

function withdraw(withdrawAmount: number): AccountWithdrawActionType {
	return {
		type: 'account/withdraw',
		payload: withdrawAmount,
	};
}

function requestLoan(
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

function payLoan(): AccountPayLoanActionType {
	return { type: 'account/payLoan' };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(1000, 'buy a car'));
store.dispatch(payLoan());
console.log(store.getState());
