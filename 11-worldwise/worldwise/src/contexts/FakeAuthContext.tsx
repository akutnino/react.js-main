import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { AUTH_INITIAL_STATE, authReducer } from '../reducers/authReducer.ts';
import type { AuthInitialStateType } from '../types/reducers/types.ts';
import type { AuthContextValueType } from '../types/contexts/types.ts';
import type { UserType } from '../types/components/types.ts';

const FAKE_USER: UserType = {
	name: 'Jack',
	email: 'jack@example.com',
	password: 'qwerty',
	avatar: 'https://i.pravatar.cc/100?u=zz',
};

const AuthContext = createContext<AuthContextValueType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
	const { user, isAuthenticated }: AuthInitialStateType = state;

	const handleLogin = (email: string, password: string) => {
		if (email === FAKE_USER.email && password === FAKE_USER.password)
			dispatch({
				type: 'user/login',
				payload: FAKE_USER,
			});
	};

	const handleLogout = () => {
		dispatch({
			type: 'user/logout',
		});
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				handleLogin,
				handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext<AuthContextValueType | null>(AuthContext);

	if (context === null) throw new Error('AuthContext cannot be null.');
	if (context === undefined) throw new Error('Outside of AuthContext Scope.');
	return context;
}

export { AuthProvider, useAuth };
