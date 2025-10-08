import { useEffect, useState, type ChangeEvent, type MouseEvent } from 'react';
import { useAuth } from '../contexts/FakeAuthContext.tsx';
import { useNavigate, type NavigateFunction } from 'react-router';
import type { AuthContextValueType } from '../types/contexts/types.ts';
import styles from '../styles/pages/Login.module.scss';

import PageNav from '../components/PageNav.tsx';
import Button from '../components/Button.tsx';

function Login() {
	const { handleLogin, isAuthenticated }: AuthContextValueType = useAuth();
	const [email, setEmail] = useState<string>('jack@example.com');
	const [password, setPassword] = useState<string>('qwerty');
	const navigate: NavigateFunction = useNavigate();

	const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleUserLogin = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		handleLogin(email, password);
	};

	useEffect(() => {
		if (isAuthenticated) navigate('/app', { replace: true });

		return () => {};
	}, [isAuthenticated, navigate]);

	return (
		<main className={styles.login}>
			<PageNav />

			<form className={styles.form}>
				<div className={styles.row}>
					<label htmlFor='email'>Email address</label>
					<input
						type='email'
						id='email'
						onChange={handleEmailInput}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						onChange={handlePasswordInput}
						value={password}
					/>
				</div>

				<div>
					<Button
						type='submit'
						onClick={handleUserLogin}
					>
						Login
					</Button>
				</div>
			</form>
		</main>
	);
}

export default Login;
