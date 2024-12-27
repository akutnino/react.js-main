import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import App from '../App.tsx';

describe('App component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render App component correctly', () => {
		const { getByTestId, container } = render(<App />);

		expect(getByTestId('container')).toBeInTheDocument();
		expect(container).toBeTruthy();
	});
});
