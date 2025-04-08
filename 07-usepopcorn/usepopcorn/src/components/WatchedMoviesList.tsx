import { type WatchedMovieDataType } from '../types/components/types.ts';
import { type SetWatchedType } from '../types/hooks/types.ts';
import WatchedMoviesListItem from './WatchedMoviesListItem.tsx';

function WatchedMoviesList({
	watched,
	setWatched,
}: {
	watched: WatchedMovieDataType[];
	setWatched: SetWatchedType;
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
