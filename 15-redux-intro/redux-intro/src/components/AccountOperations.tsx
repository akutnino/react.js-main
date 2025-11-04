import { useState } from 'react';

function AccountOperations() {
	const [depositAmount, setDepositAmount] = useState<null | number>(null);
	const [withdrawalAmount, setWithdrawalAmount] = useState<null | number>(null);
	const [loanAmount, setLoanAmount] = useState<null | number>(null);
	const [loanPurpose, setLoanPurpose] = useState<string>('');
	const [currency, setCurrency] = useState<string>('USD');

	const handleDeposit = () => {};

	const handleWithdrawal = () => {};

	const handleRequestLoan = () => {};

	const handlePayLoan = () => {};

	return (
		<div>
			<h2>Your account operations</h2>
			<div className='inputs'>
				<div>
					<label>Deposit</label>
					<input
						type='number'
						value={depositAmount ?? 0}
						onChange={(event) => setDepositAmount(Number(event.target.value))}
					/>
					<select
						value={currency}
						onChange={(event) => setCurrency(event.target.value)}
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
						value={withdrawalAmount ?? 0}
						onChange={(event) => setWithdrawalAmount(Number(event.target.value))}
					/>
					<button onClick={handleWithdrawal}>Withdraw {withdrawalAmount}</button>
				</div>

				<div>
					<label>Request loan</label>
					<input
						type='number'
						value={loanAmount ?? 0}
						onChange={(event) => setLoanAmount(Number(event.target.value))}
						placeholder='Loan amount'
					/>
					<input
						value={loanPurpose}
						onChange={(event) => setLoanPurpose(event.target.value)}
						placeholder='Loan purpose'
					/>
					<button onClick={handleRequestLoan}>Request loan</button>
				</div>

				<div>
					<span>Pay back $X</span>
					<button onClick={handlePayLoan}>Pay loan</button>
				</div>
			</div>
		</div>
	);
}

export default AccountOperations;
