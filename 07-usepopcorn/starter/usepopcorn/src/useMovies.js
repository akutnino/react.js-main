import { useEffect, useState } from 'react';

const KEY = '3494c38';

export function useMovies(query, callback) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		const controller = new AbortController();

		const fetchMovies = async () => {
			try {
				setIsLoading(true);
				setError('');

				const response = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
					{ signal: controller.signal }
				);

				if (!response.ok) {
					throw new Error('Something Went Wrong');
				}

				const data = await response.json();

				if (data.Response === 'False') {
					throw new Error('Movie Not Found');
				}

				setMovies(data.Search);
				setError('');
			} catch (error) {
				if (error.name !== 'AbortError') {
					setError(error.message);
				}
			} finally {
				setIsLoading(false);
			}
		};

		if (query.length < 3) {
			setMovies([]);
			setError('');
			return;
		}

		// setSelectedMovieID(null);
		callback?.(null);
		fetchMovies();
		return () => controller.abort();
	}, [query, callback]);

	return { movies, isLoading, error };
}
