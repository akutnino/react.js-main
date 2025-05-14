import {
	cleanup,
	fireEvent,
	type Matcher,
	type MatcherOptions,
	render,
	type waitForOptions,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import App from '../../components/App.tsx';

type RenderQueryAllByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined
) => HTMLElement[];

type RenderFindAllByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined,
	waitForElementOptions?: waitForOptions | undefined
) => Promise<HTMLElement[]>;

type RenderFindByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined,
	waitForElementOptions?: waitForOptions | undefined
) => Promise<HTMLElement>;

describe('App component test suite', () => {
	let renderFindByTestId: RenderFindByTestIdType;
	let renderFindAllByTestId: RenderFindAllByTestIdType;
	let renderQueryAllByTestId: RenderQueryAllByTestIdType;
	let logoElement: HTMLDivElement;
	let searchElement: HTMLInputElement;
	let numResultsElement: HTMLParagraphElement;
	let mainSectionElement: HTMLElement;
	let movieListElement: HTMLUListElement;
	let watchedSummaryElement: HTMLDivElement;
	let watchedMoviesListElement: HTMLUListElement;

	beforeEach(() => {
		const { getByTestId, queryAllByTestId, findAllByTestId, findByTestId } = render(
			<App />
		);

		renderFindByTestId = findByTestId as RenderFindByTestIdType;
		renderFindAllByTestId = findAllByTestId as RenderFindAllByTestIdType;
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
	test('should render MovieListItem components if the user query is valid', async () => {
		const DUMMY_VALID_MOVIE_TITLE: string = 'test';
		expect(searchElement.value).toBe('');

		fireEvent.change(searchElement, {
			target: { value: DUMMY_VALID_MOVIE_TITLE },
		});

		expect(searchElement.value).toBe(DUMMY_VALID_MOVIE_TITLE);
		expect(await renderFindAllByTestId('movieListItem')).toHaveLength(10);
	});

	test.only('should render correct ErrorMessage if the user query is invalid', async () => {
		const DUMMY_INVALID_MOVIE_TITLE: string = '     ';
		expect(searchElement.value).toBe('');

		fireEvent.change(searchElement, {
			target: { value: DUMMY_INVALID_MOVIE_TITLE },
		});

		expect(searchElement.value).toBe(DUMMY_INVALID_MOVIE_TITLE);
		expect((await renderFindByTestId('error')).textContent).toBe('🛑Incorrect IMDb ID.');
	});

	test.todo('WatchedMoviesListItem delete button', () => {});
});
