import { type MovieDataType } from '../types/components/types.ts';
import MovieListItem from './MovieListItem.tsx';

function MovieList({ movies }: { movies: MovieDataType[] }) {
	return (
		<ul className='list'>
			{movies?.map((movie: MovieDataType) => (
				<MovieListItem
					movie={movie}
					key={movie.imdbID}
				/>
			))}
		</ul>
	);
}

export default MovieList;
