import { type WatchedMovieDataType } from '../types/components/types.ts';
import WatchedMoviesListItem from './WatchedMoviesListItem.tsx';

function WatchedMoviesList({ watched }: { watched: WatchedMovieDataType[] }) {
	return (
		<ul className='list'>
			{watched.map((movie: WatchedMovieDataType) => (
				<WatchedMoviesListItem
					movie={movie}
					key={movie.imdbID}
				/>
			))}
		</ul>
	);
}

export default WatchedMoviesList;
