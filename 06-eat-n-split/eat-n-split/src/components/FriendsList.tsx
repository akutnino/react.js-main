import { type FriendObjectType } from '../types/components/types.ts';
import FriendListItem from './FriendListItem.tsx';

function FriendsList({ friendsArray }: { friendsArray: FriendObjectType[] }) {
	return (
		<ul>
			{friendsArray.map((friend: FriendObjectType) => (
				<FriendListItem
					{...friend}
					key={friend.id}
				/>
			))}
		</ul>
	);
}

export default FriendsList;
