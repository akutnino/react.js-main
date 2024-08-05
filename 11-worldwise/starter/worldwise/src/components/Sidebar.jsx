import { Outlet } from 'react-router-dom';
import styles from '../styles/Sidebar.module.scss';
import AppNav from './AppNav';
import Logo from './Logo';
import Footer from './Footer';

export default function Sidebar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />
			<Outlet />
			<Footer />
		</div>
	);
}
