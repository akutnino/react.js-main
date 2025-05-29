import { useState } from 'react';
import { useMovies } from '../hooks/useMovies.ts';
import { useLocalStorageState } from '../hooks/useLocalStorageState.ts';
import { useKey } from '../hooks/useKey.ts';

import NavBar from './NavBar.tsx';
import MainSection from './MainSection.tsx';
import NumResults from './NumResults.tsx';
import MovieList from './MovieList.tsx';
import Box from './Box.tsx';
import WatchedSummary from './WatchedSummary.tsx';
import WatchedMoviesList from './WatchedMoviesList.tsx';
import Loader from './Loader.tsx';
import ErrorMessage from './ErrorMessage.tsx';
import Search from './Search.tsx';
import MovieDetails from './MovieDetails.tsx';

function App() {
	const [query, setQuery] = useState<string>('');
	const { watched, setWatched } = useLocalStorageState([], 'watched');
	const { movies, isLoading, fetchErrorMessage, selectedMovieID, setSelectedMovieID } =
		useMovies(query);

	useKey('Escape', () => {
		if (selectedMovieID === null) return;
		setSelectedMovieID(null);
	});

	return (
		<>
			<NavBar>
				<Search
					query={query}
					setQuery={setQuery}
				/>
				<NumResults movies={movies} />
			</NavBar>

			<MainSection>
				<Box>
					{isLoading && <Loader />}
					{fetchErrorMessage && <ErrorMessage message={fetchErrorMessage} />}
					{!fetchErrorMessage && !isLoading && (
						<MovieList
							movies={movies}
							setSelectedMovieID={setSelectedMovieID}
						/>
					)}
				</Box>

				<Box>
					{selectedMovieID ? (
						<MovieDetails
							selectedMovieID={selectedMovieID}
							setSelectedMovieID={setSelectedMovieID}
							watched={watched}
							setWatched={setWatched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMoviesList
								watched={watched}
								setWatched={setWatched}
							/>
						</>
					)}
				</Box>
			</MainSection>
		</>
	);
}

export default App;
