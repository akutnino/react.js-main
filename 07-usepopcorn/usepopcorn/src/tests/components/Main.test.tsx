import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import App from '../../components/App.tsx';

describe('Main component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component without crashing', () => {
		const { getByTestId, container } = render(<App />);

		expect(getByTestId('navbar')).toBeInTheDocument();
		expect(getByTestId('mainSection')).toBeInTheDocument();
		expect(container).toContainElement(getByTestId('navbar'));
		expect(container).toContainElement(getByTestId('mainSection'));
	});
});
