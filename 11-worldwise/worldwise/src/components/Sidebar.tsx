import { Outlet } from 'react-router';
import styles from '../styles/components/Sidebar.module.scss';

import AppNav from './AppNav.tsx';
import Footer from './Footer.tsx';
import Logo from './Logo.tsx';

function Sidebar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />
			<Outlet />
			<Footer />
		</div>
	);
}

export default Sidebar;
