import Options from './Options';

export default function Question(props) {
	const { questionObject, dispatch, questionAnswer } = props;
	const { correctOption, question, options, id, points } = questionObject;

	return (
		<div>
			<h4>{question}</h4>
			<Options
				correctOption={correctOption}
				options={options}
				dispatch={dispatch}
				questionAnswer={questionAnswer}
			/>
		</div>
	);
}
