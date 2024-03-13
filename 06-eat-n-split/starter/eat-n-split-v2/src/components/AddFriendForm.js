import { useState } from 'react';
import Button from './Button';

export default function AddFriendForm(props) {
	const { onAddNewFriend } = props;
	const [newAddedFriendName, setNewAddedFriendName] = useState('');
	const [newAddedFriendImage, setNewAddedFriendImage] = useState(
		'https://i.pravatar.cc/48?u='
	);

	const handleFriendNameInput = (event) => {
		const targetValue = event.target.value;
		setNewAddedFriendName(targetValue);
	};

	const handleFriendImageInput = (event) => {
		const targetValue = event.target.value;
		setNewAddedFriendImage(targetValue);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();

		if (!newAddedFriendName) return;

		const id = crypto.randomUUID();
		const newAddedFriendObject = {
			id,
			name: newAddedFriendName,
			image: `https://i.pravatar.cc/48?u=${id}`,
			balance: 0
		};

		onAddNewFriend(newAddedFriendObject);
		setNewAddedFriendName('');
		setNewAddedFriendImage('https://i.pravatar.cc/48?u=');
	};

	return (
		<form
			className='form-add-friend'
			onSubmit={handleFormSubmit}
		>
			<label>🧍New Friend</label>
			<input
				type='text'
				onChange={handleFriendNameInput}
				value={newAddedFriendName}
			/>

			<label>📷 Image URL</label>
			<input
				type='text'
				onChange={handleFriendImageInput}
				value={newAddedFriendImage}
			/>

			<Button>Add</Button>
		</form>
	);
}
