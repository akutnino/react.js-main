import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import App from '../../components/App.tsx';

describe('App component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should show all components in the DOM', () => {
		const { getByTestId, queryAllByTestId } = render(<App />);
		const boxElement: HTMLElement[] = queryAllByTestId('box');

		expect(getByTestId('logo')).toBeInTheDocument();
		expect(getByTestId('search')).toBeInTheDocument();
		expect(getByTestId('numResults')).toBeInTheDocument();
		expect(getByTestId('mainSection').children[0]).toBe(boxElement[0]);
		expect(getByTestId('mainSection').children[1]).toBe(boxElement[1]);
		expect(getByTestId('movieList')).toBeInTheDocument();
		expect(getByTestId('watchedSummary')).toBeInTheDocument();
		expect(getByTestId('watchedMoviesList')).toBeInTheDocument();
	});
});
