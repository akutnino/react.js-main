import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/FakeAuthContext';
import { useEffect } from 'react';

export default function ProtectedRoute(props) {
	const { children } = props;
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) navigate('/');

		return () => {};
	}, [isAuthenticated, navigate]);

	return children;
}
