export default function Options(props) {
	const { correctOption, options, dispatch, questionAnswer } = props;
	const hasAnswered = questionAnswer !== null;

	const handleQuestionAnswer = (index) => {
		return () => dispatch({ type: 'newAnswer', payload: index });
	};

	// prettier-ignore
	return (
		<div className='options'>
			{options.map((optionName, index) => {

				const buttonIndentStyle = `${
					index === questionAnswer ? 'answer' : ''
				}`;

				const buttonAnswerStyle = `${
					hasAnswered ? (index === correctOption ? 'correct' : 'wrong') : ''
				}`;

				return (
					<button
						className={`btn btn-option ${buttonIndentStyle} ${buttonAnswerStyle}`}
						onClick={handleQuestionAnswer(index)}
						disabled={hasAnswered}
						key={optionName}
					>
						{optionName}
					</button>
				);
			})}
		</div>
	);
}
