import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, expectTypeOf, test } from 'vitest';
import { PizzaDataType } from '../../components/Menu.tsx';
import Pizza from '../../components/Pizza.tsx';

describe('Pizza component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render Pizza component correcty', () => {
		const stubPizza: PizzaDataType = {
			name: 'Pizza Name',
			ingredients: 'Pizza Ingredients',
			price: 10,
			photoName: '/Pizza.jpg',
			soldOut: false,
		};
		const { getByTestId } = render(<Pizza {...stubPizza} />);

		expect(getByTestId('pizza')).toBeInTheDocument();
		expectTypeOf(stubPizza).toEqualTypeOf<PizzaDataType>();
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

	test(`should render Pizza component with classname "sold-out" if it is not sold out`, () => {
		const dummyPizza: PizzaDataType = {
			name: 'Pizza Name',
			ingredients: 'Pizza Ingredients',
			price: 10,
			photoName: '/Pizza.jpg',
			soldOut: false,
		};
		const { getByTestId, container } = render(<Pizza {...dummyPizza} />);

		expect(getByTestId('pizza')).toBeInTheDocument();
		expect(dummyPizza).toHaveProperty('soldOut');
		expect(dummyPizza.soldOut).toBe(false);
		expect(container).toHaveProperty('className');
		expect(container.firstChild).toHaveClass('pizza');
	});
});
