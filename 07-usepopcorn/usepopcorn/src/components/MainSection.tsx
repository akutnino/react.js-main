import { type MovieDataType } from '../types/components/types.ts';
import ListBox from './ListBox.tsx';
import WatchedBox from './WatchedBox.tsx';

function MainSection({ movies }: { movies: MovieDataType[] }) {
	return (
		<main className='main'>
			<ListBox movies={movies} />
			<WatchedBox />
		</main>
	);
}

export default MainSection;
