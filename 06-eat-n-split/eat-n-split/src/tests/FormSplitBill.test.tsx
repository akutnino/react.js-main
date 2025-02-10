import {
	cleanup,
	fireEvent,
	type Matcher,
	type MatcherOptions,
	render,
	renderHook,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { useState } from 'react';
import { type FriendObjectType } from '../types/components/types.ts';
import FormSplitBill from '../components/FormSplitBill.tsx';

describe('FormSplitBill component test suite', () => {
	let sutGetByTestId: (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement;
	let sutGetByText: (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement;
	let sutResult: {
		current: {
			friendsArray: FriendObjectType[];
			selectedFriend: FriendObjectType | null;
			setFriendsArray: React.Dispatch<React.SetStateAction<FriendObjectType[]>>;
			setSelectedFriend: React.Dispatch<React.SetStateAction<FriendObjectType | null>>;
		};
	};

	let friendExpenseElement: HTMLInputElement;
	let billValueInputElement: HTMLInputElement;
	let userExpenseInputElement: HTMLInputElement;
	let billPayerValueElement: HTMLInputElement;
	let submitButtonElement: HTMLButtonElement;

	beforeEach(() => {
		const { result } = renderHook(() => {
			const [friendsArray, setFriendsArray] = useState<FriendObjectType[]>([
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
			]);
			const [selectedFriend, setSelectedFriend] = useState<FriendObjectType | null>({
				id: 118836,
				name: 'Clark',
				image: 'https://i.pravatar.cc/48?u=118836',
				balance: -7,
			});

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

		sutResult = result;
		sutGetByTestId = getByTestId;
		sutGetByText = getByText;

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
		expect(sutGetByTestId('formSplitBill')).toBeInTheDocument();
		expect(sutGetByText('Split a bill with Clark')).toBeInTheDocument();
	});

	test('should render the correct values within the inputs', () => {
		// Simulating the user events of the billValueInputElement.
		fireEvent.change(billValueInputElement, {
			target: { value: -100 },
		});

		fireEvent.change(billValueInputElement, {
			target: { value: 100 },
		});

		// Simulating the user events of the userExpenseInputElement.
		fireEvent.change(userExpenseInputElement, {
			target: { value: -200 },
		});

		fireEvent.change(userExpenseInputElement, {
			target: { value: 10 },
		});

		fireEvent.change(userExpenseInputElement, {
			target: { value: 200 },
		});

		// Simulating the user events of the billPayerValueElement.
		fireEvent.change(billPayerValueElement, {
			target: { value: 'friend' },
		});

		expect(billValueInputElement.value).toBe('100');
		expect(userExpenseInputElement.value).toBe('100');
		expect(billPayerValueElement.value).toBe('friend');
		expect(friendExpenseElement.value).toBe('0');
	});

	test('should render the changes when the user submit the form as user', () => {
		// Simulating the user events of the submitButtonElement.
		fireEvent.click(
			submitButtonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		// Simulating the user events of the billValueInputElement.
		fireEvent.change(billValueInputElement, {
			target: { value: 100 },
		});

		// Simulating the user events of the userExpenseInputElement.
		fireEvent.change(userExpenseInputElement, {
			target: { value: 80 },
		});

		// Simulating the user events of the billPayerValueElement.
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

		expect(sutResult.current.selectedFriend).toBe(null);
		expect(sutResult.current.friendsArray).toEqual([
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
		// Simulating the user events of the billValueInputElement.
		fireEvent.change(billValueInputElement, {
			target: { value: 100 },
		});

		// Simulating the user events of the userExpenseInputElement.
		fireEvent.change(userExpenseInputElement, {
			target: { value: 80 },
		});

		// Simulating the user events of the billPayerValueElement.
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

		expect(sutResult.current.selectedFriend).toBe(null);
		expect(sutResult.current.friendsArray).toEqual([
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
