import { type Dispatch, useEffect, useState } from 'react';
import {
	type MovieDataType,
	type FetchMoviesResponseType,
} from '../types/components/types.ts';

const KEY = '3494c38';

export function useMovies(query: string): {
	movies: MovieDataType[];
	isLoading: boolean;
	fetchErrorMessage: string;
	selectedMovieID: string | null;
	setSelectedMovieID: Dispatch<React.SetStateAction<string | null>>;
} {
	const [movies, setMovies] = useState<MovieDataType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [fetchErrorMessage, setFetchErrorMessage] = useState<string>('');
	const [selectedMovieID, setSelectedMovieID] = useState<string | null>(null);

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

	return {
		movies,
		isLoading,
		fetchErrorMessage,
		selectedMovieID,
		setSelectedMovieID,
	};
}
