import FriendItem from './FriendItem';

export default function FriendsList(props) {
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
