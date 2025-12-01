import useSWR from 'swr';
import { useState, type ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, AppState } from '../types/stores/types.ts';
import type { ReduxBankInitialStateType } from '../types/stores/reducers/types.ts';
import type {
	CurrencyType,
	DepositAmountType,
	FetcherReturnType,
} from '../types/components/types.ts';
import {
	deposit,
	payLoan,
	requestLoan,
	withdraw,
} from '../stores/actions/accountActions.ts';

const API_URL: string = import.meta.env.VITE_DEPOSIT_API;

const AccountOperationsKey = (depositAmount: DepositAmountType) => {
	return () => {
		if (typeof depositAmount !== 'number') return null;
		if (depositAmount <= 0) return null;

		return API_URL;
	};
};

const AccountOperationsFetcher = (
	dispatch: AppDispatch,
	depositAmount: DepositAmountType,
	currency: CurrencyType
) => {
	return () => {
		if (typeof depositAmount !== 'number') return;
		if (depositAmount <= 0) return;

		return dispatch(deposit(depositAmount, currency)) as FetcherReturnType;
	};
};

function AccountOperations() {
	const [depositAmount, setDepositAmount] = useState<DepositAmountType>(null);
	const [withdrawalAmount, setWithdrawalAmount] = useState<null | number>(null);
	const [loanAmount, setLoanAmount] = useState<null | number>(null);
	const [loanPurpose, setLoanPurpose] = useState<string>('');
	const [currency, setCurrency] = useState<CurrencyType>('USD');

	const dispatch: AppDispatch = useDispatch();
	const {
		loan: currentLoan,
		loanPurpose: currentLoanPurpose,
		balance,
		isLoading,
	}: ReduxBankInitialStateType = useSelector((store: AppState) => store.account);

	useSWR(
		AccountOperationsKey(depositAmount),
		AccountOperationsFetcher(dispatch, depositAmount, currency)
	);

	const depositBalance: number = balance - currentLoan;
	const isZeroBalance: boolean = balance === 0;
	const isPendingLoan: boolean = Number(withdrawalAmount) >= depositBalance + 1;

	const handleDepositInputAmount = (event: ChangeEvent<HTMLInputElement>) => {
		setDepositAmount(Number(event.target.value) < 0 ? 0 : Number(event.target.value));
	};

	const handleCurrencyInput = (event: ChangeEvent<HTMLSelectElement>) => {
		if (event.target.value === 'USD') setCurrency('USD');
		if (event.target.value === 'EUR') setCurrency('EUR');
		if (event.target.value === 'GBP') setCurrency('GBP');
	};

	const handleWithdrawInputAmount = (event: ChangeEvent<HTMLInputElement>) => {
		setWithdrawalAmount(Number(event.target.value) < 0 ? 0 : Number(event.target.value));
	};

	const handleLoanInputAmount = (event: ChangeEvent<HTMLInputElement>) => {
		setLoanAmount(Number(event.target.value) < 0 ? 0 : Number(event.target.value));
	};

	const handleLoanPurposeInput = (event: ChangeEvent<HTMLInputElement>) => {
		setLoanPurpose(event.target.value);
	};

	const handleDeposit = () => {
		if (!depositAmount) return;

		dispatch(deposit(depositAmount, currency));
		setDepositAmount(null);
		setCurrency('USD');
	};

	const handleWithdrawal = () => {
		if (!withdrawalAmount) return;

		dispatch(withdraw(withdrawalAmount));
		setWithdrawalAmount(null);
	};

	const handleRequestLoan = () => {
		if (!loanAmount || !loanPurpose) return;

		dispatch(requestLoan(loanAmount, loanPurpose));
		setLoanAmount(null);
		setLoanPurpose('');
	};

	const handlePayLoan = () => {
		if (!currentLoan) return;

		dispatch(payLoan());
	};

	return (
		<div>
			<h2>Your account operations</h2>
			<div className='inputs'>
				<div>
					<label>Deposit</label>
					<input
						type='number'
						value={depositAmount ?? 0}
						onChange={handleDepositInputAmount}
					/>
					<select
						value={currency}
						onChange={handleCurrencyInput}
					>
						<option value='USD'>US Dollar</option>
						<option value='EUR'>Euro</option>
						<option value='GBP'>British Pound</option>
					</select>

					<button
						type='button'
						onClick={handleDeposit}
						disabled={isLoading}
					>
						{isLoading ? 'Converting...' : `Deposit ${depositAmount ?? ''}`}
					</button>
				</div>

				{Boolean(depositBalance) && (
					<div>
						<label>Withdraw</label>
						<input
							type='number'
							value={withdrawalAmount ?? 0}
							onChange={handleWithdrawInputAmount}
						/>
						<button
							type='button'
							disabled={isPendingLoan || isZeroBalance}
							onClick={handleWithdrawal}
						>
							Withdraw {withdrawalAmount}
						</button>
					</div>
				)}

				{currentLoan === 0 && (
					<div>
						<label>Request Loan</label>
						<input
							type='number'
							value={loanAmount ?? 0}
							onChange={handleLoanInputAmount}
							placeholder='Loan amount'
						/>
						<input
							value={loanPurpose}
							onChange={handleLoanPurposeInput}
							placeholder='Loan purpose'
						/>
						<button
							type='button'
							onClick={handleRequestLoan}
						>
							Request loan
						</button>
					</div>
				)}

				{currentLoan > 0 && (
					<div>
						<span>
							Pay Back ${currentLoan} ({currentLoanPurpose})
						</span>
						<button
							type='button'
							disabled={balance < currentLoan}
							onClick={handlePayLoan}
						>
							Pay loan
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default AccountOperations;
