import {
	cleanup,
	fireEvent,
	type Matcher,
	type MatcherOptions,
	render,
	renderHook,
	type waitForOptions,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { useState } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState.ts';
import { type SetWatchedType } from '../../types/hooks/types.ts';
import { type WatchedMovieDataType } from '../../types/components/types.ts';
import MovieDetails from '../../components/MovieDetails.tsx';

type RenderGetByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined
) => HTMLElement;

type RenderFindByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined,
	waitForElementOptions?: waitForOptions | undefined
) => Promise<HTMLElement>;

type RenderHookResultType = {
	current: {
		watched: WatchedMovieDataType[];
		selectedMovieID: string | null;
		setWatched: SetWatchedType;
		setSelectedMovieID: React.Dispatch<React.SetStateAction<string | null>>;
	};
};

type RenderQueryByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined
) => HTMLElement | null;

describe('MovieDetails component test suite', () => {
	const LOCALSTORAGE_INITIALSTATE: [] = [];
	const LOCALSTORAGE_KEY_VALUE: string = 'test';
	const DUMMY_SELECTEDMOVIEID: string = 'tt4244162';

	let renderHookResult: RenderHookResultType;
	let renderGetByTestId: RenderGetByTestIdType;
	let renderFindByTestId: RenderFindByTestIdType;
	let renderQueryByTestId: RenderQueryByTestIdType;

	let detailsHeaderElement: HTMLElement;

	beforeEach(async () => {
		const currentTestName = expect.getState().currentTestName as string;
		const exemptedTestName: string[] = [
			'MovieDetails component test suite > should render the correct error message if the selectedMovieID is invalid',
			'MovieDetails component test suite > should render the user rating message if the user has watched the movie',
		];

		if (exemptedTestName.includes(currentTestName)) return;

		const { result } = renderHook(() => {
			const [selectedMovieID, setSelectedMovieID] = useState<string | null>(
				DUMMY_SELECTEDMOVIEID
			);

			const { watched, setWatched } = useLocalStorageState(
				LOCALSTORAGE_INITIALSTATE,
				LOCALSTORAGE_KEY_VALUE
			);

			return {
				watched,
				selectedMovieID,
				setWatched,
				setSelectedMovieID,
			};
		});

		const { getByTestId, findByTestId, queryByTestId } = render(
			<>
				<title>usePopcorn</title>
				<MovieDetails
					selectedMovieID={result.current.selectedMovieID}
					watched={result.current.watched}
					setSelectedMovieID={result.current.setSelectedMovieID}
					setWatched={result.current.setWatched}
				/>
			</>
		);

		renderHookResult = result as RenderHookResultType;
		renderGetByTestId = getByTestId as RenderGetByTestIdType;
		renderFindByTestId = findByTestId as RenderFindByTestIdType;
		renderQueryByTestId = queryByTestId as RenderQueryByTestIdType;

		detailsHeaderElement = (await renderFindByTestId('detailsHeader', undefined, {
			timeout: 3000,
		})) as HTMLElement;
	});

	afterEach(() => {
		vi.clearAllTimers();
		localStorage.clear();
		cleanup();
	});

	test('should render the component correctly', async () => {
		const movieDetailsElement = renderGetByTestId('movieDetails') as HTMLDivElement;
		const detailsSectionElement = renderGetByTestId('detailsSection') as HTMLElement;

		expect(movieDetailsElement).toBeInTheDocument();
		expect(movieDetailsElement).toContainElement(detailsHeaderElement);
		expect(movieDetailsElement).toContainElement(detailsSectionElement);
	});

	test('should verify the tab title and the selected movie is the same', () => {
		const titleElement = document.querySelector('title') as HTMLTitleElement;

		expect(titleElement.innerHTML).toBe('MOVIE: Beta Test');
	});

	test('should close the MovieDetails component if the user clicks the close button', () => {
		const closeButtonElement =
			detailsHeaderElement.firstElementChild as HTMLButtonElement;

		expect(renderHookResult.current.selectedMovieID).toBe(DUMMY_SELECTEDMOVIEID);

		// Simulating the user event to the closeButtonElement.
		fireEvent.click(
			closeButtonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(renderHookResult.current.selectedMovieID).toBe(null);
	});

	test('should render the Add to List button if the user has rated the movie', () => {
		const starRatingElement = renderGetByTestId('starRating') as HTMLDivElement;
		const starElement = starRatingElement.firstElementChild
			?.firstElementChild as HTMLSpanElement;

		expect(renderQueryByTestId('addButton')).toBe(null);

		// Simulating the user event to the starElement.
		fireEvent.click(
			starElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(renderQueryByTestId('addButton')).toBeInTheDocument();
	});

	test('should update to setSelectedMovieID and setWatched correctly and close MovieDetails', () => {
		const starRatingElement = renderGetByTestId('starRating') as HTMLDivElement;
		const starElement = starRatingElement.firstElementChild
			?.firstElementChild as HTMLSpanElement;

		// Simulating the user event to the starElement.
		fireEvent.click(
			starElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		const addButtonElement = renderQueryByTestId('addButton') as HTMLButtonElement;

		expect(renderHookResult.current.selectedMovieID).toBe(DUMMY_SELECTEDMOVIEID);
		expect(renderHookResult.current.watched).toEqual([]);

		// Simulating the user event to the addButtonElement.
		fireEvent.click(
			addButtonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(renderHookResult.current.selectedMovieID).toBe(null);
		expect(renderHookResult.current.watched).toHaveLength(1);
	});

	test('should render the user rating message if the user has watched the movie', async () => {
		const DUMMY_WATCHED_ARRAY: WatchedMovieDataType[] = [
			{
				imdbID: DUMMY_SELECTEDMOVIEID,
				imdbRating: 4.8,
				Poster:
					'https://m.media-amazon.com/images/M/MV5BZjhlM2ZhMzUtMzU4ZC00ZjAyLWIxZmYtOWY4N2RlMWEzYTcwXkEyXkFqcGc@._V1_SX300.jpg',
				runtime: 88,
				Title: 'Beta Test',
				Year: '2016',
				userRating: 1,
				countRatingDecisions: 1,
			},
		];

		const { getByTestId, findByTestId, rerender } = render(
			<>
				<title>usePopcorn</title>
				<MovieDetails
					selectedMovieID={renderHookResult.current.selectedMovieID}
					watched={DUMMY_WATCHED_ARRAY}
					setSelectedMovieID={renderHookResult.current.setSelectedMovieID}
					setWatched={renderHookResult.current.setWatched}
				/>
			</>
		);

		rerender(
			<>
				<title>usePopcorn</title>
				<MovieDetails
					selectedMovieID={DUMMY_SELECTEDMOVIEID}
					watched={DUMMY_WATCHED_ARRAY}
					setSelectedMovieID={renderHookResult.current.setSelectedMovieID}
					setWatched={renderHookResult.current.setWatched}
				/>
			</>
		);

		expect(getByTestId('movieDetails')).toContainElement(
			await findByTestId('watchedMovieRating')
		);
	});

	test('should render the correct error message if the selectedMovieID is invalid', async () => {
		const DUMMY_SELECTEDMOVIEID: string = '';

		const { result } = renderHook(() => {
			const [selectedMovieID, setSelectedMovieID] = useState<string | null>(
				DUMMY_SELECTEDMOVIEID
			);

			const { watched, setWatched } = useLocalStorageState(
				LOCALSTORAGE_INITIALSTATE,
				LOCALSTORAGE_KEY_VALUE
			);

			return {
				watched,
				selectedMovieID,
				setWatched,
				setSelectedMovieID,
			};
		});

		const { findByTestId } = render(
			<>
				<title>usePopcorn</title>
				<MovieDetails
					selectedMovieID={result.current.selectedMovieID}
					watched={result.current.watched}
					setSelectedMovieID={result.current.setSelectedMovieID}
					setWatched={result.current.setWatched}
				/>
			</>
		);

		expect(await findByTestId('error')).toBeInTheDocument();
	});
});
