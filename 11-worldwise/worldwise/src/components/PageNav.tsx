import { NavLink } from 'react-router';
import styles from '../styles/components/PageNav.module.scss';

import Logo from './Logo.tsx';

function PageNav() {
	return (
		<nav className={styles.nav}>
			<Logo />

			<ul>
				<li>
					<NavLink to={'/product'}>Product</NavLink>
				</li>

				<li>
					<NavLink to={'/pricing'}>Pricing</NavLink>
				</li>

				<li>
					<NavLink
						to={'/login'}
						className={styles.ctaLink}
					>
						Login
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default PageNav;
