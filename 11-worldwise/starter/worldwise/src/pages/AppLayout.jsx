import PropTypes from 'prop-types';
import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import styles from '../styles/AppLayout.module.scss';

AppLayout.propTypes = {
	isLoading: PropTypes.bool
};

export default function AppLayout(props) {
	const { isLoading } = props;

	return (
		<div className={styles.app}>
			<Sidebar isLoading={isLoading} />
			<Map />
		</div>
	);
}
