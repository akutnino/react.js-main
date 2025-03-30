import { type Dispatch } from 'react';
import { type WatchedMovieDataType } from '../types/components/types.ts';
import WatchedMoviesListItem from './WatchedMoviesListItem.tsx';

function WatchedMoviesList({
	watched,
	setWatched,
}: {
	watched: WatchedMovieDataType[];
	setWatched: Dispatch<React.SetStateAction<WatchedMovieDataType[]>>;
}) {
	return (
		<ul className='list'>
			{watched.map((movie: WatchedMovieDataType) => (
				<WatchedMoviesListItem
					setWatched={setWatched}
					movie={movie}
					key={movie.imdbID}
				/>
			))}
		</ul>
	);
}

export default WatchedMoviesList;
