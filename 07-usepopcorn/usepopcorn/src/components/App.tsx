import { useEffect, useState } from 'react';
import {
	type WatchedMovieDataType,
	type MovieDataType,
	type ResponseDataType,
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

const tempMovieData: MovieDataType[] = [
	{
		imdbID: 'tt1375666',
		Title: 'Inception',
		Year: '2010',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
	},
	{
		imdbID: 'tt0133093',
		Title: 'The Matrix',
		Year: '1999',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
	},
	{
		imdbID: 'tt6751668',
		Title: 'Parasite',
		Year: '2019',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
	},
];

const tempWatchedData: WatchedMovieDataType[] = [
	{
		imdbID: 'tt1375666',
		Title: 'Inception',
		Year: '2010',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
		runtime: 148,
		imdbRating: 8.8,
		userRating: 10,
	},
	{
		imdbID: 'tt0088763',
		Title: 'Back to the Future',
		Year: '1985',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
		runtime: 116,
		imdbRating: 8.5,
		userRating: 9,
	},
];

const KEY = '3494c38';

function App() {
	const [movies, setMovies] = useState<MovieDataType[]>(tempMovieData);
	const [watched, setWatched] = useState<WatchedMovieDataType[]>(tempWatchedData);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [fetchErrorMessage, setFetchErrorMessage] = useState<string>('');
	const query = 'interstellar';

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				setIsLoading(true);

				const fetchURL: RequestInfo = `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`;
				const fetchOptions: RequestInit = {
					method: 'GET',
				};

				const response: Response = await fetch(fetchURL, fetchOptions);
				if (!response.ok) throw new Error('Fetch Response Failed');

				const data: ResponseDataType = await response.json();
				if (data.Response === 'False') throw new Error(data.Error);

				setMovies(data.Search);
				setIsLoading(false);
			} catch (error) {
				if (error instanceof Error) {
					setFetchErrorMessage(error.message);
					setMovies([]);
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchMovies();
	}, []);

	return (
		<>
			<NavBar>
				<NumResults movies={movies} />
			</NavBar>

			<MainSection>
				<Box>
					{isLoading && <Loader />}
					{fetchErrorMessage && <ErrorMessage message={fetchErrorMessage} />}
					{!fetchErrorMessage && !isLoading && <MovieList movies={movies} />}
				</Box>

				<Box>
					<WatchedSummary watched={watched} />
					<WatchedMoviesList watched={watched} />
				</Box>
			</MainSection>
		</>
	);
}

export default App;
