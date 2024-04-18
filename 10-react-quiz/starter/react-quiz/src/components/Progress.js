export default function Progress(props) {
	const {
		questionIndex,
		totalQuizQuestions,
		points,
		totalPossiblePoints,
		questionAnswer
	} = props;

	return (
		<header className='progress'>
			<progress
				max={totalQuizQuestions}
				value={questionIndex + Number(questionAnswer !== null)}
			/>

			<p>
				Question <strong>{questionIndex + 1}</strong> / {totalQuizQuestions}
			</p>

			<p>
				<strong>{points}</strong> / {totalPossiblePoints}
			</p>
		</header>
	);
}
