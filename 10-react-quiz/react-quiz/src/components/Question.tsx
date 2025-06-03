import type { QuestionType } from '../types/components/types.ts';
import Options from './Options.tsx';

function Question({ question }: { question: QuestionType }) {
	const { question: quizQuestion, options }: QuestionType = question;

	return (
		<div>
			<h4>{quizQuestion}</h4>
			<Options options={options} />
		</div>
	);
}

export default Question;
