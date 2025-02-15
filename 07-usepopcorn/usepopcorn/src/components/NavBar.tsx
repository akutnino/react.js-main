import { type MovieDataType } from '../types/components/types.ts';
import Logo from './Logo.tsx';
import NumResults from './NumResults.tsx';
import Search from './Search.tsx';

function NavBar({ movies }: { movies: MovieDataType[] }) {
	return (
		<nav className='nav-bar'>
			<Logo />
			<Search />
			<NumResults movies={movies} />
		</nav>
	);
}

export default NavBar;
