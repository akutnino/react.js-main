import { type WatchedMovieDataType } from '../types/components/types.ts';

const average = (array: number[]) =>
	array.reduce((acc, curr, _, arr) => acc + curr / arr.length, 0);

function WatchedSummary({ watched }: { watched: WatchedMovieDataType[] }) {
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));

	return (
		<div
			className='summary'
			data-testid='watchedSummary'
		>
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span data-testid='totalWatched'>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span data-testid='avgImdbRating'>{avgImdbRating.toFixed(2)}</span>
				</p>
				<p>
					<span>🌟</span>
					<span data-testid='avgUserRating'>{avgUserRating.toFixed(2)}</span>
				</p>
				<p>
					<span>⏳</span>
					<span data-testid='avgRuntime'>{avgRuntime} min</span>
				</p>
			</div>
		</div>
	);
}

export default WatchedSummary;
