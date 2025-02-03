import { type FriendObjectType } from '../types/components/types.ts';
import Button from './Button.tsx';

function FormSplitBill({ selectedFriend }: { selectedFriend: FriendObjectType | null }) {
	return (
		<form className='form-split-bill'>
			<h2>Split a bill with {selectedFriend?.name}</h2>

			<label>💰 Bill Value</label>
			<input type='text' />

			<label>🧍‍♂️ Your Expense</label>
			<input type='text' />

			<label>🧑‍🤝‍👩 {selectedFriend?.name}'s Expense</label>
			<input
				type='text'
				disabled
			/>

			<label>🤑 Who is paying the bill?</label>
			<select>
				<option value='user'>You</option>
				<option value='friend'>{selectedFriend?.name}</option>
			</select>

			<Button>Split Bill</Button>
		</form>
	);
}

export default FormSplitBill;
