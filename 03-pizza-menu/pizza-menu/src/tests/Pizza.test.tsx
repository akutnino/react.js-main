import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, expectTypeOf, test } from 'vitest';
import { PizzaDataType } from '../components/Menu.tsx';
import Pizza from '../components/Pizza.tsx';

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
});
