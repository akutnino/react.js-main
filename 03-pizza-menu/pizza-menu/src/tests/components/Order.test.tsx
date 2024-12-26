import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import Order, { OrderType } from '../../components/Order.tsx';

describe('Order component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render Order component correctly', () => {
		const stubOrder: OrderType = { closeHour: 22 };
		const { getByTestId } = render(<Order {...stubOrder} />);

		expect(getByTestId('order')).toBeInTheDocument();
	});
});
