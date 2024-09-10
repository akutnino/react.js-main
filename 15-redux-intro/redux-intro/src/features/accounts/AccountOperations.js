import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deposit, payload, requestLoan, withdraw } from './accountSlice';

function AccountOperations() {
	const [depositAmount, setDepositAmount] = useState('');
	const [withdrawalAmount, setWithdrawalAmount] = useState('');
	const [loanAmount, setLoanAmount] = useState('');
	const [loanPurpose, setLoanPurpose] = useState('');
	const [currency, setCurrency] = useState('USD');
	const dispatch = useDispatch();
	const { loanBalance: currentLoanBalance, loanPurpose: currentLoanPurpose } =
		useSelector((store) => store.account);
	const isLoanBalanceEmpty = currentLoanBalance === 0;

	const handleDepositAmount = (event) => {
		setDepositAmount(Number(event.target.value));
	};

	const handleDepositCurrency = (event) => {
		setCurrency(event.target.value);
	};

	const handleWithdrawalAmount = (event) => {
		setWithdrawalAmount(Number(event.target.value));
	};

	const handleLoanAmount = (event) => {
		setLoanAmount(Number(event.target.value));
	};

	const handleLoanPurpose = (event) => {
		setLoanPurpose(event.target.value);
	};

	const handleDeposit = () => {
		if (!depositAmount) return;

		dispatch(deposit(depositAmount));
		setDepositAmount('');
	};

	const handleWithdrawal = () => {
		if (!withdrawalAmount) return;

		dispatch(withdraw(withdrawalAmount));
		setWithdrawalAmount('');
	};

	const handleRequestLoan = () => {
		if (!loanAmount || !loanPurpose) return;

		dispatch(requestLoan(loanAmount, loanPurpose));
		setLoanAmount('');
		setLoanPurpose('');
	};

	const handlePayLoan = () => {
		if (!currentLoanBalance) return;

		dispatch(payload());
	};

	return (
		<div>
			<h2>Your account operations</h2>
			<div className='inputs'>
				<div>
					<label>Deposit</label>
					<input
						type='number'
						value={depositAmount}
						onChange={handleDepositAmount}
					/>
					<select
						value={currency}
						onChange={handleDepositCurrency}
					>
						<option value='USD'>US Dollar</option>
						<option value='EUR'>Euro</option>
						<option value='GBP'>British Pound</option>
					</select>

					<button onClick={handleDeposit}>Deposit {depositAmount}</button>
				</div>

				<div>
					<label>Withdraw</label>
					<input
						type='number'
						value={withdrawalAmount}
						onChange={handleWithdrawalAmount}
					/>
					<button onClick={handleWithdrawal}>Withdraw {withdrawalAmount}</button>
				</div>

				<div>
					<label>Request loan</label>
					<input
						type='number'
						value={loanAmount}
						onChange={handleLoanAmount}
						placeholder='Loan amount'
					/>
					<input
						value={loanPurpose}
						onChange={handleLoanPurpose}
						placeholder='Loan purpose'
					/>
					<button onClick={handleRequestLoan}>Request loan</button>
				</div>

				{!isLoanBalanceEmpty && (
					<div>
						<span>
							Pay back ${currentLoanBalance} ( {currentLoanPurpose} )
						</span>
						<button onClick={handlePayLoan}>Pay loan</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default AccountOperations;
