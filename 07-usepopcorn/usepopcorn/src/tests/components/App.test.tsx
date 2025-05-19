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

type RenderGetByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined
) => HTMLElement;

type RenderQueryByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined
) => HTMLElement | null;

describe('App component test suite', () => {
	const DUMMY_VALID_MOVIE_TITLE: string = 'test';

	let renderGetByTestId: RenderGetByTestIdType;
	let renderFindByTestId: RenderFindByTestIdType;
	let renderFindAllByTestId: RenderFindAllByTestIdType;
	let renderQueryAllByTestId: RenderQueryAllByTestIdType;
	let renderQueryByTestId: RenderQueryByTestIdType;

	let logoElement: HTMLDivElement;
	let searchElement: HTMLInputElement;
	let numResultsElement: HTMLParagraphElement;
	let mainSectionElement: HTMLElement;
	let movieListElement: HTMLUListElement;
	let watchedSummaryElement: HTMLDivElement;
	let watchedMoviesListElement: HTMLUListElement;

	beforeEach(() => {
		const {
			getByTestId,
			queryAllByTestId,
			queryByTestId,
			findAllByTestId,
			findByTestId,
		} = render(
			<>
				<title>usePopcorn</title>
				<App />
			</>
		);

		renderQueryByTestId = queryByTestId as RenderQueryByTestIdType;
		renderGetByTestId = getByTestId as RenderGetByTestIdType;
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
		localStorage.clear();
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

	// Integration-Testing-Start

	test('should render MovieListItem components if the user query is valid', async () => {
		expect(searchElement.value).toBe('');

		fireEvent.change(searchElement, {
			target: { value: DUMMY_VALID_MOVIE_TITLE },
		});

		expect(searchElement.value).toBe(DUMMY_VALID_MOVIE_TITLE);
		expect(await renderFindAllByTestId('movieListItem')).toHaveLength(10);
	});

	test('should render correct ErrorMessage if the user query is invalid', async () => {
		const DUMMY_INVALID_MOVIE_TITLE: string = '     ';
		expect(searchElement.value).toBe('');

		fireEvent.change(searchElement, {
			target: { value: DUMMY_INVALID_MOVIE_TITLE },
		});

		expect(searchElement.value).toBe(DUMMY_INVALID_MOVIE_TITLE);
		expect((await renderFindByTestId('error')).textContent).toBe('🛑Incorrect IMDb ID.');
	});

	test('should render MovieDetails component if the user click a MovieListItem component', async () => {
		expect(searchElement.value).toBe('');

		fireEvent.change(searchElement, {
			target: { value: DUMMY_VALID_MOVIE_TITLE },
		});

		expect(searchElement.value).toBe(DUMMY_VALID_MOVIE_TITLE);

		// prettier-ignore
		const movieListItemElement: HTMLElement[] = await renderFindAllByTestId('movieListItem');
		expect(movieListItemElement).toHaveLength(10);

		fireEvent.click(
			movieListItemElement[0],
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		const movieDetailsElement = await renderFindByTestId('movieDetails');
		expect(movieDetailsElement).toBeInTheDocument();

		fireEvent.keyDown(document.body, {
			key: 'Escape',
			code: 'Escape',
		});
		expect(renderQueryByTestId('movieDetails')).toBe(null);
	});

	test('should render WatchedMoviesListItem component if the user rated and added a movie', async () => {
		expect(searchElement.value).toBe('');

		fireEvent.change(searchElement, {
			target: { value: DUMMY_VALID_MOVIE_TITLE },
		});

		expect(searchElement.value).toBe(DUMMY_VALID_MOVIE_TITLE);

		// prettier-ignore
		const movieListItemElement: HTMLElement[] = await renderFindAllByTestId('movieListItem');
		expect(movieListItemElement).toHaveLength(10);

		fireEvent.click(
			movieListItemElement[0],
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		const starElement: HTMLElement[] = await renderFindAllByTestId('star');

		fireEvent.click(
			starElement[0],
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		const addButtonElement = renderGetByTestId('addButton') as HTMLButtonElement;

		fireEvent.click(
			addButtonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(renderGetByTestId('watchedMoviesListItem')).toBeInTheDocument();
	});

	test('should remove WatchedMoviesListItem component if the user clicked its delete button', async () => {
		expect(searchElement.value).toBe('');

		fireEvent.change(searchElement, {
			target: { value: DUMMY_VALID_MOVIE_TITLE },
		});

		expect(searchElement.value).toBe(DUMMY_VALID_MOVIE_TITLE);

		// prettier-ignore
		const movieListItemElement: HTMLElement[] = await renderFindAllByTestId('movieListItem');
		expect(movieListItemElement).toHaveLength(10);

		fireEvent.click(
			movieListItemElement[0],
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		const starElement: HTMLElement[] = await renderFindAllByTestId('star');

		fireEvent.click(
			starElement[0],
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		const addButtonElement = renderGetByTestId('addButton') as HTMLButtonElement;

		fireEvent.click(
			addButtonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(renderGetByTestId('watchedMoviesListItem')).toBeInTheDocument();
		const deleteButtonElement = renderGetByTestId('watchedMoviesListItem').children[2]
			.lastElementChild as HTMLButtonElement;

		fireEvent.click(
			deleteButtonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(renderQueryByTestId('watchedMoviesListItem')).toBe(null);
	});
});

// Integration-Testing-End
