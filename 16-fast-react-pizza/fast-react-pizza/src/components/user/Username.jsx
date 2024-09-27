import { useSelector } from 'react-redux';
import { userSelector } from '../../selectors/userSelector';

function Username() {
	const { userName } = useSelector(userSelector);

	if (!userName) return null;
	return <div className='hidden text-sm font-semibold md:block'>{userName}</div>;
}

export default Username;
