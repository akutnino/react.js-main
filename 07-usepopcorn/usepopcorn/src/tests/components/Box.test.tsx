import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import Box from '../../components/Box.tsx';

describe('Box component test suite', () => {
	let boxElement: HTMLDivElement;
	let childrenElement: HTMLDivElement;
	let toggleButtonElement: HTMLButtonElement;

	beforeEach(() => {
		const currentTestName = expect.getState().currentTestName as string;
		const exeptedTestNames: string[] = [
			'Box component test suite > should check that the children is unmounted if the toggle button is clicked',
		];

		if (exeptedTestNames.includes(currentTestName)) return;

		const { getByTestId } = render(
			<Box>
				<div data-testid='children'>children</div>
			</Box>
		);

		boxElement = getByTestId('box') as HTMLDivElement;
		childrenElement = getByTestId('children') as HTMLDivElement;
		toggleButtonElement = getByTestId('box').firstElementChild as HTMLButtonElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(boxElement).toBeInTheDocument();
		expect(childrenElement).toBeInTheDocument();
	});

	test('should check that the children is mounted by default', () => {
		expect(toggleButtonElement.innerHTML).toBe('–');
		expect(boxElement.children[1]).toBe(childrenElement);
		expect(childrenElement.parentElement).toBe(boxElement);
	});

	test('should check that the children is unmounted if the toggle button is clicked', () => {
		const { getByTestId, queryAllByTestId } = render(
			<Box>
				<div data-testid='children'>children</div>
			</Box>
		);

		const toggleButtonElement = getByTestId('box').firstElementChild as HTMLButtonElement;
		expect(toggleButtonElement.innerHTML).toBe('–');

		// Simulating the user event to the toggleButtonElement.
		fireEvent.click(
			toggleButtonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		const childrenElementArray = queryAllByTestId('children') as HTMLElement[];
		expect(childrenElementArray).toHaveLength(0);
		expect(toggleButtonElement.innerHTML).toBe('+');
	});
});
