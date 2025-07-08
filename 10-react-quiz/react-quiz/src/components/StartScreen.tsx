import type { ActionDispatch } from 'react';
import type { ReactQuizActionType } from '../types/components/types.ts';

function StartScreen({
	totalQuestions,
	dispatch,
}: {
	totalQuestions: number;
	dispatch: ActionDispatch<[action: ReactQuizActionType]>;
}) {
	const handleStartQuiz = () => {
		dispatch({
			type: 'startQuiz',
		});
	};

	return (
		<div
			className='start'
			data-testid='start'
		>
			<h2>Welcome to The React Quiz!</h2>
			<h3>{totalQuestions} questions to test your React mastery</h3>
			<button
				type='button'
				className='btn btn-ui'
				onClick={handleStartQuiz}
			>
				Let's Start
			</button>
		</div>
	);
}

export default StartScreen;
