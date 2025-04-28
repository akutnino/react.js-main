import { cleanup, render, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, test } from 'vitest';
import { type MovieDataType } from '../../types/components/types.ts';
import { useMovies } from '../../hooks/useMovies.ts';
import MovieListItem from '../../components/MovieListItem.tsx';

describe('MovieListItem component test suite', () => {
	beforeEach(() => {
		const dummyMovieObject: MovieDataType = {
			Poster: 'test_Poster',
			Title: 'test_Title',
			Type: 'movie',
			Year: 'test_Year',
			imdbID: 'test_imdbID',
		};

		const { result } = renderHook(() => {
			const { setSelectedMovieID } = useMovies('');
			return { setSelectedMovieID };
		});

		const { getByTestId } = render(
			<MovieListItem
				movie={dummyMovieObject}
				setSelectedMovieID={result.current.setSelectedMovieID}
			/>
		);
	});

	afterEach(() => {
		cleanup();
	});

	test.todo('should render the component correctly', () => {});

	test.todo('should render the correct movie detials', () => {});

	test.todo('should set SelectedMovieID if the user clicks on MovieListItem', () => {});
});
