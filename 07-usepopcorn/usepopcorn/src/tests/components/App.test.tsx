import {
	cleanup,
	type Matcher,
	type MatcherOptions,
	render,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import App from '../../components/App.tsx';

type RenderQueryAllByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined
) => HTMLElement[];

describe('App component test suite', () => {
	let renderQueryAllByTestId: RenderQueryAllByTestIdType;
	let logoElement: HTMLDivElement;
	let searchElement: HTMLInputElement;
	let numResultsElement: HTMLParagraphElement;
	let mainSectionElement: HTMLElement;
	let movieListElement: HTMLUListElement;
	let watchedSummaryElement: HTMLDivElement;
	let watchedMoviesListElement: HTMLUListElement;

	beforeEach(() => {
		const { getByTestId, queryAllByTestId } = render(<App />);

		renderQueryAllByTestId = queryAllByTestId as RenderQueryAllByTestIdType;
		logoElement = getByTestId('logo') as HTMLDivElement;
		searchElement = getByTestId('search') as HTMLInputElement;
		numResultsElement = getByTestId('numResults') as HTMLParagraphElement;
		mainSectionElement = getByTestId('mainSection') as HTMLElement;
		movieListElement = getByTestId('movieList') as HTMLUListElement;
		watchedSummaryElement = getByTestId('watchedSummary') as HTMLDivElement;
		watchedMoviesListElement = getByTestId('watchedMoviesList') as HTMLUListElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should show all components in the DOM', () => {
		expect(logoElement).toBeInTheDocument();
		expect(searchElement).toBeInTheDocument();
		expect(numResultsElement).toBeInTheDocument();
		expect(mainSectionElement.children[0]).toBe(renderQueryAllByTestId('box')[0]);
		expect(mainSectionElement.children[1]).toBe(renderQueryAllByTestId('box')[1]);
		expect(movieListElement).toBeInTheDocument();
		expect(watchedSummaryElement).toBeInTheDocument();
		expect(watchedMoviesListElement).toBeInTheDocument();
	});

	// integration testing
	test.todo('WatchedMoviesListItem delete button', () => {});
});
