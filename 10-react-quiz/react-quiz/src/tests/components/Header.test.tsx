import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import Header from '../../components/Header.tsx';

describe('Header component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		const { getByTestId } = render(<Header />);

		expect(getByTestId('header')).toBeInTheDocument();
		expect(getByTestId('header').firstElementChild).toHaveAttribute('src', 'logo512.png');
		expect(getByTestId('header').firstElementChild).toHaveAttribute('alt', 'React logo');
		expect(getByTestId('header').children[1].textContent).toBe('The React Quiz');
	});
});
