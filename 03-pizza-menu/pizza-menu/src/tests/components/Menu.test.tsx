import { cleanup, render } from '@testing-library/react';
import { afterEach, assert, describe, expect, expectTypeOf, test } from 'vitest';
import Menu, { PizzaDataType } from '../../components/Menu.tsx';

describe('Menu component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render Menu component correctly', () => {
		const dummyPizzaArray: PizzaDataType[] = [
			{
				name: 'Pizza Name',
				ingredients: 'Pizza Ingredients',
				price: 10,
				photoName: '/Pizza.jpg',
				soldOut: true,
			},
		];
		const { getByTestId } = render(<Menu />);

		expect(getByTestId('menu')).toBeInTheDocument();
		expectTypeOf(dummyPizzaArray).toBeArray();
	});

	test('should render Menu component fragment if pizzaData.length is not zero', () => {
		const dummyPizzaArray: PizzaDataType[] = [
			{
				name: 'Pizza Name',
				ingredients: 'Pizza Ingredients',
				price: 10,
				photoName: '/Pizza.jpg',
				soldOut: true,
			},
		];
		const { getByTestId } = render(<Menu />);

		expect(getByTestId('menu')).toBeInTheDocument();
		expectTypeOf(dummyPizzaArray).toBeArray();
		expect(dummyPizzaArray.length).toBeGreaterThan(0);
		expect(getByTestId('pizza-menu')).toBeInTheDocument();
	});

	test('should render Menu component menu message if pizzaData.length is zero', () => {
		const dummyPizzaArray: PizzaDataType[] = [];
		const { getByTestId } = render(<Menu {...{ pizzaArray: dummyPizzaArray }} />);

		expect(getByTestId('menu')).toBeInTheDocument();
		expectTypeOf(dummyPizzaArray).toBeArray();
		assert.equal(dummyPizzaArray.length, 0); //learn diffrence between assert and expect.
		expect(getByTestId('menu-message')).toBeInTheDocument();
	});
});
