import { type FriendObjectType } from '../types/components/types.ts';
import FriendListItem from './FriendListItem.tsx';

function FriendsList() {
	const friendsrray: FriendObjectType[] = [
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

	return (
		<ul>
			{friendsrray.map((friend: FriendObjectType) => (
				<FriendListItem
					{...friend}
					key={friend.id}
				/>
			))}
		</ul>
	);
}

export default FriendsList;
