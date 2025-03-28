import { useEffect, useState, type Dispatch } from 'react';
import {
	SuccessFetchMoviesDetailsResponseType,
	type FetchMovieDetailsResponseType,
} from '../types/components/types.ts';
import StarRating from './StarRating.tsx';
import Loader from './Loader.tsx';
import ErrorMessage from './ErrorMessage.tsx';

const KEY = '3494c38';

function MovieDetails({
	selectedMovieID,
	setSelectedMovieID,
}: {
	selectedMovieID: string | null;
	setSelectedMovieID: Dispatch<React.SetStateAction<string | null>>;
}) {
	const [movie, setMovie] = useState<SuccessFetchMoviesDetailsResponseType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [fetchErrorMessage, setFetchErrorMessage] = useState<string>('');

	const handleCloseDetails = () => {
		setSelectedMovieID(null);
	};

	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				setFetchErrorMessage('');
				setIsLoading(true);

				const fetchURL: RequestInfo = `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieID}`;
				const fetchOptions: RequestInit = {
					method: 'GET',
				};

				const response: Response = await fetch(fetchURL, fetchOptions);
				if (!response.ok) throw new Error('Fetch Response Failed');

				const data: FetchMovieDetailsResponseType = await response.json();
				if (data.Response === 'False') throw new Error(data.Error);

				setMovie(data);
			} catch (error) {
				if (error instanceof Error) {
					setFetchErrorMessage(error.message);
				}
			} finally {
				setIsLoading(false);
			}
		};

		if (selectedMovieID === null) return;
		fetchMovieDetails();

		return () => setMovie(null);
	}, [selectedMovieID]);

	return (
		<div className='details'>
			{isLoading && <Loader />}

			{fetchErrorMessage && <ErrorMessage message={fetchErrorMessage} />}

			{!fetchErrorMessage && !isLoading && (
				<>
					<header>
						<button
							className='btn-back'
							onClick={handleCloseDetails}
						>
							&larr;
						</button>
						<img
							src={movie?.Poster}
							alt={`Poster of: ${movie?.Title}`}
							srcSet={movie?.Poster}
						/>
						<div className='details-overview'>
							<h2>{movie?.Title}</h2>
							<p>
								{movie?.Released} &bull; {movie?.Runtime}
							</p>
							<p>{movie?.Genre}</p>
							<p>
								<span>⭐</span> {movie?.imdbRating} IMDB Rating
							</p>
						</div>
					</header>

					<section>
						<div className='rating'>
							<StarRating
								maxRating={10}
								size={24}
							/>
						</div>

						<p>
							<em>{movie?.Plot}</em>
						</p>
						<p>Cast: {movie?.Actors}</p>
						<p>Directed by: {movie?.Director}</p>
					</section>
				</>
			)}
		</div>
	);
}

export default MovieDetails;
