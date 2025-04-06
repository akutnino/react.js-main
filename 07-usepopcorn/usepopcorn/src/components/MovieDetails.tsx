import { useEffect, useRef, useState, type Dispatch } from 'react';
import {
	type SuccessFetchMoviesDetailsResponseType,
	type WatchedMovieDataType,
	type FetchMovieDetailsResponseType,
} from '../types/components/types.ts';
import StarRating from './StarRating.tsx';
import Loader from './Loader.tsx';
import ErrorMessage from './ErrorMessage.tsx';

const KEY = '3494c38';

function MovieDetails({
	selectedMovieID,
	watched,
	setSelectedMovieID,
	setWatched,
}: {
	selectedMovieID: string | null;
	watched: WatchedMovieDataType[];
	setSelectedMovieID: Dispatch<React.SetStateAction<string | null>>;
	setWatched: Dispatch<React.SetStateAction<WatchedMovieDataType[]>>;
}) {
	const [movie, setMovie] = useState<SuccessFetchMoviesDetailsResponseType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [fetchErrorMessage, setFetchErrorMessage] = useState<string>('');
	const [userRating, setUserRating] = useState<number>(0);
	const countRef = useRef<number>(0);

	const isMovieWatched: boolean = watched.reduce((acc, curr) => {
		return curr.imdbID === selectedMovieID ? (acc = true) : acc;
	}, false);
	const watchedUserMovieRating: number = watched.reduce((acc, curr) => {
		return curr.imdbID === selectedMovieID ? curr.userRating : acc;
	}, 0);

	const handleCloseDetails = () => {
		setSelectedMovieID(null);
	};

	const handleUserRating = (rating: number) => {
		setUserRating(rating);
	};

	const handleSetRating = (rating: number) => {
		return () => {
			const newWatchedMovie = {
				imdbID: movie?.imdbID,
				imdbRating: Number(movie?.imdbRating),
				Poster: movie?.Poster,
				runtime: Number(movie?.Runtime.split(' ').at(0)),
				Title: movie?.Title,
				Year: movie?.Year,
				userRating: rating,
				countRatingDecisions: countRef.current,
			} as WatchedMovieDataType;

			setSelectedMovieID(null);
			setWatched((currentWatched) => [...currentWatched, newWatchedMovie]);
		};
	};

	useEffect(() => {
		if (userRating) countRef.current = countRef.current + 1;
	}, [userRating]);

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

		return () => {
			setMovie(null);
		};
	}, [selectedMovieID]);

	useEffect(() => {
		const defaultAppName: string = 'usePopcorn';
		const titleElement = document.querySelector('title') as HTMLTitleElement;

		const updateToMovieTile = () => {
			if (isLoading) {
				titleElement.textContent = defaultAppName;
			} else {
				titleElement.textContent = `MOVIE: ${movie?.Title as string}`;
			}
		};

		if (movie?.Title === null) return;
		updateToMovieTile();

		return () => {
			titleElement.textContent = defaultAppName;
		};
	}, [movie, isLoading]);

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
							{isMovieWatched ? (
								<p>You Rated this Movie: {watchedUserMovieRating} / 10 ⭐</p>
							) : (
								<>
									<StarRating
										defaultRating={userRating}
										onSetRating={handleUserRating}
										maxRating={10}
										size={24}
									/>

									{userRating > 0 && (
										<button
											type='button'
											className='btn-add'
											onClick={handleSetRating(userRating)}
										>
											Add to List
										</button>
									)}
								</>
							)}
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
