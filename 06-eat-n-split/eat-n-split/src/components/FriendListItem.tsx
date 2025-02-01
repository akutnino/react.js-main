import { type FriendObjectType } from '../types/components/types.ts';
import Button from './Button.tsx';

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

			<Button>Select</Button>
		</li>
	);
}

export default FriendListItem;
