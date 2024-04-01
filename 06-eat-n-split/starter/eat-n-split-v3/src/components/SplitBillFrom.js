import { useState } from 'react';
import Button from './Button';

export default function SplitBillFrom(props) {
	const {
		currentSelectedFriend,
		setCurrentSelectedFriend,
		setFriendsListArray
	} = props;
	const { id, name, image, balance } = currentSelectedFriend;
	const [totalBillValue, setTotalBillValue] = useState(Number(0));
	const [userTotalExpense, setUserTotalExpense] = useState(Number(0));
	const [billPayor, setBillPayor] = useState('user');
	const friendTotalExpense = totalBillValue - userTotalExpense;

	const handleBillValueInput = (event) => {
		const targetValue = event.target.value;
		setTotalBillValue(Number(targetValue));
	};

	const handleUserExpenseInput = (event) => {
		const targetValue = event.target.value;
		setUserTotalExpense(Number(targetValue));
	};

	const handleSelectedPayorInput = (event) => {
		const targetValue = event.target.value;
		setBillPayor(targetValue);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (totalBillValue === Number(0)) return;

		if (billPayor === 'user') {
			const newFriendBalance = balance + friendTotalExpense;

			setFriendsListArray((currentState) =>
				currentState.map((friendObject) =>
					friendObject?.id === id
						? { ...friendObject, balance: newFriendBalance }
						: friendObject
				)
			);
		}

		if (billPayor === 'friend') {
			const newFriendBalance = balance - userTotalExpense;

			setFriendsListArray((currentState) =>
				currentState.map((friendObject) =>
					friendObject?.id === id
						? { ...friendObject, balance: newFriendBalance }
						: friendObject
				)
			);
		}

		setTotalBillValue(Number(0));
		setUserTotalExpense(Number(0));
		setBillPayor('user');
		setCurrentSelectedFriend(null);
	};

	return (
		<form
			className='form-split-bill'
			onSubmit={handleSubmit}
		>
			<h2>Split a bill with {name}</h2>

			<label>💰 Bill Value</label>
			<input
				type='number'
				onChange={handleBillValueInput}
				value={totalBillValue}
			/>

			<label>🧍‍♂️ Your Expense</label>
			<input
				type='number'
				onChange={handleUserExpenseInput}
				value={userTotalExpense}
			/>

			<label>🧑‍🤝‍👩 {name}'s Expense</label>
			<input
				type='number'
				disabled
				value={friendTotalExpense}
			/>

			<label>🤑 Who is Paying the Bill?</label>
			<select onChange={handleSelectedPayorInput}>
				<option value='user'>You</option>
				<option value='friend'>{name}</option>
			</select>

			<Button>Split Bill</Button>
		</form>
	);
}
