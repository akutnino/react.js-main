import { type Dispatch } from 'react';
import { type MovieDataType } from '../types/components/types.ts';

import MovieListItem from './MovieListItem.tsx';

function MovieList({
	movies,
	setSelectedMovieID,
}: {
	movies: MovieDataType[];
	setSelectedMovieID: Dispatch<React.SetStateAction<string | null>>;
}) {
	return (
		<ul
			className='list list-movies'
			data-testid='movieList'
		>
			{movies?.map((movie: MovieDataType) => (
				<MovieListItem
					setSelectedMovieID={setSelectedMovieID}
					movie={movie}
					key={movie.imdbID}
				/>
			))}
		</ul>
	);
}

export default MovieList;
