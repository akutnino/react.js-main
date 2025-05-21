import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { type MovieDataType } from '../../types/components/types.ts';
import { useMovies } from '../../hooks/useMovies.ts';
import MovieListItem from '../../components/MovieListItem.tsx';

type RenderHookResult = {
	current: {
		selectedMovieID: string | null;
		setSelectedMovieID: React.Dispatch<React.SetStateAction<string | null>>;
	};
};

describe('MovieListItem component test suite', () => {
	const MOVIE_POSTER_TEST_VALUE: string = 'test_Poster';
	const MOVIE_TITLE_TEST_VALUE: string = 'test_Title';
	const MOVIE_YEAR_TEST_VALUE: string = 'test_Year';
	const MOVIE_IMDBID_TEST_VALUE: string = 'test_imdbID';
	const DUMMY_MOVIE_OBJECT: MovieDataType = {
		Poster: MOVIE_POSTER_TEST_VALUE,
		Title: MOVIE_TITLE_TEST_VALUE,
		Type: 'test_Type',
		Year: MOVIE_YEAR_TEST_VALUE,
		imdbID: MOVIE_IMDBID_TEST_VALUE,
	};

	let movieListItemElement: HTMLLIElement;
	let movieListItemImageElement: HTMLImageElement;
	let movieListItemTitleElement: HTMLHeadingElement;
	let movieListItemSpanElement: HTMLSpanElement;
	let renderHookResult: RenderHookResult;

	beforeEach(() => {
		const { result } = renderHook(() => {
			const { selectedMovieID, setSelectedMovieID } = useMovies('');
			return { selectedMovieID, setSelectedMovieID };
		});

		const { getByTestId } = render(
			<MovieListItem
				movie={DUMMY_MOVIE_OBJECT}
				setSelectedMovieID={result.current.setSelectedMovieID}
			/>
		);

		renderHookResult = result as RenderHookResult;
		movieListItemElement = getByTestId('movieListItem') as HTMLLIElement;
		movieListItemImageElement = movieListItemElement.children[0] as HTMLImageElement;
		movieListItemTitleElement = movieListItemElement.children[1] as HTMLHeadingElement;
		movieListItemSpanElement = getByTestId('movieYear') as HTMLSpanElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(movieListItemElement).toBeInTheDocument();
	});

	test('should render the correct movie detials', () => {
		expect(movieListItemTitleElement.innerHTML).toBe(MOVIE_TITLE_TEST_VALUE);
		expect(movieListItemSpanElement.innerHTML).toBe(MOVIE_YEAR_TEST_VALUE);
		expect(movieListItemImageElement).toHaveAttribute('src', MOVIE_POSTER_TEST_VALUE);
		expect(movieListItemImageElement).toHaveAttribute(
			'alt',
			`${MOVIE_TITLE_TEST_VALUE} poster`
		);
	});

	test('should set SelectedMovieID if the user clicks on MovieListItem', () => {
		expect(renderHookResult.current.selectedMovieID).toBe(null);

		// Simulating the user event to the movieListItemElement.
		fireEvent.click(
			movieListItemElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		// Triple clicking the movieListItemElement to touch both outcomes of line 13.
		fireEvent.click(
			movieListItemElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		fireEvent.click(
			movieListItemElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(renderHookResult.current.selectedMovieID).toBe(MOVIE_IMDBID_TEST_VALUE);
	});
});
