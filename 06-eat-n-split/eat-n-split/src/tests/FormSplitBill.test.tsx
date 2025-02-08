import { cleanup, render, renderHook } from '@testing-library/react';
import { afterEach, describe, test } from 'vitest';
import { useState } from 'react';
import { type FriendObjectType } from '../types/components/types.ts';
import FormSplitBill from '../components/FormSplitBill.tsx';

describe('FormSplitBill component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		const { result } = renderHook(() => {
			const [friendsArray, setFriendsArray] = useState<FriendObjectType[]>([]);
			const [selectedFriend, setSelectedFriend] = useState<FriendObjectType | null>(null);

			return {
				friendsArray,
				selectedFriend,
				setFriendsArray,
				setSelectedFriend,
			};
		});

		const { getByTestId } = render(
			<FormSplitBill
				selectedFriend={result.current.selectedFriend}
				setFriendsArray={result.current.setFriendsArray}
				setSelectedFriend={result.current.setSelectedFriend}
			/>
		);
	});
});
