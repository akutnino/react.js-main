import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import App from '../../components/App.tsx';

describe('App component test suite', () => {
	let appContainer: Element | null;
	let appDivElement: HTMLDivElement;
	let tabbedDivElement: HTMLDivElement;

	beforeEach(() => {
		const { getByTestId, container } = render(<App />);

		appContainer = container.firstElementChild;
		appDivElement = getByTestId('container') as HTMLDivElement;
		tabbedDivElement = getByTestId('tabbed') as HTMLDivElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should show all components in the DOM', () => {
		expect(appDivElement).toBeInTheDocument();
		expect(tabbedDivElement).toBeInTheDocument();
	});

	test('should render the components in order', () => {
		expect(tabbedDivElement).toEqual(appContainer?.firstElementChild);
	});
});
