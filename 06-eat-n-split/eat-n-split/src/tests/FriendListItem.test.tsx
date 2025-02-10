import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { useState } from 'react';
import { type FriendObjectType } from '../types/components/types.ts';
import FriendListItem from '../components/FriendListItem.tsx';

describe('FriendListItem component test suite', () => {
	let friendListItemElement: HTMLLIElement;
	let selectButtonElement: HTMLButtonElement;

	beforeEach(() => {
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

		friendListItemElement = getByTestId('friendListItem') as HTMLLIElement;
		selectButtonElement = getByTestId('button') as HTMLButtonElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(friendListItemElement).toBeInTheDocument();
		expect(friendListItemElement).toContainElement(selectButtonElement);
		expect(selectButtonElement.innerHTML).toBe('Close');
	});

	test('should rerender the Select button if it is clicked by the user', () => {
		fireEvent.click(
			selectButtonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(selectButtonElement.innerHTML).toBe('Close');
	});
});
