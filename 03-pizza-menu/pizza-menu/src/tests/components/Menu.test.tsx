import { cleanup, render } from '@testing-library/react';
import {
	afterEach,
	assert,
	beforeEach,
	describe,
	expect,
	expectTypeOf,
	test,
} from 'vitest';
import Menu, { type PizzaDataType } from '../../components/Menu.tsx';

describe('Menu component test suite', () => {
	let menuElement: HTMLElement;
	let paragraphElement: HTMLParagraphElement;
	const dummyPizzaArray: PizzaDataType[] = [
		{
			name: 'Pizza Name',
			ingredients: 'Pizza Ingredients',
			price: 10,
			photoName: '/Pizza.jpg',
			soldOut: true,
		},
	];

	beforeEach(() => {
		const { getByTestId } = render(<Menu />);

		menuElement = getByTestId('menu') as HTMLElement;
		paragraphElement = getByTestId('pizza-menu') as HTMLParagraphElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render Menu component correctly', () => {
		expect(menuElement).toBeInTheDocument();
		expectTypeOf(dummyPizzaArray).toBeArray();
	});

	test('should render Menu component fragment if pizzaData.length is not zero', () => {
		expect(menuElement).toBeInTheDocument();
		expectTypeOf(dummyPizzaArray).toBeArray();
		expect(dummyPizzaArray.length).toBeGreaterThan(0);
		expect(paragraphElement).toBeInTheDocument();
	});

	test('should render Menu component menu message if pizzaData.length is zero', () => {
		const dummyEmptyPizzaArray: PizzaDataType[] = [];
		const { getByTestId } = render(<Menu {...{ pizzaArray: dummyEmptyPizzaArray }} />);

		expectTypeOf(dummyEmptyPizzaArray).toBeArray();
		assert.equal(dummyEmptyPizzaArray.length, 0); //learn diffrence between assert and expect.
		expect(getByTestId('menu-message')).toBeInTheDocument();
	});
});
