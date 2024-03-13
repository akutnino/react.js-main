import { useState } from 'react';
import Button from './Button';

export default function BillSplitForm(props) {
	const { selectedFriendObject, onBillSpliting } = props;
	const [billValue, setBillValue] = useState('');
	const [myExpense, setMyExpense] = useState('');
	const [billPayor, setBillPayor] = useState('user');
	const friendExpense = billValue - myExpense;

	const handleBillValueInput = (event) => {
		const targetValue = event.target.value;
		setBillValue(Number(targetValue));
	};

	const handleMyExpenseInput = (event) => {
		const targetValue = event.target.value;
		setMyExpense(Number(targetValue));
	};

	const handleBillPayorInput = (event) => {
		const targetValue = event.target.value;
		setBillPayor(targetValue);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();

		if (billValue === '' || myExpense === '') return;

		const billSplitObject = {
			billValue: billValue,
			myExpense: myExpense,
			friendExpense: friendExpense,
			billPayor: billPayor
		};

		onBillSpliting(billSplitObject, selectedFriendObject);
		setBillValue('');
		setMyExpense('');
		setBillPayor('user');
	};

	return (
		<form
			className='form-split-bill'
			onSubmit={handleFormSubmit}
		>
			<h2>Split a bill with {selectedFriendObject.name}</h2>

			<label>💰 Bill Value</label>
			<input
				type='number'
				onChange={handleBillValueInput}
				value={billValue}
			/>

			<label>🧍‍♂️ Your Expense</label>
			<input
				type='number'
				onChange={handleMyExpenseInput}
				value={myExpense}
			/>

			<label>🧑‍🤝‍👩 {selectedFriendObject.name}'s Expense</label>
			<input
				type='number'
				disabled
				value={friendExpense}
			/>

			<label>🤑 Who is paying the bill?</label>
			<select
				onChange={handleBillPayorInput}
				value={billPayor}
			>
				<option value='user'>You</option>
				<option value='friend'>{selectedFriendObject.name}</option>
			</select>

			<Button>Split Bill</Button>
		</form>
	);
}
