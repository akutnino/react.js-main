import { type MovieDataType } from '../types/components/types.ts';

function NumResults({ movies }: { movies: MovieDataType[] }) {
	return (
		<p className='num-results'>
			Found <strong>{movies.length}</strong> results
		</p>
	);
}

export default NumResults;
