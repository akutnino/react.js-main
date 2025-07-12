import { useEffect, type ActionDispatch } from 'react';
import type {
	ReactQuizActionType,
	UserAnswerIndexType,
} from '../types/components/types.ts';

function Timer({
	quizTimeRemaining,
	dispatch,
}: {
	quizTimeRemaining: UserAnswerIndexType;
	dispatch: ActionDispatch<[action: ReactQuizActionType]>;
}) {
	const MINUTES: number = Math.floor(quizTimeRemaining! / 60);
	const SECONDS: number = quizTimeRemaining! % 60;

	useEffect(() => {
		const TIMER_ID = setInterval(() => {
			if (quizTimeRemaining === 0) {
				clearInterval(TIMER_ID);
				dispatch({
					type: 'finishQuiz',
				});
			} else {
				dispatch({
					type: 'updateQuizTime',
				});
			}
		}, 1000);

		return () => {
			clearInterval(TIMER_ID);
		};
	}, [quizTimeRemaining, dispatch]);

	// prettier-ignore
	return (
		<div
			className='timer'
			data-testid='timer'
		>
			{MINUTES < 10 ? '0' : ''}
			{MINUTES}:
      {SECONDS < 10 ? '0' : ''}
			{SECONDS}
		</div>
	);
}

export default Timer;
