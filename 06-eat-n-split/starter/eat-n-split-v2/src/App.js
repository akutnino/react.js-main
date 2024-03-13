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
	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList />
			</div>
		</div>
	);
}

function FriendsList(props) {
	const friendsArray = initialFriends;

	return (
		<ul>
			{friendsArray.map((friend) => (
				<FriendItem
					friend={friend}
					key={friend.id}
				/>
			))}
		</ul>
	);
}

function FriendItem(props) {
	const { friend } = props;

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
				<p className='gray'>You and {friend.name} are currently even.</p>
			)}

			<Button>Select</Button>
		</li>
	);
}

function Button(props) {
	const { children } = props;

	return <button className='button'>{children}</button>;
}
