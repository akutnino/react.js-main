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

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList
					onSelectedFriend={handleSelectedFriend}
					selectedFriendObject={selectedFriendObject}
				/>
				{addFriendFormVisibility && <AddFriendForm />}

				<Button onClick={handleAddFriendClick}>Add Friend</Button>
			</div>

			{selectedFriendObject && (
				<BillSplitForm selectedFriendObject={selectedFriendObject} />
			)}
		</div>
	);
}

function FriendsList(props) {
	const { onSelectedFriend, selectedFriendObject } = props;
	const friendsArray = initialFriends;

	return (
		<ul>
			{friendsArray.map((friend) => (
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

			<Button onClick={onSelectedFriend(friend)}>{currentlySelected ? 'Close' : 'Select'}</Button>
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
	return (
		<form className='form-add-friend'>
			<label>🧍New Friend</label>
			<input type='text' />

			<label>📷 Image URL</label>
			<input type='text' />

			<Button>Add</Button>
		</form>
	);
}

function BillSplitForm(props) {
	const { selectedFriendObject } = props;

	// prettier-ignore
	return (
		<form className='form-split-bill'>
			<h2>Split a bill with {selectedFriendObject.name}</h2>

			<label>💰 Bill Value</label>
			<input type='text' />

			<label>🧍‍♂️ Your Expense</label>
			<input type='text' />

			<label>🧑‍🤝‍👩 {selectedFriendObject.name}'s Expense</label>
			<input type='text' disabled/>

      <label>🤑 Who is paying the bill?</label>
      <select>
        <option value='user'>You</option>
        <option value='friend'>{selectedFriendObject.name}</option>
      </select>

      <Button>Split Bill</Button>
		</form>
	);
}
