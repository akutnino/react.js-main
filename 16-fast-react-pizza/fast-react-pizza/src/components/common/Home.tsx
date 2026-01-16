import { useSelector } from 'react-redux';
import { selectUser } from '../../stores/selectors/userSelectors.ts';
import type { UserInitialStateType } from '../../types/stores/reducers/user-types.ts';

import CreateUser from '../features/user/CreateUser.tsx';
import Button from './Button.tsx';

function Home() {
	const { username }: UserInitialStateType = useSelector(selectUser);

	return (
		<div className='my-10 px-4 text-center sm:my-16'>
			<h1 className='mb-8  text-xl font-semibold md:text-3xl'>
				The best pizza.
				<br />
				<span className='text-yellow-500'>
					Straight out of the oven, straight to you.
				</span>
			</h1>

			{username === null && <CreateUser />}

			{username !== null && (
				<Button
					to='/menu'
					type='primary'
				>
					Hey {username}, See Our Menu!
				</Button>
			)}
		</div>
	);
}

export default Home;
