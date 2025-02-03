import { type ChangeEvent, type Dispatch, type FormEvent, useState } from 'react';
import { type FriendObjectType } from '../types/components/types.ts';
import Button from './Button.tsx';

function FormAddFriend({
	setFriendsArray,
	setToggleFormAddFriend,
}: {
	setFriendsArray: Dispatch<React.SetStateAction<FriendObjectType[]>>;
	setToggleFormAddFriend: Dispatch<React.SetStateAction<boolean>>;
}) {
	const [friendNameInput, setFriendNameInput] = useState<string>('');
	const [imageURLInput, setImageURLInput] = useState<string>('https://i.pravatar.cc/48');

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!friendNameInput || !imageURLInput) return;

		const newFriend: FriendObjectType = {
			id: Date.now(),
			balance: 0,
			image: `${imageURLInput}?=${crypto.randomUUID()}`,
			name: friendNameInput,
		};

		setFriendsArray((currentArray) => [...currentArray, newFriend]);
		setToggleFormAddFriend(false);
		setFriendNameInput('');
		setImageURLInput('https://i.pravatar.cc/48');
	};

	const handleFriendName = (event: ChangeEvent<HTMLInputElement>) => {
		setFriendNameInput(event.target.value);
	};

	const handleImageURL = (event: ChangeEvent<HTMLInputElement>) => {
		setImageURLInput(event.target.value);
	};

	return (
		<form
			className='form-add-friend'
			onSubmit={handleSubmit}
		>
			<label>🧑‍🤝‍👩 Friend Name</label>
			<input
				type='text'
				value={friendNameInput}
				onChange={handleFriendName}
			/>

			<label>🌇 Image URL</label>
			<input
				type='text'
				value={imageURLInput}
				onChange={handleImageURL}
			/>

			<Button type='submit'>Add</Button>
		</form>
	);
}

export default FormAddFriend;
