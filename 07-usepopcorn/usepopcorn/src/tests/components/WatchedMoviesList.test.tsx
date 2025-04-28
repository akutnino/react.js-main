import { cleanup, render, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { useLocalStorageState } from '../../hooks/useLocalStorageState.ts';
import { type WatchedMovieDataType } from '../../types/components/types.ts';
import WatchedMoviesList from '../../components/WatchedMoviesList.tsx';

describe('WatchedMoviesList component test suite', () => {
	const LOCALSTORAGE_INITIALSTATE: [] = [];
	const LOCALSTORAGE_KEY_VALUE: string = 'test';

	let watchedMoviesListElement: HTMLUListElement;
	let childrenElement: HTMLElement[];

	beforeEach(() => {
		const currentTestName = expect.getState().currentTestName as string;
		const exemptedTestName: string[] = [
			'WatchedMoviesList component test suite > should render the WatchedMoviesListItem if the watched array is not empty',
		];

		if (exemptedTestName.includes(currentTestName)) return;

		const { result } = renderHook(() => {
			const { watched, setWatched } = useLocalStorageState(
				LOCALSTORAGE_INITIALSTATE,
				LOCALSTORAGE_KEY_VALUE
			);
			return { watched, setWatched };
		});

		const { getByTestId, queryAllByTestId } = render(
			<WatchedMoviesList
				watched={result.current.watched}
				setWatched={result.current.setWatched}
			/>
		);

		watchedMoviesListElement = getByTestId('watchedMoviesList') as HTMLUListElement;
		childrenElement = queryAllByTestId('watchedMoviesListItem') as HTMLElement[];
	});

	afterEach(() => {
		localStorage.clear();
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(watchedMoviesListElement).toBeInTheDocument();
	});

	test('should check that MovieList is empty after initial render', () => {
		expect(childrenElement).toHaveLength(0);
	});

	test('should render the WatchedMoviesListItem if the watched array is not empty', () => {
		const LOCALSTORAGE_INITIALSTATE: [] = [];
		const LOCALSTORAGE_KEY_VALUE: string = 'test';
		const DUMMY_LOCALSTORAGE_STATE: WatchedMovieDataType[] = [
			{
				imdbID: 'test_imdbID',
				Title: 'test_Title',
				Year: 'test_Year',
				Poster: 'test_Poster',
				runtime: 100,
				imdbRating: 10,
				userRating: 10,
				countRatingDecisions: 1,
			},
		];

		const { result } = renderHook(() => {
			localStorage.setItem(
				LOCALSTORAGE_KEY_VALUE,
				JSON.stringify(DUMMY_LOCALSTORAGE_STATE)
			);

			const { watched, setWatched } = useLocalStorageState(
				LOCALSTORAGE_INITIALSTATE,
				LOCALSTORAGE_KEY_VALUE
			);
			return { watched, setWatched };
		});

		const { getByTestId, queryAllByTestId } = render(
			<WatchedMoviesList
				watched={result.current.watched}
				setWatched={result.current.setWatched}
			/>
		);

		const watchedMoviesListElement = getByTestId('watchedMoviesList') as HTMLUListElement;
		const childrenElement = queryAllByTestId('watchedMoviesListItem') as HTMLElement[];

		expect(watchedMoviesListElement).toBeInTheDocument();
		expect(childrenElement).toHaveLength(1);
	});
});
