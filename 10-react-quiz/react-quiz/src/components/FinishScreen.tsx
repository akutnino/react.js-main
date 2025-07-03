import type { ActionDispatch } from 'react';
import type { ReactQuizActionType } from '../types/components/types.ts';

import Button from './Button.tsx';

function FinishScreen({
	userTotalPoints,
	maxPossiblePoints,
	userHighscore,
	dispatch,
}: {
	userTotalPoints: number;
	maxPossiblePoints: number;
	userHighscore: number;
	dispatch: ActionDispatch<[action: ReactQuizActionType]>;
}) {
	const totalScorePercentage: number = Math.ceil(
		(userTotalPoints / maxPossiblePoints) * 100
	);

	const finalResult: number = Number.isNaN(totalScorePercentage)
		? 0
		: totalScorePercentage;

	const handleClick = () => {
		dispatch({
			type: 'resetQuiz',
		});
	};

	return (
		<>
			<p
				className='result'
				data-testid='result'
			>
				You scored <strong>{userTotalPoints}</strong> out of {maxPossiblePoints} (
				{finalResult}%)
			</p>
			<p
				className='highscore'
				data-testid='highscore'
			>
				(Highscore: {userHighscore} points)
			</p>
			<Button onClick={handleClick}>Reset Quiz</Button>
		</>
	);
}

export default FinishScreen;
