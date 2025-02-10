import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { useState } from 'react';
import { type FriendObjectType } from '../types/components/types.ts';
import FormAddFriend from '../components/FormAddFriend.tsx';

describe('FormAddFriend component test suite', () => {
	let formAddFriendElement: HTMLFormElement;
	let friendNameInputElement: HTMLInputElement;
	let imageURLInputElement: HTMLInputElement;
	let addButtonElement: HTMLButtonElement;

	beforeEach(() => {
		const { result } = renderHook(() => {
			const [friendsArray, setFriendsArray] = useState<FriendObjectType[]>([]);
			const [toggleFormAddFriend, setToggleFormAddFriend] = useState<boolean>(true);

			return {
				friendsArray,
				toggleFormAddFriend,
				setFriendsArray,
				setToggleFormAddFriend,
			};
		});

		const { getByTestId, getByText } = render(
			<FormAddFriend
				setFriendsArray={result.current.setFriendsArray}
				setToggleFormAddFriend={result.current.setToggleFormAddFriend}
			/>
		);

		formAddFriendElement = getByTestId('formAddFriend') as HTMLFormElement;
		friendNameInputElement = getByTestId('friendNameInput') as HTMLInputElement;
		imageURLInputElement = getByTestId('imageURLInput') as HTMLInputElement;
		addButtonElement = getByText('Add') as HTMLButtonElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(formAddFriendElement).toBeInTheDocument();
		expect(friendNameInputElement).toBeInTheDocument();
		expect(imageURLInputElement).toBeInTheDocument();
		expect(addButtonElement).toBeInTheDocument();
	});

	test('should render correctly if the user enter in the inputs', () => {
		// Simulating the user event to the friendNameInputElement.
		fireEvent.change(friendNameInputElement, {
			target: { value: 'Friend Name Test' },
		});

		// Simulating the user event to the imageURLInputElement.
		fireEvent.change(imageURLInputElement, {
			target: { value: 'Image URL Test' },
		});

		expect(friendNameInputElement.value).toBe('Friend Name Test');
		expect(imageURLInputElement.value).toBe('Image URL Test');
	});

	test('should not enter a new friend if the inputs are empty', () => {
		// Simulating the user event to the addButtonElement.
		fireEvent.click(
			addButtonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(addButtonElement).toBeInTheDocument();
		expect(formAddFriendElement).toBeInTheDocument();
	});

	test('should render correctly if the user enter in the inputs and click the add button', () => {
		// Simulating the user event to the friendNameInputElement.
		fireEvent.change(friendNameInputElement, {
			target: { value: 'Friend Name Test' },
		});

		// Simulating the user event to the imageURLInputElement.
		fireEvent.change(imageURLInputElement, {
			target: { value: 'Image URL Test' },
		});

		// Simulating the user event to the addButtonElement.
		fireEvent.click(
			addButtonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(friendNameInputElement.value).toBe('');
		expect(imageURLInputElement.value).toBe('https://i.pravatar.cc/48');
	});
});
