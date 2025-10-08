import { type MouseEvent } from 'react';
import type { AuthContextValueType } from '../types/contexts/types.ts';
import { useAuth } from '../contexts/FakeAuthContext.tsx';
import styles from '../styles/components/User.module.scss';

import Button from './Button.tsx';

function User() {
	const { user, handleLogout }: AuthContextValueType = useAuth();

	const handleUserLogout = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		handleLogout();
	};

	return (
		<>
			{user !== null && (
				<div className={styles.user}>
					<img
						src={user.avatar}
						alt={user.name}
					/>
					<span>Welcome, {user.name}</span>
					<Button
						type='primary'
						onClick={handleUserLogout}
					>
						Logout
					</Button>
				</div>
			)}
		</>
	);
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
