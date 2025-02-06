import { type Dispatch } from 'react';
import { type FriendObjectType } from '../types/components/types.ts';
import Button from './Button.tsx';

function FriendListItem({
	friend,
	selectedFriend,
	setSelectedFriend,
	setToggleFormAddFriend,
}: {
	friend: FriendObjectType;
	selectedFriend: FriendObjectType | null;
	setSelectedFriend: Dispatch<React.SetStateAction<FriendObjectType | null>>;
	setToggleFormAddFriend: Dispatch<React.SetStateAction<boolean>>;
}) {
	const { id, name, image, balance } = friend;
	const isSelected: boolean = id === selectedFriend?.id;

	const handleSelect = (isSelected: boolean) => {
		return () => {
			setSelectedFriend(isSelected ? null : friend);
			setToggleFormAddFriend(false);
		};
	};

	return (
		<li
			className={isSelected ? 'selected' : ''}
			data-testid='friendListItem'
		>
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

			<Button onClick={handleSelect(isSelected)}>
				{isSelected ? 'Close' : 'Select'}
			</Button>
		</li>
	);
}

export default FriendListItem;
