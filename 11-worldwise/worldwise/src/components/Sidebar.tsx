import styles from '../styles/components/Sidebar.module.scss';

import AppNav from './AppNav.tsx';
import Footer from './Footer.tsx';
import Logo from './Logo.tsx';

function Sidebar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />

			<p>List of Cities</p>

			<Footer />
		</div>
	);
}

export default Sidebar;
