import { useSelector } from 'react-redux';
import { selectUser } from '../../../stores/selectors/userSelectors.ts';
import type { UserInitialStateType } from '../../../types/stores/reducers/user-types.ts';

function Username() {
	const { username }: UserInitialStateType = useSelector(selectUser);

	if (username === null) return;
	return <div className='hidden text-sm font-semibold md:block'>{username}</div>;
}

export default Username;
