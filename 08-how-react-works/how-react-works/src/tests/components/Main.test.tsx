import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import App from '../../components/App.tsx';

describe('Main component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component without crashing', () => {
		const { getByTestId } = render(<App />);

		expect(getByTestId('container')).toBeInTheDocument();
		expect(getByTestId('tabbed')).toBeInTheDocument();
	});
});
