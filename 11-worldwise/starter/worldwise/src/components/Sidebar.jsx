import { Outlet } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import AppNav from './AppNav';
import Logo from './Logo';
import Footer from './Footer';
import Spinner from './Spinner';
import styles from '../styles/Sidebar.module.scss';

export default function Sidebar(props) {
	const { isLoading } = useCities();

	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />
			{isLoading ? <Spinner /> : <Outlet />}
			<Footer />
		</div>
	);
}
