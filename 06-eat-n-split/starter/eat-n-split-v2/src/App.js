import { useState } from 'react';
import FriendsList from './components/FriendsList';
import Button from './components/Button';
import AddFriendForm from './components/AddFriendForm';
import BillSplitForm from './components/BillSplitForm';

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
