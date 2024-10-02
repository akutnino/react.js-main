import { useSelector } from 'react-redux';
import { getUsername } from '../../stores/selectors/userSelectors';

function Username() {
	const userName = useSelector(getUsername);

	if (!userName) return null;
	return <div className='hidden text-sm font-semibold md:block'>{userName}</div>;
}

export default Username;
