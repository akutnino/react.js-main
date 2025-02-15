import { type MovieDataType } from '../types/components/types.ts';

function MovieListItem({ movie }: { movie: MovieDataType }) {
	return (
		<li>
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
