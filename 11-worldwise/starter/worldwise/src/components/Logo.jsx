import styles from '../styles/Logo.module.scss';

export default function Logo() {
	return (
		<img
			src='/logo.png'
			alt='WorldWise logo'
			className={styles.logo}
		/>
	);
}
