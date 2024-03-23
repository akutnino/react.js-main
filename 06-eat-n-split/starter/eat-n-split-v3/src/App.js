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
			{friendsArray.map((friendObject) => (
				<FriendItem
					friendObject={friendObject}
					key={friendObject.id}
				/>
			))}
		</ul>
	);
}

function FriendItem(props) {
	const { friendObject } = props;
	const { id, name, image, balance } = friendObject;

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

			<button className='button'>Select</button>
		</li>
	);
}
