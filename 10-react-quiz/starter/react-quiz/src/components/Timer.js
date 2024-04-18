import { useEffect } from 'react';

export default function Timer(props) {
	const { dispatch, secondsRemaining } = props;
	const minutes = Math.floor(secondsRemaining / 60);
	const seconds = secondsRemaining % 60;

	useEffect(() => {
		const timerID = setInterval(() => {
			dispatch({ type: 'tick' });
		}, 1000);

		return () => clearInterval(timerID);
	}, [dispatch]);

	// prettier-ignore
	return (
		<div className='timer'>
			{minutes < 10 && '0'}{minutes}:
      {seconds < 10 && '0'}{seconds}
		</div>
	);
}
