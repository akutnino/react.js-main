import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { ItemType } from '../../components/App.tsx';
import Stats from '../../components/Stats.tsx';

describe('App component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should show that the component has zero items on the list', () => {
		const dummyItem: ItemType[] = [];

		const { getByTestId } = render(<Stats items={dummyItem} />);
		const emElement = getByTestId('stats-em');

		expect(emElement.innerHTML).toEqual(
			'Start adding some items to your packing list 🚀'
		);
	});

	test('should show that the component has one item on the list', () => {
		const dummyItem: ItemType[] = [
			{ id: 1, description: 'Passports', quantity: 2, packed: false },
		];

		const { getByTestId } = render(<Stats items={dummyItem} />);
		const emElement = getByTestId('stats-em');

		expect(emElement.innerHTML).toEqual(
			'👜 You have 1 items on your list, and you already packed 0 (0%)'
		);
	});

	test('should show that the component has all items packed', () => {
		const dummyItem: ItemType[] = [
			{ id: 1, description: 'Passports', quantity: 2, packed: true },
		];

		const { getByTestId } = render(<Stats items={dummyItem} />);
		const emElement = getByTestId('stats-em');

		expect(emElement.innerHTML).toEqual('You got everything! Ready to go!');
	});
});
