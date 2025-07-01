import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import Loader from '../../components/Loader.tsx';

describe('Loader component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		const { getByTestId } = render(<Loader />);

		expect(getByTestId('loader')).toBeInTheDocument();
		expect(getByTestId('loader').firstElementChild).toHaveAttribute('class', 'loader');
		expect(getByTestId('loader').children[1].textContent).toBe('Loading questions...');
	});
});
