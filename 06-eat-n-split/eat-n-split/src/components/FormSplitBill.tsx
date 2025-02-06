import { type ChangeEvent, type Dispatch, type FormEvent, useState } from 'react';
import { type FriendObjectType } from '../types/components/types.ts';
import Button from './Button.tsx';

function FormSplitBill({
	selectedFriend,
	setFriendsArray,
	setSelectedFriend,
}: {
	selectedFriend: FriendObjectType | null;
	setFriendsArray: Dispatch<React.SetStateAction<FriendObjectType[]>>;
	setSelectedFriend: Dispatch<React.SetStateAction<FriendObjectType | null>>;
}) {
	const [billValue, setBillValue] = useState<number>(0);
	const [userExpense, setUserExpense] = useState<number>(0);
	const [billPayer, setBillPayer] = useState<string>('user');
	const friendExpense: number = billValue - userExpense;

	const handleSubmit = (selectedFriend: FriendObjectType | null) => {
		return (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			if (!billValue) return;

			if (billPayer === 'user') {
				setFriendsArray((currentArray) =>
					currentArray.map((friend: FriendObjectType) =>
						friend.id === selectedFriend?.id
							? { ...friend, balance: selectedFriend.balance + friendExpense }
							: friend
					)
				);
			}

			if (billPayer === 'friend') {
				setFriendsArray((currentArray) =>
					currentArray.map((friend: FriendObjectType) =>
						friend.id === selectedFriend?.id
							? { ...friend, balance: selectedFriend.balance - userExpense }
							: friend
					)
				);
			}

			setBillValue(0);
			setUserExpense(0);
			setBillPayer('user');
			setSelectedFriend(null);
		};
	};

	const handleBillValue = (event: ChangeEvent<HTMLInputElement>) => {
		const userInput: number =
			Number(event.currentTarget.value) < userExpense
				? userExpense
				: Number(event.currentTarget.value);

		setBillValue(userInput);
	};

	const handleUserExpense = (event: ChangeEvent<HTMLInputElement>) => {
		const userInput: number =
			Number(event.currentTarget.value) <= 0
				? 0
				: Number(event.currentTarget.value) > billValue
				? billValue
				: Number(event.currentTarget.value);

		setUserExpense(userInput);
	};

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setBillPayer(event.currentTarget.value);
	};

	return (
		<form
			className='form-split-bill'
			onSubmit={handleSubmit(selectedFriend)}
			data-testid='formSplitBill'
		>
			<h2>Split a bill with {selectedFriend?.name}</h2>

			<label>💰 Bill Value</label>
			<input
				type='number'
				value={billValue}
				onChange={handleBillValue}
			/>

			<label>🧍‍♂️ Your Expense</label>
			<input
				type='number'
				value={userExpense}
				onChange={handleUserExpense}
			/>

			<label>🧑‍🤝‍👩 {selectedFriend?.name}'s Expense</label>
			<input
				type='number'
				value={friendExpense}
				disabled
			/>

			<label>🤑 Who is paying the bill?</label>
			<select
				onChange={handleChange}
				value={billPayer}
			>
				<option value='user'>You</option>
				<option value='friend'>{selectedFriend?.name}</option>
			</select>

			<Button type='submit'>Split Bill</Button>
		</form>
	);
}

export default FormSplitBill;
