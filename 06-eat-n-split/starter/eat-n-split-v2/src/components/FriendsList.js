import FriendItem from './FriendItem';

export default function FriendsList(props) {
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
