import { cleanup, render, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { useState } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState.ts';
import MovieDetails from '../../components/MovieDetails.tsx';

describe('MovieDetails component test suite', () => {
	const LOCALSTORAGE_INITIALSTATE: [] = [];
	const LOCALSTORAGE_KEY_VALUE: string = 'test';
	const DUMMY_SELECTEDMOVIEID: string = 'tt4244162';

	let movieDetailsElement: HTMLDivElement;
	let detailsHeaderElement: HTMLElement;
	let detailsSectionElement: HTMLElement;

	beforeEach(async () => {
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

		const { getByTestId, findByTestId } = render(
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

		movieDetailsElement = getByTestId('movieDetails') as HTMLDivElement;
		detailsHeaderElement = (await findByTestId('detailsHeader', undefined, {
			timeout: 3000,
		})) as HTMLElement;
		detailsSectionElement = (await findByTestId('detailsSection', undefined, {
			timeout: 3000,
		})) as HTMLElement;
	});

	afterEach(() => {
		vi.clearAllTimers();
		localStorage.clear();
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(movieDetailsElement).toContainElement(detailsHeaderElement);
		expect(movieDetailsElement).toContainElement(detailsSectionElement);
	});

	test.todo('should render the correct movie details from the api response', () => {});

	test.todo('should verify the tab title and the selected movie is the same', () => {});

	test.todo(
		'should render the Add to List button if the user has rated the movie',
		() => {}
	);

	test.todo(
		'should clode the MovieDetails component if the user clicks the close button'
	);

	// exempted test
	test.todo(
		'should render the user rating message if the user has watched the movie',
		() => {}
	);

	test.todo(
		'should render the correct error message if the selectedMovieID is invalid',
		() => {}
	);
});
