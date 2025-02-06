import { cleanup, render, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { useState } from 'react';
import { type FriendObjectType } from '../types/components/types.ts';
import FriendsList from '../components/FriendsList.tsx';

describe('FriendList component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		const { result } = renderHook(() => {
			const [friendsArray, setFriendsArray] = useState<FriendObjectType[]>([
				{
					id: 118836,
					name: 'Clark',
					image: 'https://i.pravatar.cc/48?u=118836',
					balance: -7,
				},
			]);
			const [toggleFormAddFriend, setToggleFormAddFriend] = useState<boolean>(true);
			const [selectedFriend, setSelectedFriend] = useState<FriendObjectType | null>(null);

			return {
				friendsArray,
				toggleFormAddFriend,
				selectedFriend,
				setFriendsArray,
				setToggleFormAddFriend,
				setSelectedFriend,
			};
		});

		const { getByTestId } = render(
			<FriendsList
				friendsArray={result.current.friendsArray}
				selectedFriend={result.current.selectedFriend}
				setSelectedFriend={result.current.setSelectedFriend}
				setToggleFormAddFriend={result.current.setToggleFormAddFriend}
			/>
		);

		expect(getByTestId('friendsList')).toBeInTheDocument();
		expect(getByTestId('friendsList')).toContainElement(getByTestId('friendListItem'));
	});
});
