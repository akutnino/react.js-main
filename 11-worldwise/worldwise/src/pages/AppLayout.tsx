import styles from '../styles/pages/AppLayout.module.scss';

import Sidebar from '../components/Sidebar.tsx';
import Map from '../components/Map.tsx';

function AppLayout() {
	return (
		<div className={styles.app}>
			<Sidebar />
			<Map />
		</div>
	);
}

export default AppLayout;
