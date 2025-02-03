import { type Dispatch } from 'react';
import { type FriendObjectType } from '../types/components/types.ts';
import FriendListItem from './FriendListItem.tsx';

function FriendsList({
	friendsArray,
	selectedFriend,
	setSelectedFriend,
	setToggleFormAddFriend,
}: {
	friendsArray: FriendObjectType[];
	selectedFriend: FriendObjectType | null;
	setSelectedFriend: Dispatch<React.SetStateAction<FriendObjectType | null>>;
	setToggleFormAddFriend: Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<ul>
			{friendsArray.map((friend: FriendObjectType) => (
				<FriendListItem
					selectedFriend={selectedFriend}
					setSelectedFriend={setSelectedFriend}
					setToggleFormAddFriend={setToggleFormAddFriend}
					friend={friend}
					key={friend.id}
				/>
			))}
		</ul>
	);
}

export default FriendsList;
