import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, expectTypeOf, test } from 'vitest';
import { type PizzaDataType } from '../../components/Menu.tsx';
import Pizza from '../../components/Pizza.tsx';

describe('Pizza component test suite', () => {
	const DUMMY_PIZZA: PizzaDataType = {
		name: 'Pizza Name',
		ingredients: 'Pizza Ingredients',
		price: 10,
		photoName: '/Pizza.jpg',
		soldOut: false,
	};

	let pizzaListItemElement: Element | null;
	let listItemElement: HTMLLIElement;

	beforeEach(() => {
		const currentTestName = expect.getState().currentTestName as string;
		const exemptedTestNames: string[] = [
			'Pizza component test suite > should render Pizza component with classname "pizza sold-out" if it is sold out',
		];

		if (exemptedTestNames.includes(currentTestName)) return;

		const { getByTestId, container } = render(<Pizza {...DUMMY_PIZZA} />);

		pizzaListItemElement = container;
		listItemElement = getByTestId('pizza') as HTMLLIElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render Pizza component correcty', () => {
		expect(listItemElement).toBeInTheDocument();
		expectTypeOf(DUMMY_PIZZA).toEqualTypeOf<PizzaDataType>();
	});

	test(`should render Pizza component with classname "sold-out" if it is not sold out`, () => {
		expect(listItemElement).toBeInTheDocument();
		expect(DUMMY_PIZZA).toHaveProperty('soldOut');
		expect(DUMMY_PIZZA.soldOut).toBe(false);
		expect(pizzaListItemElement).toHaveProperty('className');
		expect(pizzaListItemElement?.firstChild).toHaveClass('pizza');
	});

	test(`should render Pizza component with classname "pizza sold-out" if it is sold out`, () => {
		const DUMMY_PIZZA: PizzaDataType = {
			name: 'Pizza Name',
			ingredients: 'Pizza Ingredients',
			price: 10,
			photoName: '/Pizza.jpg',
			soldOut: true,
		};

		const { getByTestId, container } = render(<Pizza {...DUMMY_PIZZA} />);

		expect(getByTestId('pizza')).toBeInTheDocument();
		expect(DUMMY_PIZZA).toHaveProperty('soldOut');
		expect(DUMMY_PIZZA.soldOut).toBe(true);
		expect(container).toHaveProperty('className');
		expect(container.firstChild).toHaveClass('pizza sold-out');
	});
});
