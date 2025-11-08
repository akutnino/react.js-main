import { combineReducers, legacy_createStore as createStore } from 'redux';
import type {
	AccountDepositActionType,
	AccountPayLoanActionType,
	AccountRequestLoanActionType,
	AccountWithdrawActionType,
	CustomerCreateCustomerActionType,
	CustomerInitialStateType,
	AccountReducerActionType,
	ReduxBankInitialStateType,
	CustomerReducerActionType,
	CustomerUpdateNameActionType,
} from '../types/stores/type.ts';

const REDUX_BANK_INITIAL_STATE: ReduxBankInitialStateType = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
};

const CUSTOMER_INITIAL_STATE: CustomerInitialStateType = {
	fullName: '',
	nationalID: '',
	createdAt: '',
};

function accountReducer(
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

function customerReducer(
	currentState: CustomerInitialStateType = CUSTOMER_INITIAL_STATE,
	action: CustomerReducerActionType
): CustomerInitialStateType {
	switch (action.type) {
		case 'customer/createCustomer': {
			return {
				...currentState,
				fullName: action.payload.fullName,
				nationalID: action.payload.nationalID,
				createdAt: action.payload.createdAt,
			};
		}
		case 'customer/updateName': {
			return {
				...currentState,
				fullName: action.payload,
			};
		}
		default: {
			return currentState;
		}
	}
}

const rootReducer = combineReducers({
	account: accountReducer,
	customer: customerReducer,
});

const store = createStore(rootReducer);

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

function createCustomer(
	fullName: string,
	nationalID: string
): CustomerCreateCustomerActionType {
	return {
		type: 'customer/createCustomer',
		payload: {
			fullName,
			nationalID,
			createdAt: new Date().toISOString(),
		},
	};
}

function updateName(updatedFullName: string): CustomerUpdateNameActionType {
	return {
		type: 'customer/updateName',
		payload: updatedFullName,
	};
}

store.dispatch(createCustomer('Nino Akut', '121212'));
console.log(store.getState());
store.dispatch(updateName('LeBron James'));
console.log(store.getState());
