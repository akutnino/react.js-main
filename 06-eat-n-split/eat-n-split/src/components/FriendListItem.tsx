import { FriendObjectType } from '../types/components/types.ts';

function FriendListItem({ name, image, balance }: FriendObjectType) {
	return (
		<li>
			<img
				src={image}
				alt={`${name}-image`}
				srcSet={image}
			/>
			<h3>{name}</h3>

			{balance === 0 && <p>You and {name} are even</p>}

			{balance > 0 && (
				<p className='green'>
					{name} owes you {balance}$
				</p>
			)}

			{balance < 0 && (
				<p className='red'>
					You owe {name} {Math.abs(balance)}$
				</p>
			)}
		</li>
	);
}

export default FriendListItem;
