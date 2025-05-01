import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { type ContentItemType } from '../../types/components/types.ts';
import TabContent from '../../components/TabContent.tsx';

describe('TabContent component test suite', () => {
	const DUMMY_ITEM: ContentItemType = {
		summary: 'React is a library for building UIs',
		details:
			'Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	};

	let tabContentElement: HTMLDivElement;
	let toggleButton: HTMLButtonElement;
	let likeSpanElement: HTMLSpanElement;
	let increaseButton: HTMLButtonElement;
	let tripleIncrease: HTMLButtonElement;
	let undoButton: HTMLButtonElement;
	let undoLaterButton: HTMLButtonElement;

	beforeEach(() => {
		const currentTestName = expect.getState().currentTestName as string;
		const exemptedTestNames: string[] = [
			'TabContent component test suite > should render the correct button text if the user clicks the toggle button',
		];

		if (exemptedTestNames.includes(currentTestName)) return;

		const { getByTestId, getByText } = render(<TabContent item={DUMMY_ITEM} />);

		tabContentElement = getByTestId('tab-content') as HTMLDivElement;
		toggleButton = getByText('Hide details') as HTMLButtonElement;
		likeSpanElement = getByTestId('likes') as HTMLSpanElement;
		increaseButton = getByText('+') as HTMLButtonElement;
		tripleIncrease = getByText('+++') as HTMLButtonElement;
		undoButton = getByText('Undo') as HTMLButtonElement;
		undoLaterButton = getByText('Undo in 2s') as HTMLButtonElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(tabContentElement).toBeInTheDocument();
		expect(toggleButton).toBeInTheDocument();
		expect(likeSpanElement).toBeInTheDocument();
		expect(increaseButton).toBeInTheDocument();
		expect(tripleIncrease).toBeInTheDocument();
		expect(undoButton).toBeInTheDocument();
		expect(undoLaterButton).toBeInTheDocument();
	});

	test('should render the correct button text if the user clicks the toggle button', () => {
		const { getByText } = render(<TabContent item={DUMMY_ITEM} />);

		const toggleHideButton = getByText('Hide details') as HTMLButtonElement;
		expect(toggleHideButton).toBeInTheDocument();

		fireEvent.click(
			toggleHideButton,
			new MouseEvent('click', {
				cancelable: true,
				bubbles: true,
			})
		);

		const toggleShowButton = getByText('Show details') as HTMLButtonElement;
		expect(toggleShowButton).toBeInTheDocument();
	});

	test('should render the correct amount of likes if the user clicks the like increase Button', () => {
		fireEvent.click(
			increaseButton,
			new MouseEvent('click', {
				cancelable: true,
				bubbles: true,
			})
		);

		expect(likeSpanElement.innerHTML).toBe('1 ❤️');
	});

	test('should render the correct amount of likes if the user clicks the like triple increase Button', () => {
		fireEvent.click(
			tripleIncrease,
			new MouseEvent('click', {
				cancelable: true,
				bubbles: true,
			})
		);

		expect(likeSpanElement.innerHTML).toBe('3 ❤️');
	});

	test('should reset the amount of likes if the user clicks the undo Button', () => {
		fireEvent.click(
			increaseButton,
			new MouseEvent('click', {
				cancelable: true,
				bubbles: true,
			})
		);

		expect(likeSpanElement.innerHTML).toBe('1 ❤️');

		fireEvent.click(
			undoButton,
			new MouseEvent('click', {
				cancelable: true,
				bubbles: true,
			})
		);

		expect(likeSpanElement.innerHTML).toBe('0 ❤️');
	});

	test('should reset the amount of likes if the user clicks the undo later Button', () => {
		vi.useFakeTimers();

		fireEvent.click(
			increaseButton,
			new MouseEvent('click', {
				cancelable: true,
				bubbles: true,
			})
		);

		expect(likeSpanElement.innerHTML).toBe('1 ❤️');

		fireEvent.click(
			undoLaterButton,
			new MouseEvent('click', {
				cancelable: true,
				bubbles: true,
			})
		);

		act(() => {
			vi.advanceTimersByTime(2000);
		});

		expect(likeSpanElement.innerHTML).toBe('0 ❤️');
	});
});
