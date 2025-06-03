import type { ActionDispatch } from 'react';
import type {
	QuestionType,
	ReactQuizActionType,
	UserAnswerIndexType,
} from '../types/components/types.ts';
import Options from './Options.tsx';

function Question({
	question,
	userAnswerIndex,
	dispatch,
}: {
	question: QuestionType;
	userAnswerIndex: UserAnswerIndexType;
	dispatch: ActionDispatch<[action: ReactQuizActionType]>;
}) {
	const { question: quizQuestion, options, correctOption }: QuestionType = question;

	return (
		<div>
			<h4>{quizQuestion}</h4>
			<Options
				options={options}
				correctOption={correctOption}
				userAnswerIndex={userAnswerIndex}
				dispatch={dispatch}
			/>
		</div>
	);
}

export default Question;
