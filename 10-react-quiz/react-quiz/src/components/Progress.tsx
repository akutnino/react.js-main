import type { UserAnswerIndexType } from '../types/components/types.ts';

function Progress({
	questionIndex,
	totalQuestions,
	userTotalPoints,
	maxPossiblePoints,
	userAnswerIndex,
}: {
	questionIndex: number;
	totalQuestions: number;
	userTotalPoints: number;
	maxPossiblePoints: number;
	userAnswerIndex: UserAnswerIndexType;
}) {
	const progressValue: number =
		userAnswerIndex !== null ? questionIndex + 1 : questionIndex;

	return (
		<header
			className='progress'
			data-testid='progress'
		>
			<progress
				max={totalQuestions}
				value={progressValue}
			/>

			<p>
				Question <strong>{questionIndex + 1}</strong> / {totalQuestions}
			</p>

			<p>
				<strong>{userTotalPoints}</strong> / {maxPossiblePoints}
			</p>
		</header>
	);
}

export default Progress;
