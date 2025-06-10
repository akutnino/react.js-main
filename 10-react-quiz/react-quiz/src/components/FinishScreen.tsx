import type { ActionDispatch } from 'react';
import Button from './Button.tsx';
import type {
	QuestionsArrayType,
	ReactQuizActionType,
} from '../types/components/types.ts';

function FinishScreen({
	userTotalPoints,
	maxPossiblePoints,
	userHighscore,
	questions,
	dispatch,
}: {
	userTotalPoints: number;
	maxPossiblePoints: number;
	userHighscore: number;
	questions: QuestionsArrayType;
	dispatch: ActionDispatch<[action: ReactQuizActionType]>;
}) {
	const totalScorePercentage: number = (userTotalPoints / maxPossiblePoints) * 100;

	const handleClick = () => {
		dispatch({
			type: 'dataReceived',
			payload: questions,
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
