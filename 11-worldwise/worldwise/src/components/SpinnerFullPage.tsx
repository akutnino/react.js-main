import Spinner from './Spinner.tsx';
import styles from '../styles/components/SpinnerFullPage.module.scss';

function SpinnerFullPage() {
	return (
		<div className={styles.spinnerFullpage}>
			<Spinner />
		</div>
	);
}

export default SpinnerFullPage;
