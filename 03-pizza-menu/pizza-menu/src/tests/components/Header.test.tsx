import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import Header from '../../components/Header.tsx';

describe('Header component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the login component correctly', () => {
		const { getByRole, getByTestId } = render(<Header />);

		expect(getByRole('heading')).toBeInTheDocument();
		expect(getByTestId('header')).toBeInTheDocument();
	});
});
