import Logo from './Logo.tsx';
import NumResults from './NumResults.tsx';
import Search from './Search.tsx';

function NavBar() {
	return (
		<nav className='nav-bar'>
			<Logo />
			<Search />
			<NumResults />
		</nav>
	);
}

export default NavBar;
