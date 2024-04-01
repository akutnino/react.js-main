import { useState } from 'react';
import FriendsList from './components/FriendsList';
import AddFriendForm from './components/AddFriendForm';
import Button from './components/Button';
import SplitBillFrom from './components/SplitBillFrom';

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
					key={currentSelectedFriend?.id}
				/>
			)}
		</div>
	);
}
