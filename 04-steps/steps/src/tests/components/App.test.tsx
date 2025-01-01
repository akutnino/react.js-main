import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import App from '../../components/App.tsx';

describe('App component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		const { getByTestId, container } = render(<App />);

		expect(getByTestId('steps')).toBeInTheDocument();
		expect(container).toBeTruthy();
	});

	test('should render the correct class name', () => {
		const { getByTestId } = render(<App />);

		expect(getByTestId('numbers')).toBeInTheDocument();
		expect(getByTestId('numbers').children[0].getAttribute('class')).toBe('active');
		expect(getByTestId('numbers').children[1].getAttribute('class')).toBe('active');
		expect(getByTestId('numbers').children[2].getAttribute('class')).toBe('active');
	});
});
