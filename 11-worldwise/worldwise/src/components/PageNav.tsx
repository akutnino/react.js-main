import { NavLink } from 'react-router';
import styles from '../styles/components/PageNav.module.scss';

function PageNav() {
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

export default PageNav;
