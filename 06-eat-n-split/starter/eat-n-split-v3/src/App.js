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
	const [addFriendFormIsVisible, setAddFriendFormIsVisible] = useState(false);
	const [currentSelectedFriend, setCurrentSelectedFriend] = useState(null);
	const [friendsListArray, setFriendsListArray] = useState(initialFriends);

	const handleAddFriendButton = () => {
		setAddFriendFormIsVisible((currentState) => !currentState);
	};

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList
					setCurrentSelectedFriend={setCurrentSelectedFriend}
					currentSelectedFriend={currentSelectedFriend}
					friendsListArray={friendsListArray}
				/>
				{addFriendFormIsVisible && (
					<AddFriendForm
						setFriendsListArray={setFriendsListArray}
						setAddFriendFormIsVisible={setAddFriendFormIsVisible}
					/>
				)}

				<Button onClick={handleAddFriendButton}>
					{addFriendFormIsVisible ? 'Close' : 'Add Friend'}
				</Button>
			</div>

			{currentSelectedFriend && (
				<SplitBillFrom
					currentSelectedFriend={currentSelectedFriend}
					setCurrentSelectedFriend={setCurrentSelectedFriend}
					setFriendsListArray={setFriendsListArray}
				/>
			)}
		</div>
	);
}

function FriendsList(props) {
	const { setCurrentSelectedFriend, currentSelectedFriend, friendsListArray } =
		props;

	return (
		<ul>
			{friendsListArray.map((friendObject) => (
				<FriendItem
					friendObject={friendObject}
					key={friendObject.id}
					setCurrentSelectedFriend={setCurrentSelectedFriend}
					currentSelectedFriend={currentSelectedFriend}
				/>
			))}
		</ul>
	);
}

function FriendItem(props) {
	const { friendObject, setCurrentSelectedFriend, currentSelectedFriend } =
		props;
	const { id, name, image, balance } = friendObject;

	const handleSelectFriend = () => {
		return () =>
			setCurrentSelectedFriend((currentState) =>
				currentState?.id === id ? null : friendObject
			);
	};

	return (
		<li>
			<img
				src={image}
				alt={name}
			/>
			<h3>{name}</h3>

			{balance === 0 && <p>You and {name} are even.</p>}

			{balance > 0 && (
				<p className='green'>
					{name} ows you: ${balance}
				</p>
			)}

			{balance < 0 && (
				<p className='red'>
					You owe {name}: ${Math.abs(balance)}
				</p>
			)}

			<Button onClick={handleSelectFriend(id)}>
				{currentSelectedFriend?.id === id ? 'Close' : 'Select'}
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
	const { setFriendsListArray, setAddFriendFormIsVisible } = props;
	const [friendNameInput, setFriendNameInput] = useState('');
	const [friendImageInput, setFriendImageInput] = useState(
		'https://i.pravatar.cc/48?u='
	);

	const handleFriendNameInput = (event) => {
		const targetValue = event.target.value;
		setFriendNameInput(String(targetValue));
	};

	const handleFriendImageInput = (event) => {
		const targetValue = event.target.value;
		setFriendImageInput(
			(currentState) => `${currentState}${String(targetValue)}`
		);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (friendNameInput === '') return;

		const newFriend = {
			id: Date.now(),
			name: friendNameInput,
			image: friendImageInput,
			balance: 0
		};

		setFriendsListArray((currentState) => [...currentState, newFriend]);
		setFriendNameInput('');
		setFriendImageInput('https://i.pravatar.cc/48?u=');
		setAddFriendFormIsVisible((currentState) => !currentState);
	};

	return (
		<form
			className='form-add-friend'
			onSubmit={handleSubmit}
		>
			<label>🧑‍🤝‍👩 Name</label>
			<input
				type='text'
				onChange={handleFriendNameInput}
				value={friendNameInput}
			/>

			<label>📷 Image URL</label>
			<input
				type='text'
				onChange={handleFriendImageInput}
				value={friendImageInput}
			/>

			<Button>Add</Button>
		</form>
	);
}

function SplitBillFrom(props) {
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
