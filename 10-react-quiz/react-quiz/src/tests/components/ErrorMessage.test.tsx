import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import ErrorMessage from '../../components/ErrorMessage.tsx';

describe('ErrorMessage component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		const { getByTestId } = render(<ErrorMessage />);

		expect(getByTestId('error')).toBeInTheDocument();
		expect(getByTestId('error').textContent).toBe(
			'💥 There was an error fecthing questions.'
		);
	});
});
