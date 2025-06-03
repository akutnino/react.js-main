import type { ActionDispatch } from 'react';
import type {
	ReactQuizActionType,
	UserAnswerIndexType,
} from '../types/components/types.ts';

function Options({
	options,
	correctOption,
	userAnswerIndex,
	dispatch,
}: {
	options: string[];
	correctOption: number;
	userAnswerIndex: UserAnswerIndexType;
	dispatch: ActionDispatch<[action: ReactQuizActionType]>;
}) {
	const handleAnswer = (answerIndex: number) => {
		return () => {
			dispatch({
				type: 'userAnswer',
				payload: answerIndex,
			});
		};
	};

	return (
		<div className='options'>
			{options.map((option: string, index: number) => {
				return (
					<button
						type='button'
						className={`btn btn-option ${index === userAnswerIndex ? 'answer' : ''} 
            ${index === correctOption && userAnswerIndex && 'correct'} 
            ${index !== correctOption && userAnswerIndex && 'wrong'}`}
						disabled={userAnswerIndex !== null}
						onClick={handleAnswer(index)}
						key={index}
					>
						{option}
					</button>
				);
			})}
		</div>
	);
}

export default Options;
