import { useEffect, useState } from 'react';
import { useMovies } from '../hooks/useMovies.ts';
import { type WatchedMovieDataType } from '../types/components/types.ts';
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
	const [watched, setWatched] = useState<WatchedMovieDataType[]>(() => {
		localStorage.setItem('watched', JSON.stringify([]));
		return JSON.parse(localStorage.getItem('watched') as string);
	});
	const { movies, isLoading, fetchErrorMessage, selectedMovieID, setSelectedMovieID } =
		useMovies(query);

	useEffect(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.code === 'Escape') setSelectedMovieID(null);
		};

		if (selectedMovieID) document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	}, [selectedMovieID, setSelectedMovieID]);

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
