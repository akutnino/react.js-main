export default function NextButton(props) {
	const { dispatch, questionAnswer } = props;
	if (questionAnswer === null) return null;

	const handleNextClick = () => {
		dispatch({ type: 'nextQuestion' });
	};

	return (
		<button
			className='btn btn-ui'
			onClick={handleNextClick}
		>
			Next
		</button>
	);
}
