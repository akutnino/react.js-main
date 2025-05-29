import { type ReactNode } from 'react';

import Logo from './Logo.tsx';

function NavBar({ children }: { children: ReactNode }) {
	return (
		<nav
			className='nav-bar'
			data-testid='navbar'
		>
			<Logo />
			{children}
		</nav>
	);
}

export default NavBar;
