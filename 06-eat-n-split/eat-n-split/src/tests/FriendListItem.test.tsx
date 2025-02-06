import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { useState } from 'react';
import { type FriendObjectType } from '../types/components/types.ts';
import FriendListItem from '../components/FriendListItem.tsx';

describe('FriendListItem component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		const friendDummyObject = {
			id: 118836,
			name: 'Clark',
			image: 'https://i.pravatar.cc/48?u=118836',
			balance: -7,
		};

		const { result } = renderHook(() => {
			const [toggleFormAddFriend, setToggleFormAddFriend] = useState<boolean>(true);
			const [selectedFriend, setSelectedFriend] = useState<FriendObjectType | null>(null);

			return {
				toggleFormAddFriend,
				selectedFriend,
				setToggleFormAddFriend,
				setSelectedFriend,
			};
		});

		const { getByTestId, getByText } = render(
			<FriendListItem
				selectedFriend={result.current.selectedFriend}
				setSelectedFriend={result.current.setSelectedFriend}
				setToggleFormAddFriend={result.current.setToggleFormAddFriend}
				friend={friendDummyObject}
			/>
		);

		expect(getByTestId('friendListItem')).toBeInTheDocument();
		expect(getByTestId('friendListItem')).toContainElement(getByText('Select'));
	});

	test('should rerender the Select button if it is clicked by the user', () => {
		const friendDummyObject = {
			id: 118836,
			name: 'Clark',
			image: 'https://i.pravatar.cc/48?u=118836',
			balance: -7,
		};

		const { result } = renderHook(() => {
			const [toggleFormAddFriend, setToggleFormAddFriend] = useState<boolean>(true);
			const [selectedFriend, setSelectedFriend] = useState<FriendObjectType | null>({
				id: 118836,
				name: 'Clark',
				image: 'https://i.pravatar.cc/48?u=118836',
				balance: -7,
			});

			return {
				toggleFormAddFriend,
				selectedFriend,
				setToggleFormAddFriend,
				setSelectedFriend,
			};
		});

		const { getByTestId } = render(
			<FriendListItem
				selectedFriend={result.current.selectedFriend}
				setSelectedFriend={result.current.setSelectedFriend}
				setToggleFormAddFriend={result.current.setToggleFormAddFriend}
				friend={friendDummyObject}
			/>
		);

		const selectButton = getByTestId('button') as HTMLButtonElement;

		fireEvent.click(
			selectButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(selectButton.innerHTML).toBe('Close');
	});
});
