import type { AsyncThunkAction } from '../../types/stores/types.ts';
import type { CurrencyType } from '../../types/components/types.ts';
import type {
	AccountDepositActionType,
	AccountPayLoanActionType,
	AccountRequestLoanActionType,
	AccountWithdrawActionType,
} from '../../types/stores/actions/account-types.ts';

export function deposit(
	depositAmount: number,
	currency: CurrencyType,
	url: string
): AccountDepositActionType | AsyncThunkAction<number> {
	const AccountDepositAction: AccountDepositActionType = {
		type: 'account/deposit',
		payload: depositAmount,
	};

	const ThunkMiddleware: AsyncThunkAction<number> = async (dispatch) => {
		try {
			dispatch({ type: 'account/convertingCurrency' });

			const fetchURL: RequestInfo = `${url}latest?base=${currency}&symbols=USD`;
			const fetchOptions: RequestInit = {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			};

			const response: Response = await fetch(fetchURL, fetchOptions);
			if (!response.ok) throw new Error('Fetch Response Failed');

			const data: {
				amount: number;
				base: CurrencyType;
				rates: {
					USD: number;
				};
			} = await response.json();

			const convertedAmount: number = Number((depositAmount * data.rates.USD).toFixed(2));

			dispatch({
				type: 'account/deposit',
				payload: convertedAmount,
			});
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
		}
	};

	if (currency === 'USD') return AccountDepositAction;
	return ThunkMiddleware;
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
