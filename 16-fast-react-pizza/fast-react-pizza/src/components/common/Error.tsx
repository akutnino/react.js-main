import { useSelector } from 'react-redux';
import { useNavigate, type NavigateFunction } from 'react-router';
import { selectMenu } from '../../stores/selectors/menuSelectors.ts';
import type { MenuInitialStateType } from '../../types/stores/reducers/menu-types.ts';

function Error() {
	const navigate: NavigateFunction = useNavigate();
	const { errorMessage }: MenuInitialStateType = useSelector(selectMenu);

	const isError: boolean = errorMessage !== '';

	const handleBack = () => {
		navigate('/', { replace: true });
	};

	return (
		<div>
			<h1>Something went wrong 😢</h1>
			{isError && <p>{errorMessage}</p>}
			<button onClick={handleBack}>&larr; Go back</button>
		</div>
	);
}

export default Error;
