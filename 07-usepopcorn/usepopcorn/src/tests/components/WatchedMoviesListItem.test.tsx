import { cleanup, render, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { useLocalStorageState } from '../../hooks/useLocalStorageState.ts';
import { type WatchedMovieDataType } from '../../types/components/types.ts';
import WatchedMoviesListItem from '../../components/WatchedMoviesListItem.tsx';

describe('WatchedMoviesListItem component test suite', () => {
	const DUMMY_WATCHED_OBJECT: WatchedMovieDataType = {
		Poster: 'test_Poster',
		Title: 'test_Title',
		Year: 'test_Year',
		countRatingDecisions: 1,
		imdbID: 'test_imdbID',
		imdbRating: 5,
		runtime: 100,
		userRating: 10,
	};

	let watchedMoviesListItemElement: HTMLLIElement;
	let imdbRatingElement: HTMLSpanElement;
	let userRatingElement: HTMLSpanElement;
	let runtimeElement: HTMLSpanElement;
	let deleteButtonElement: HTMLButtonElement;

	beforeEach(() => {
		const { result } = renderHook(() => {
			const { setWatched } = useLocalStorageState([], '');
			return { setWatched };
		});

		const { getByTestId, getByText } = render(
			<WatchedMoviesListItem
				movie={DUMMY_WATCHED_OBJECT}
				setWatched={result.current.setWatched}
			/>
		);

		watchedMoviesListItemElement = getByTestId('watchedMoviesListItem') as HTMLLIElement;
		imdbRatingElement = getByTestId('imdbRating') as HTMLSpanElement;
		userRatingElement = getByTestId('userRating') as HTMLSpanElement;
		runtimeElement = getByTestId('runtime') as HTMLSpanElement;
		deleteButtonElement = getByText('X') as HTMLButtonElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(watchedMoviesListItemElement).toBeInTheDocument();
		expect(imdbRatingElement).toBeInTheDocument();
		expect(userRatingElement).toBeInTheDocument();
		expect(runtimeElement).toBeInTheDocument();
		expect(deleteButtonElement).toBeInTheDocument();
	});

	test('should render the correct movie detials', () => {
		expect(imdbRatingElement.innerHTML).toBe('5');
		expect(userRatingElement.innerHTML).toBe('10');
		expect(runtimeElement.innerHTML).toBe('100 min');
	});
});
