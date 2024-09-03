import { memo, useState } from 'react';
import clickSound from './ClickSound.m4a';

function Calculator(props) {
	const { workouts, allowSound } = props;
	const [number, setNumber] = useState(workouts.at(0).numExercises);
	const [sets, setSets] = useState(3);
	const [speed, setSpeed] = useState(90);
	const [durationBreak, setDurationBreak] = useState(5);

	const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
	const mins = Math.floor(duration);
	const seconds = (duration - mins) * 60;

	const playSound = function () {
		if (!allowSound) return;
		const sound = new Audio(clickSound);
		sound.play();
	};

	const handleWorkoutType = (event) => {
		setNumber(Number(event.target.value));
	};

	const handleWorkoutSetCount = (event) => {
		setSets(Number(event.target.value));
	};

	const handleWorkoutSpeed = (event) => {
		setSpeed(Number(event.target.value));
	};

	const handleWorkoutBreakLength = (event) => {
		setDurationBreak(Number(event.target.value));
	};

	const handleAddTime = () => {};

	const handleDeductTime = () => {};

	return (
		<>
			<form>
				<div>
					<label>Type of workout</label>
					<select
						value={number}
						onChange={handleWorkoutType}
					>
						{workouts.map((workout) => (
							<option
								value={workout.numExercises}
								key={workout.name}
							>
								{workout.name} ({workout.numExercises} exercises)
							</option>
						))}
					</select>
				</div>

				<div>
					<label>How many sets?</label>
					<input
						type='range'
						min='1'
						max='5'
						value={sets}
						onChange={handleWorkoutSetCount}
					/>
					<span>{sets}</span>
				</div>

				<div>
					<label>How fast are you?</label>
					<input
						type='range'
						min='30'
						max='180'
						step='30'
						value={speed}
						onChange={handleWorkoutSpeed}
					/>
					<span>{speed} sec/exercise</span>
				</div>

				<div>
					<label>Break length</label>
					<input
						type='range'
						min='1'
						max='10'
						value={durationBreak}
						onChange={handleWorkoutBreakLength}
					/>
					<span>{durationBreak} minutes/break</span>
				</div>
			</form>

			<section>
				<button onClick={handleAddTime}>–</button>
				<p>
					{mins < 10 && '0'}
					{mins}:{seconds < 10 && '0'}
					{seconds}
				</p>
				<button onClick={handleDeductTime}>+</button>
			</section>
		</>
	);
}

export default memo(Calculator);
