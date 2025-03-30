import { useEffect, useState } from 'react';
import {
	type WatchedMovieDataType,
	type MovieDataType,
	type FetchMoviesResponseType,
} from '../types/components/types.ts';
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

const KEY = '3494c38';

function App() {
	const [movies, setMovies] = useState<MovieDataType[]>([]);
	const [watched, setWatched] = useState<WatchedMovieDataType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [fetchErrorMessage, setFetchErrorMessage] = useState<string>('');
	const [query, setQuery] = useState<string>('');
	const [selectedMovieID, setSelectedMovieID] = useState<string | null>(null);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				setFetchErrorMessage('');
				setIsLoading(true);

				const fetchURL: RequestInfo = `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`;
				const fetchOptions: RequestInit = {
					method: 'GET',
				};

				const response: Response = await fetch(fetchURL, fetchOptions);
				if (!response.ok) throw new Error('Fetch Response Failed');

				const data: FetchMoviesResponseType = await response.json();
				if (data.Response === 'False') throw new Error(data.Error);

				setMovies(data.Search);
			} catch (error) {
				if (error instanceof Error) {
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

		fetchMovies();
	}, [query]);

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
