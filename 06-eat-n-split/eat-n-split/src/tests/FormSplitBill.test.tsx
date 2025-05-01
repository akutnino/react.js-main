import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { useState } from 'react';
import { type FriendObjectType } from '../types/components/types.ts';
import FormSplitBill from '../components/FormSplitBill.tsx';

type RenderHookResultType = {
	current: {
		friendsArray: FriendObjectType[];
		selectedFriend: FriendObjectType | null;
		setFriendsArray: React.Dispatch<React.SetStateAction<FriendObjectType[]>>;
		setSelectedFriend: React.Dispatch<React.SetStateAction<FriendObjectType | null>>;
	};
};

describe('FormSplitBill component test suite', () => {
	const DUMMY_FRIEND_OBJECT_ARRAY: FriendObjectType[] = [
		{
			id: 118836,
			name: 'Clark',
			image: 'https://i.pravatar.cc/48?u=118836',
			balance: -7,
		},
		{
			id: 933372,
			name: 'Sarah',
			image: 'https://i.pravatar.cc/48?u=933372',
			balance: 20,
		},
	];

	const DUMMY_FRIEND_OBJECT: FriendObjectType = {
		id: 118836,
		name: 'Clark',
		image: 'https://i.pravatar.cc/48?u=118836',
		balance: -7,
	};

	let formSplitBillElement: HTMLFormElement;
	let formHeaderElement: HTMLHeadingElement;
	let friendExpenseElement: HTMLInputElement;
	let billValueInputElement: HTMLInputElement;
	let userExpenseInputElement: HTMLInputElement;
	let billPayerValueElement: HTMLInputElement;
	let submitButtonElement: HTMLButtonElement;
	let renderHookResult: RenderHookResultType;

	beforeEach(() => {
		const { result } = renderHook(() => {
			const [friendsArray, setFriendsArray] = useState<FriendObjectType[]>(
				DUMMY_FRIEND_OBJECT_ARRAY
			);

			const [selectedFriend, setSelectedFriend] = useState<FriendObjectType | null>(
				DUMMY_FRIEND_OBJECT
			);

			return {
				friendsArray,
				selectedFriend,
				setFriendsArray,
				setSelectedFriend,
			};
		});

		const { getByTestId, getByText } = render(
			<FormSplitBill
				selectedFriend={result.current.selectedFriend}
				setFriendsArray={result.current.setFriendsArray}
				setSelectedFriend={result.current.setSelectedFriend}
			/>
		);

		renderHookResult = result as RenderHookResultType;
		formSplitBillElement = getByTestId('formSplitBill') as HTMLFormElement;
		formHeaderElement = getByText('Split a bill with Clark') as HTMLHeadingElement;
		friendExpenseElement = getByTestId('friendExpenseInput') as HTMLInputElement;
		billValueInputElement = getByTestId('billValueInput') as HTMLInputElement;
		userExpenseInputElement = getByTestId('userExpenseInput') as HTMLInputElement;
		billPayerValueElement = getByTestId('billPayerValue') as HTMLInputElement;
		submitButtonElement = getByText('Split Bill') as HTMLButtonElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(formSplitBillElement).toBeInTheDocument();
		expect(formHeaderElement).toBeInTheDocument();
	});

	test('should render the correct values within the inputs', () => {
		// Simulating the user events to the billValueInputElement.
		fireEvent.change(billValueInputElement, {
			target: { value: -100 },
		});

		fireEvent.change(billValueInputElement, {
			target: { value: 100 },
		});

		// Simulating the user events to the userExpenseInputElement.
		fireEvent.change(userExpenseInputElement, {
			target: { value: -200 },
		});

		fireEvent.change(userExpenseInputElement, {
			target: { value: 10 },
		});

		fireEvent.change(userExpenseInputElement, {
			target: { value: 200 },
		});

		// Simulating the user events to the billPayerValueElement.
		fireEvent.change(billPayerValueElement, {
			target: { value: 'friend' },
		});

		expect(billValueInputElement.value).toBe('100');
		expect(userExpenseInputElement.value).toBe('100');
		expect(billPayerValueElement.value).toBe('friend');
		expect(friendExpenseElement.value).toBe('0');
	});

	test('should render the changes when the user submit the form as user', () => {
		// Simulating the user events to the submitButtonElement.
		fireEvent.click(
			submitButtonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		// Simulating the user events to the billValueInputElement.
		fireEvent.change(billValueInputElement, {
			target: { value: 100 },
		});

		// Simulating the user events to the userExpenseInputElement.
		fireEvent.change(userExpenseInputElement, {
			target: { value: 80 },
		});

		// Simulating the user events to the billPayerValueElement.
		fireEvent.change(billPayerValueElement, {
			target: { value: 'user' },
		});

		fireEvent.click(
			submitButtonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(renderHookResult.current.selectedFriend).toBe(null);
		expect(renderHookResult.current.friendsArray).toEqual([
			{
				id: 118836,
				name: 'Clark',
				image: 'https://i.pravatar.cc/48?u=118836',
				balance: 13,
			},
			{
				id: 933372,
				name: 'Sarah',
				image: 'https://i.pravatar.cc/48?u=933372',
				balance: 20,
			},
		]);
	});

	test('should render the changes when the user submit the form as friend', () => {
		// Simulating the user events to the billValueInputElement.
		fireEvent.change(billValueInputElement, {
			target: { value: 100 },
		});

		// Simulating the user events to the userExpenseInputElement.
		fireEvent.change(userExpenseInputElement, {
			target: { value: 80 },
		});

		// Simulating the user events to the billPayerValueElement.
		fireEvent.change(billPayerValueElement, {
			target: { value: 'friend' },
		});

		fireEvent.click(
			submitButtonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(renderHookResult.current.selectedFriend).toBe(null);
		expect(renderHookResult.current.friendsArray).toEqual([
			{
				id: 118836,
				name: 'Clark',
				image: 'https://i.pravatar.cc/48?u=118836',
				balance: -87,
			},
			{
				id: 933372,
				name: 'Sarah',
				image: 'https://i.pravatar.cc/48?u=933372',
				balance: 20,
			},
		]);
	});
});
