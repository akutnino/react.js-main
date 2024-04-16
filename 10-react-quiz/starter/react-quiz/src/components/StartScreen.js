export default function StarScreen(props) {
	const { totalQuizQuestions, dispatch } = props;

	const handleStartQuiz = () => {
		dispatch({ type: 'startQuiz' });
	};

	return (
		<div className='start'>
			<h2>Welcome to The React Quiz</h2>
			<h3>{totalQuizQuestions} questions to test your React mastery</h3>
			<button
				className='btn btn-ui'
				onClick={handleStartQuiz}
			>
				Let's start
			</button>
		</div>
	);
}
