import { useState } from 'react';

const initialFriends = [
	{
		id: 118836,
		name: 'Clark',
		image: 'https://i.pravatar.cc/48?u=118836',
		balance: -7
	},
	{
		id: 933372,
		name: 'Sarah',
		image: 'https://i.pravatar.cc/48?u=933372',
		balance: 20
	},
	{
		id: 499476,
		name: 'Anthony',
		image: 'https://i.pravatar.cc/48?u=499476',
		balance: 0
	}
];

export default function App(props) {
	const [friendsListArray, setFriendsListArray] = useState(initialFriends);
	const [addFriendFormVisibility, setAddFriendFormVisibility] = useState(false);
	const [selectedFriendObject, setSelectedFriendObject] = useState(null);

	const handleAddFriendClick = () => {
		setAddFriendFormVisibility((currentState) => !currentState);
	};

	const handleSelectedFriend = (friendItemObject) => {
		return () =>
			setSelectedFriendObject((currentState) =>
				currentState === friendItemObject ? null : friendItemObject
			);
	};

	const handleNewAddedFriend = (newAddedFriendObject) => {
		setFriendsListArray((currentState) => [
			...currentState,
			newAddedFriendObject
		]);
		setAddFriendFormVisibility(false);
	};

	const handleBillSpliting = (billSplitObject, selectedFriendObject) => {
		const { billValue, myExpense, friendExpense, billPayor } = billSplitObject;
		const iPaidTheBill = billPayor === 'user';
		const friendPaidTheBill = billPayor === 'friend';

		if (iPaidTheBill) {
			const newFriendBalance = billValue - myExpense;

			setFriendsListArray((currentState) => {
				return currentState.map((friend) => {
					const newBalance = friend.balance + newFriendBalance;
					const updatedFriendObject = {
						...friend,
						balance: newBalance
					};
					const newArray =
						friend.id === selectedFriendObject.id
							? updatedFriendObject
							: friend;

					return newArray;
				});
			});
		}

		if (friendPaidTheBill) {
			const newFriendBalance = billValue - friendExpense;

			setFriendsListArray((currentState) => {
				return currentState.map((friend) => {
					const newBalance = friend.balance - newFriendBalance;
					const updatedFriendObject = {
						...friend,
						balance: newBalance
					};
					const newArray =
						friend.id === selectedFriendObject.id
							? updatedFriendObject
							: friend;

					return newArray;
				});
			});
		}

		setSelectedFriendObject(null);
	};

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList
					onSelectedFriend={handleSelectedFriend}
					selectedFriendObject={selectedFriendObject}
					friendsListArray={friendsListArray}
				/>
				{addFriendFormVisibility && (
					<AddFriendForm onAddNewFriend={handleNewAddedFriend} />
				)}

				<Button onClick={handleAddFriendClick}>
					{addFriendFormVisibility ? 'Close' : 'Add Friend'}
				</Button>
			</div>

			{selectedFriendObject && (
				<BillSplitForm
					selectedFriendObject={selectedFriendObject}
					onBillSpliting={handleBillSpliting}
				/>
			)}
		</div>
	);
}

function FriendsList(props) {
	const { onSelectedFriend, selectedFriendObject, friendsListArray } = props;

	return (
		<ul>
			{friendsListArray.map((friend) => (
				<FriendItem
					friend={friend}
					key={friend.id}
					onSelectedFriend={onSelectedFriend}
					selectedFriendObject={selectedFriendObject}
				/>
			))}
		</ul>
	);
}

function FriendItem(props) {
	const { friend, onSelectedFriend, selectedFriendObject } = props;
	const currentlySelected = friend === selectedFriendObject;

	// prettier-ignore
	return (
		<li>
			<img
				src={friend.image}
				alt={friend.name}
			/>
			<h3>{friend.name}</h3>

			{friend.balance > 0 && (
				<p className='green'>
					{friend.name} ows you ${Math.abs(friend.balance)}.
				</p>
			)}

			{friend.balance < 0 && (
				<p className='red'>
					You owe {friend.name} ${Math.abs(friend.balance)}.
				</p>
			)}

			{friend.balance === 0 && (
				<p className='gray'>
          You and {friend.name} are currently even.
        </p>
			)}

			<Button onClick={onSelectedFriend(friend)}>
				{currentlySelected ? 'Close' : 'Select'}
			</Button>
		</li>
	);
}

function Button(props) {
	const { onClick, children } = props;

	return (
		<button
			className='button'
			onClick={onClick}
		>
			{children}
		</button>
	);
}

function AddFriendForm(props) {
	const { onAddNewFriend } = props;
	const [newAddedFriendName, setNewAddedFriendName] = useState('');
	const [newAddedFriendImage, setNewAddedFriendImage] = useState(
		'https://i.pravatar.cc/48?u='
	);

	const handleFriendNameInput = (event) => {
		const targetValue = event.target.value;
		setNewAddedFriendName(targetValue);
	};

	const handleFriendImageInput = (event) => {
		const targetValue = event.target.value;
		setNewAddedFriendImage(targetValue);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();

		if (!newAddedFriendName) return;

		const id = crypto.randomUUID();
		const newAddedFriendObject = {
			id,
			name: newAddedFriendName,
			image: `https://i.pravatar.cc/48?u=${id}`,
			balance: 0
		};

		onAddNewFriend(newAddedFriendObject);
		setNewAddedFriendName('');
		setNewAddedFriendImage('https://i.pravatar.cc/48?u=');
	};

	return (
		<form
			className='form-add-friend'
			onSubmit={handleFormSubmit}
		>
			<label>🧍New Friend</label>
			<input
				type='text'
				onChange={handleFriendNameInput}
				value={newAddedFriendName}
			/>

			<label>📷 Image URL</label>
			<input
				type='text'
				onChange={handleFriendImageInput}
				value={newAddedFriendImage}
			/>

			<Button>Add</Button>
		</form>
	);
}

function BillSplitForm(props) {
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
