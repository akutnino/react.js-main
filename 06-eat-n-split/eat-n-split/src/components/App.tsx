import { type FriendObjectType } from '../types/components/types.ts';
import { useState } from 'react';
import Button from './Button.tsx';
import FormAddFriend from './FormAddFriend.tsx';
import FormSplitBill from './FormSplitBill.tsx';
import FriendsList from './FriendsList.tsx';

const friendsarray: FriendObjectType[] = [
	{
		id: 118836,
		name: 'Clark',
		image: 'https://i.pravatar.cc/48?u=118836',
		balance: -7,
	},
	{
		id: 933372,
		name: 'Sarah',
		image: 'https://i.pravatar.cc/48?u=933372',
		balance: 20,
	},
	{
		id: 499476,
		name: 'Anthony',
		image: 'https://i.pravatar.cc/48?u=499476',
		balance: 0,
	},
];

function App() {
	const [friendsArray, setFriendsArray] = useState<FriendObjectType[]>(friendsarray);
	const [toggleFormAddFriend, setToggleFormAddFriend] = useState<boolean>(true);
	const [selectedFriend, setSelectedFriend] = useState<FriendObjectType | null>(null);

	const handleToggle = () => {
		setToggleFormAddFriend((currentBoolean) => !currentBoolean);
	};

	return (
		<div
			className='app'
			data-testid='container'
		>
			<div
				className='sidebar'
				data-testid='sidebar'
			>
				<FriendsList
					friendsArray={friendsArray}
					selectedFriend={selectedFriend}
					setSelectedFriend={setSelectedFriend}
					setToggleFormAddFriend={setToggleFormAddFriend}
				/>

				{toggleFormAddFriend && (
					<FormAddFriend
						setFriendsArray={setFriendsArray}
						setToggleFormAddFriend={setToggleFormAddFriend}
					/>
				)}

				<Button onClick={handleToggle}>
					{toggleFormAddFriend ? 'Close' : 'Add Friend'}
				</Button>
			</div>

			{Boolean(selectedFriend) && (
				<FormSplitBill
					selectedFriend={selectedFriend}
					setFriendsArray={setFriendsArray}
					setSelectedFriend={setSelectedFriend}
				/>
			)}
		</div>
	);
}

export default App;
