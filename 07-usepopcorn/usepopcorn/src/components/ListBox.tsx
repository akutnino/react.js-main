import { useState } from 'react';
import { type MovieDataType } from '../types/components/types.ts';
import MovieList from './MovieList.tsx';

function ListBox({ movies }: { movies: MovieDataType[] }) {
	const [isOpen1, setIsOpen1] = useState<boolean>(true);

	return (
		<div className='box'>
			<button
				className='btn-toggle'
				onClick={() => setIsOpen1((open) => !open)}
			>
				{isOpen1 ? '–' : '+'}
			</button>
			{isOpen1 && <MovieList movies={movies} />}
		</div>
	);
}
export default ListBox;
