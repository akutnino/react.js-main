import { useState } from 'react';
import Button from './Button';

export default function AddFriendForm(props) {
	const { setFriendsListArray, setAddFriendFormIsVisible } = props;
	const [friendNameInput, setFriendNameInput] = useState('');
	const [friendImageInput, setFriendImageInput] = useState(
		'https://i.pravatar.cc/48?u='
	);

	const handleFriendNameInput = (event) => {
		const targetValue = event.target.value;
		setFriendNameInput(String(targetValue));
	};

	const handleFriendImageInput = (event) => {
		const targetValue = event.target.value;
		setFriendImageInput(
			(currentState) => `${currentState}${String(targetValue)}`
		);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (friendNameInput === '') return;

		const newFriend = {
			id: Date.now(),
			name: friendNameInput,
			image: friendImageInput,
			balance: 0
		};

		setFriendsListArray((currentState) => [...currentState, newFriend]);
		setFriendNameInput('');
		setFriendImageInput('https://i.pravatar.cc/48?u=');
		setAddFriendFormIsVisible((currentState) => !currentState);
	};

	return (
		<form
			className='form-add-friend'
			onSubmit={handleSubmit}
		>
			<label>🧑‍🤝‍👩 Name</label>
			<input
				type='text'
				onChange={handleFriendNameInput}
				value={friendNameInput}
			/>

			<label>📷 Image URL</label>
			<input
				type='text'
				onChange={handleFriendImageInput}
				value={friendImageInput}
			/>

			<Button>Add</Button>
		</form>
	);
}
