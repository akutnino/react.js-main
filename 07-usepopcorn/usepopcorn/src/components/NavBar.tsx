import { type ReactNode } from 'react';
import Logo from './Logo.tsx';
import Search from './Search.tsx';

function NavBar({ children }: { children: ReactNode }) {
	return (
		<nav className='nav-bar'>
			<Logo />
			<Search />
			{children}
		</nav>
	);
}

export default NavBar;
