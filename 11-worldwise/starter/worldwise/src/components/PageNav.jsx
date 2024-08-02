import { NavLink } from 'react-router-dom';

import styles from '../styles/PageNav.module.scss';

export default function PageNav() {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<NavLink to={'/'}>Home</NavLink>
				</li>
				<li>
					<NavLink to={'/product'}>Product</NavLink>
				</li>
				<li>
					<NavLink to={'/pricing'}>Pricing</NavLink>
				</li>
			</ul>
		</nav>
	);
}