import type { ActionDispatch, ReactNode } from 'react';
import type { ReactQuizActionType } from '../types/components/types.ts';

function Button({
	isLastQuestion,
	dispatch,
	children,
}: {
	isLastQuestion: boolean;
	dispatch: ActionDispatch<[action: ReactQuizActionType]>;
	children: ReactNode;
}) {
	const handleClick = () => {
		if (isLastQuestion) {
			dispatch({
				type: 'finishQuiz',
			});
		} else {
			dispatch({
				type: 'nextQuestion',
			});
		}
	};

	return (
		<button
			type='button'
			className='btn btn-ui'
			onClick={handleClick}
		>
			{children}
		</button>
	);
}

export default Button;
