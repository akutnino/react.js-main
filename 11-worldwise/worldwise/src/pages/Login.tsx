import { useState, type ChangeEvent } from 'react';
import styles from '../styles/pages/Login.module.scss';
import PageNav from '../components/PageNav.tsx';

function Login() {
	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState<string>('jack@example.com');
	const [password, setPassword] = useState<string>('qwerty');

	const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

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
					<button>Login</button>
				</div>
			</form>
		</main>
	);
}

export default Login;
