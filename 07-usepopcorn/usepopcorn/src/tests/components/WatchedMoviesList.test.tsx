import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { useLocalStorageState } from '../../hooks/useLocalStorageState.ts';
import { type WatchedMovieDataType } from '../../types/components/types.ts';
import { type SetWatchedType } from '../../types/hooks/types.ts';
import WatchedMoviesList from '../../components/WatchedMoviesList.tsx';

describe('WatchedMoviesList component test suite', () => {
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

	let watchedMoviesListElement: HTMLUListElement;
	let watchedMoviesListItemElement: HTMLLIElement;
	let childrenElement: HTMLElement[];
	let deleteButtonElement: HTMLButtonElement;
	let sutRerender: (ui: React.ReactNode) => void;
	let sutResult: {
		current: {
			watched: WatchedMovieDataType[];
			setWatched: SetWatchedType;
		};
	};

	beforeEach(() => {
		const currentTestName = expect.getState().currentTestName as string;
		const exemptedTestName: string[] = [
			'WatchedMoviesList component test suite > should check that MovieList is empty after initial render',
		];

		if (exemptedTestName.includes(currentTestName)) return;

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

		const { getByTestId, getByText, queryAllByTestId, rerender } = render(
			<WatchedMoviesList
				watched={result.current.watched}
				setWatched={result.current.setWatched}
			/>
		);

		sutResult = result;
		sutRerender = rerender;
		watchedMoviesListElement = getByTestId('watchedMoviesList') as HTMLUListElement;
		watchedMoviesListItemElement = getByTestId('watchedMoviesListItem') as HTMLLIElement;
		childrenElement = queryAllByTestId('watchedMoviesListItem') as HTMLElement[];
		deleteButtonElement = getByText('X') as HTMLButtonElement;
	});

	afterEach(() => {
		localStorage.clear();
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(watchedMoviesListElement).toBeInTheDocument();
		expect(watchedMoviesListItemElement).toBeInTheDocument();
		expect(deleteButtonElement).toBeInTheDocument();
	});

	test('should render the WatchedMoviesListItem if the watched array is not empty', () => {
		expect(childrenElement).toHaveLength(1);
	});

	test('should delete WatchedMoviesListItem if the user clicked the delete button', () => {
		console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_VALUE) as string));

		fireEvent.click(
			deleteButtonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		sutRerender(
			<WatchedMoviesList
				watched={sutResult.current.watched}
				setWatched={sutResult.current.setWatched}
			/>
		);
		localStorage.setItem(LOCALSTORAGE_KEY_VALUE, JSON.stringify([]));

		console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_VALUE) as string));
		console.log(sutResult.current.watched);
		expect(childrenElement).toHaveLength(0);
	});

	test('should check that MovieList is empty after initial render', () => {
		const LOCALSTORAGE_INITIALSTATE: [] = [];
		const LOCALSTORAGE_KEY_VALUE: string = 'test';

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

		const watchedMoviesListElement = getByTestId('watchedMoviesList') as HTMLUListElement;
		const childrenElement = queryAllByTestId('watchedMoviesListItem') as HTMLElement[];

		expect(watchedMoviesListElement).toBeInTheDocument();
		expect(childrenElement).toHaveLength(0);
	});
});
