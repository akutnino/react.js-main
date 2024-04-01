import Button from './Button';

export default function FriendItem(props) {
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
