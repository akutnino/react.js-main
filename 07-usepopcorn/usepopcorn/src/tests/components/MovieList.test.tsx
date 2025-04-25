import { cleanup, render, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { type MovieDataType } from '../../types/components/types.ts';
import { useMovies } from '../../hooks/useMovies.ts';
import MovieList from '../../components/MovieList.tsx';

describe('MovieList component test suite', () => {
	const EMPTY_MOVIES_ARRAY: MovieDataType[] = [];
	let movieListElement: HTMLUListElement;
	let childrenElementArray: HTMLElement[];

	beforeEach(() => {
		const currentTestName = expect.getState().currentTestName as string;
		const exemptedTestName: string[] = [
			'MovieList component test suite > should render the MovieListItem if the movies array is not empty',
		];

		if (exemptedTestName.includes(currentTestName)) return;

		const { result } = renderHook(() => {
			const { setSelectedMovieID } = useMovies('');
			return { setSelectedMovieID };
		});

		const { getByTestId, queryAllByTestId } = render(
			<MovieList
				movies={EMPTY_MOVIES_ARRAY}
				setSelectedMovieID={result.current.setSelectedMovieID}
			/>
		);

		movieListElement = getByTestId('movieList') as HTMLUListElement;
		childrenElementArray = queryAllByTestId('movieListItem') as HTMLElement[];
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(movieListElement).toBeInTheDocument();
	});

	test('should check that MovieList is empty after initial render', () => {
		expect(childrenElementArray).toHaveLength(0);
	});

	test('should render the MovieListItem if the movies array is not empty', () => {
		const dummyMoviesArray: MovieDataType[] = [
			{
				imdbID: 'testID',
				Poster: 'testPoster',
				Title: 'testTitle',
				Year: 'testYear',
			},
		];

		const { result } = renderHook(() => {
			const { setSelectedMovieID } = useMovies('');
			return { setSelectedMovieID };
		});

		const { getByTestId, queryAllByTestId } = render(
			<MovieList
				movies={dummyMoviesArray}
				setSelectedMovieID={result.current.setSelectedMovieID}
			/>
		);

		const childrenElementArray = queryAllByTestId('movieListItem') as HTMLElement[];
		const movieListItemElement = getByTestId('movieListItem') as HTMLLIElement;

		expect(movieListItemElement).toBeInTheDocument();
		expect(childrenElementArray).toHaveLength(1);
	});
});
