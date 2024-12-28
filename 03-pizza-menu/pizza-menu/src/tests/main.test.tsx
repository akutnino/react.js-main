import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import App from '../App.tsx';

describe('Menu component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the menu component without crashing', () => {
		const { container, getByTestId } = render(<App />);

		expect(container).toContainElement(getByTestId('container'));
		expect(getByTestId('container')).toBeInTheDocument();
	});
});
