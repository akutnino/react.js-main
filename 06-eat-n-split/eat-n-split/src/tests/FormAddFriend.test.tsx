import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { useState } from 'react';
import { type FriendObjectType } from '../types/components/types.ts';
import FormAddFriend from '../components/FormAddFriend.tsx';

describe('FormAddFriend component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
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

		expect(getByTestId('formAddFriend')).toBeInTheDocument();
		expect(getByTestId('friendNameInput')).toBeInTheDocument();
		expect(getByTestId('imageURLInput')).toBeInTheDocument();
		expect(getByText('Add')).toBeInTheDocument();
	});

	test('should render correctly if the user enter in the inputs', () => {
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

		const { getByTestId } = render(
			<FormAddFriend
				setFriendsArray={result.current.setFriendsArray}
				setToggleFormAddFriend={result.current.setToggleFormAddFriend}
			/>
		);
		const friendNameInputElement = getByTestId('friendNameInput') as HTMLInputElement;
		const imageURLInputElement = getByTestId('imageURLInput') as HTMLInputElement;

		fireEvent.change(friendNameInputElement, {
			target: { value: 'Friend Name Test' },
		});

		fireEvent.change(imageURLInputElement, {
			target: { value: 'Image URL Test' },
		});

		expect(friendNameInputElement.value).toBe('Friend Name Test');
		expect(imageURLInputElement.value).toBe('Image URL Test');
	});

	test('should not enter a new friend if the inputs are empty', () => {
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
		const addButtonElement = getByText('Add') as HTMLButtonElement;

		fireEvent.click(
			addButtonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(addButtonElement).toBeInTheDocument();
		expect(getByTestId('formAddFriend')).toBeInTheDocument();
	});

	test('should render correctly if the user enter in the inputs and click the add button', () => {
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
		const friendNameInputElement = getByTestId('friendNameInput') as HTMLInputElement;
		const imageURLInputElement = getByTestId('imageURLInput') as HTMLInputElement;
		const addButtonElement = getByText('Add') as HTMLButtonElement;

		fireEvent.change(friendNameInputElement, {
			target: { value: 'Friend Name Test' },
		});

		fireEvent.change(imageURLInputElement, {
			target: { value: 'Image URL Test' },
		});

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
