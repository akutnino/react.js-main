import { Link } from 'react-router';
import styles from '../styles/components/Logo.module.scss';

function Logo() {
	return (
		<Link to={'/'}>
			<img
				src='/logo.png'
				alt='WorldWise logo'
				className={styles.logo}
			/>
		</Link>
	);
}

export default Logo;
