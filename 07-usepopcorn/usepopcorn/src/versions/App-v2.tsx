import { useEffect, useState } from 'react';
import {
	type WatchedMovieDataType,
	type MovieDataType,
	type FetchMoviesResponseType,
} from '../types/components/types.ts';
import NavBar from '../components/NavBar.tsx';
import MainSection from '../components/MainSection.tsx';
import NumResults from '../components/NumResults.tsx';
import MovieList from '../components/MovieList.tsx';
import Box from '../components/Box.tsx';
import WatchedSummary from '../components/WatchedSummary.tsx';
import WatchedMoviesList from '../components/WatchedMoviesList.tsx';
import Loader from '../components/Loader.tsx';
import ErrorMessage from '../components/ErrorMessage.tsx';
import Search from '../components/Search.tsx';
import MovieDetails from '../components/MovieDetails.tsx';

const KEY = '3494c38';

function App() {
	const [query, setQuery] = useState<string>('');
	const [movies, setMovies] = useState<MovieDataType[]>([]);
	const [watched, setWatched] = useState<WatchedMovieDataType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedMovieID, setSelectedMovieID] = useState<string | null>(null);
	const [fetchErrorMessage, setFetchErrorMessage] = useState<string>('');

	useEffect(() => {
		const controller: AbortController = new AbortController();

		const fetchMovies = async () => {
			try {
				setFetchErrorMessage('');
				setIsLoading(true);

				const fetchURL: RequestInfo = `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`;
				const fetchOptions: RequestInit = {
					method: 'GET',
					signal: controller.signal,
				};

				const response: Response = await fetch(fetchURL, fetchOptions);
				if (!response.ok) throw new Error('Fetch Response Failed');

				const data: FetchMoviesResponseType = await response.json();
				if (data.Response === 'False') throw new Error(data.Error);

				setMovies(data.Search);
			} catch (error) {
				if (error instanceof Error) {
					if (error.name === 'AbortError') return;
					setFetchErrorMessage(error.message);
					setMovies([]);
				}
			} finally {
				setIsLoading(false);
			}
		};

		if (query.length <= 3) {
			setFetchErrorMessage('');
			setMovies([]);
			return;
		}

		setSelectedMovieID(null);
		fetchMovies();

		return () => {
			controller.abort();
		};
	}, [query]);

	useEffect(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.code === 'Escape') setSelectedMovieID(null);
		};

		if (selectedMovieID) document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	}, [selectedMovieID]);

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
