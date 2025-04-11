import { type Dispatch } from 'react';
import { type MovieDataType } from '../types/components/types.ts';

function MovieListItem({
	movie,
	setSelectedMovieID,
}: {
	movie: MovieDataType;
	setSelectedMovieID: Dispatch<React.SetStateAction<string | null>>;
}) {
	const handleSelectMovie = (movieID: string) => {
		return () => {
			setSelectedMovieID((currentID) => (currentID === movieID ? null : movieID));
		};
	};

	return (
		<li
			data-testid='movieListItem'
			onClick={handleSelectMovie(movie.imdbID)}
		>
			<img
				src={movie.Poster}
				alt={`${movie.Title} poster`}
			/>
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
			</div>
		</li>
	);
}

export default MovieListItem;
