export default function NextButton(props) {
	const { dispatch, questionAnswer, totalQuizQuestions, questionIndex } = props;
	if (questionAnswer === null) return null;

	const handleNextClick = () => {
		if (questionIndex === totalQuizQuestions - 1) {
			dispatch({ type: 'finished' });
		} else {
			dispatch({ type: 'nextQuestion' });
		}
	};

	return (
		<button
			className='btn btn-ui'
			onClick={handleNextClick}
		>
			{questionIndex < totalQuizQuestions - 1 ? 'Next' : 'Finish'}
		</button>
	);
}
