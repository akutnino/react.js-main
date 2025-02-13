import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, expectTypeOf, test } from 'vitest';
import { type PizzaDataType } from '../../components/Menu.tsx';
import Pizza from '../../components/Pizza.tsx';

describe('Pizza component test suite', () => {
	let pizzaListItemElement: Element | null;
	let listItemElement: HTMLLIElement;
	const dummyPizza: PizzaDataType = {
		name: 'Pizza Name',
		ingredients: 'Pizza Ingredients',
		price: 10,
		photoName: '/Pizza.jpg',
		soldOut: false,
	};

	beforeEach(() => {
		const currentTestName = expect.getState().currentTestName as string;
		const exemptedTestNames: string[] = [
			'Pizza component test suite > should render Pizza component with classname "pizza sold-out" if it is sold out',
		];

		if (exemptedTestNames.includes(currentTestName)) return;

		const { getByTestId, container } = render(<Pizza {...dummyPizza} />);

		pizzaListItemElement = container;
		listItemElement = getByTestId('pizza') as HTMLLIElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render Pizza component correcty', () => {
		expect(listItemElement).toBeInTheDocument();
		expectTypeOf(dummyPizza).toEqualTypeOf<PizzaDataType>();
	});

	test(`should render Pizza component with classname "sold-out" if it is not sold out`, () => {
		expect(listItemElement).toBeInTheDocument();
		expect(dummyPizza).toHaveProperty('soldOut');
		expect(dummyPizza.soldOut).toBe(false);
		expect(pizzaListItemElement).toHaveProperty('className');
		expect(pizzaListItemElement?.firstChild).toHaveClass('pizza');
	});

	test(`should render Pizza component with classname "pizza sold-out" if it is sold out`, () => {
		const dummyPizza: PizzaDataType = {
			name: 'Pizza Name',
			ingredients: 'Pizza Ingredients',
			price: 10,
			photoName: '/Pizza.jpg',
			soldOut: true,
		};
		const { getByTestId, container } = render(<Pizza {...dummyPizza} />);

		expect(getByTestId('pizza')).toBeInTheDocument();
		expect(dummyPizza).toHaveProperty('soldOut');
		expect(dummyPizza.soldOut).toBe(true);
		expect(container).toHaveProperty('className');
		expect(container.firstChild).toHaveClass('pizza sold-out');
	});
});
