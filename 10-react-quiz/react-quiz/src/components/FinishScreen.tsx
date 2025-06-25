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
	const totalScorePercentage: number = (userTotalPoints / maxPossiblePoints) * 100;

	const handleClick = () => {
		dispatch({
			type: 'resetQuiz',
		});
	};

	return (
		<>
			<p className='result'>
				You scored <strong>{userTotalPoints}</strong> out of {maxPossiblePoints} (
				{Math.ceil(totalScorePercentage)}%)
			</p>
			<p className='highscore'>(Highscore: {userHighscore} points)</p>
			<Button onClick={handleClick}>Reset Quiz</Button>
		</>
	);
}

export default FinishScreen;
