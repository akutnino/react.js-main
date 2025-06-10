function FinishScreen({
	userTotalPoints,
	maxPossiblePoints,
	userHighscore,
}: {
	userTotalPoints: number;
	maxPossiblePoints: number;
	userHighscore: number;
}) {
	const totalScorePercentage: number = (userTotalPoints / maxPossiblePoints) * 100;

	return (
		<>
			<p className='result'>
				You scored <strong>{userTotalPoints}</strong> out of {maxPossiblePoints} (
				{Math.ceil(totalScorePercentage)}%)
			</p>
			<p className='highscore'>(Highscore: {userHighscore} points)</p>
		</>
	);
}

export default FinishScreen;
