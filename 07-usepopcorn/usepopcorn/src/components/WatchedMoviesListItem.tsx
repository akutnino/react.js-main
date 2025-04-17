import { type WatchedMovieDataType } from '../types/components/types.ts';
import { type SetWatchedType } from '../types/hooks/types.ts';

function WatchedMoviesListItem({
	movie,
	setWatched,
}: {
	movie: WatchedMovieDataType;
	setWatched: SetWatchedType;
}) {
	const handleDeleteWatchedMovie = (movieID: string) => {
		return () => {
			setWatched((currentWatched) => {
				const updatedWatched: WatchedMovieDataType[] = currentWatched.filter(
					(watchedMovie) => watchedMovie.imdbID !== movieID
				);

				if (updatedWatched.length === 0) localStorage.clear();
				return currentWatched.filter((watchedMovie) => watchedMovie.imdbID !== movieID);
			});
		};
	};

	return (
		<li data-testid='watchedMoviesListItem'>
			<img
				src={movie.Poster}
				alt={`${movie.Title} poster`}
			/>
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span data-testid='imdbRating'>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span data-testid='userRating'>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span data-testid='runtime'>{movie.runtime} min</span>
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
