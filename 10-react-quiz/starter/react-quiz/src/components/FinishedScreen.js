export default function FinishedScreen(props) {
	const { points, totalPossiblePoints, highscore } = props;
	const quizResultPercentage = (points / totalPossiblePoints) * 100;
	let emoji;
	if (quizResultPercentage === 100) emoji = '🥇';
	if (quizResultPercentage >= 80 && quizResultPercentage < 100) emoji = '🎉';
	if (quizResultPercentage >= 50 && quizResultPercentage < 80) emoji = '🙃';
	if (quizResultPercentage >= 0 && quizResultPercentage < 50) emoji = '😒';
	if (quizResultPercentage === 0) emoji = '🤦‍♂️';

	return (
		<>
			<p className='result'>
				<span>{emoji}</span> You Scored <strong>{points}</strong> out of{' '}
				{totalPossiblePoints} ({Math.ceil(quizResultPercentage)}%)
			</p>
			<p className='highscore'>(Highscore: {highscore} points)</p>
		</>
	);
}
