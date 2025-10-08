import type { AuthContextValueType } from '../types/contexts/types.ts';
import { useAuth } from '../contexts/FakeAuthContext.tsx';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useEffect } from 'react';
import styles from '../styles/pages/AppLayout.module.scss';

import Sidebar from '../components/Sidebar.tsx';
import Map from '../components/Map.tsx';
import User from '../components/User.tsx';

function AppLayout() {
	const { isAuthenticated, user }: AuthContextValueType = useAuth();
	const navigate: NavigateFunction = useNavigate();

	useEffect(() => {
		if (!isAuthenticated || !user) navigate('/', { replace: true });

		return () => {};
	}, [isAuthenticated, user, navigate]);

	return (
		<>
			{isAuthenticated && (
				<div className={styles.app}>
					<Sidebar />
					<User />
					<Map />
				</div>
			)}
		</>
	);
}

export default AppLayout;
