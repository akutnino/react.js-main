import Button from './Button';

export default function FriendItem(props) {
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
