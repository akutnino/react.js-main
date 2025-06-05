import type { ActionDispatch } from 'react';
import type { ReactQuizActionType } from '../types/components/types.ts';

function NextButton({
	dispatch,
}: {
	dispatch: ActionDispatch<[action: ReactQuizActionType]>;
}) {
	const handleClick = () => {
		dispatch({
			type: 'nextQuestion',
		});
	};

	return (
		<button
			type='button'
			className='btn btn-ui'
			onClick={handleClick}
		>
			Next
		</button>
	);
}

export default NextButton;
