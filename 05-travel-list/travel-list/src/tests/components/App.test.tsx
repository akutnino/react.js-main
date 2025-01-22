import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import App from '../../components/App.tsx';

describe('App component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should show all components on the DOM', () => {
		const { getByTestId } = render(<App />);

		expect(getByTestId('logo')).toBeInTheDocument();
		expect(getByTestId('form')).toBeInTheDocument();
		expect(getByTestId('packingList')).toBeInTheDocument();
		expect(getByTestId('stats')).toBeInTheDocument();
	});

	test('should render the components in order', () => {
		const { getByTestId, container } = render(<App />);

		expect(getByTestId('logo')).toEqual(container.firstElementChild?.firstElementChild);
		expect(getByTestId('form')).toEqual(container.firstElementChild?.children[1]);
		expect(getByTestId('packingList')).toEqual(container.firstElementChild?.children[2]);
		expect(getByTestId('stats')).toEqual(container.firstElementChild?.lastElementChild);
	});
});
