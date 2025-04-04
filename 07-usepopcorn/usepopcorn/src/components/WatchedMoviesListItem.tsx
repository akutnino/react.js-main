import { type Dispatch } from 'react';
import { type WatchedMovieDataType } from '../types/components/types.ts';

function WatchedMoviesListItem({
	movie,
	setWatched,
}: {
	movie: WatchedMovieDataType;
	setWatched: Dispatch<React.SetStateAction<WatchedMovieDataType[]>>;
}) {
	const handleDeleteWatchedMovie = (movieID: string) => {
		return () => {
			setWatched((currentWatched) =>
				currentWatched.filter((watchedMovie) => watchedMovie.imdbID !== movieID)
			);

			localStorage.setItem('', '');
		};
	};

	return (
		<li>
			<img
				src={movie.Poster}
				alt={`${movie.Title} poster`}
			/>
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>

				<button
					type='button'
					className='btn-delete'
					onClick={handleDeleteWatchedMovie(movie.imdbID)}
				>
					X
				</button>
			</div>
		</li>
	);
}

export default WatchedMoviesListItem;
