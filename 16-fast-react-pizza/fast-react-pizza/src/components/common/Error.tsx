import { useNavigate, type NavigateFunction } from 'react-router';

function NotFound() {
	const navigate: NavigateFunction = useNavigate();

	const handleBack = () => {
		navigate('/', { replace: true });
	};

	return (
		<div>
			<h1>Something went wrong 😢</h1>
			<p>%MESSAGE%</p>
			<button onClick={handleBack}>&larr; Go back</button>
		</div>
	);
}

export default NotFound;
