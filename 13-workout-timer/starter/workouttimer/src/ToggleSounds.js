import { memo } from 'react';

function ToggleSounds(props) {
	const { allowSound, setAllowSound } = props;

	const handleClick = () => {
		setAllowSound((allow) => !allow);
	};

	return (
		<button
			className='btn-sound'
			onClick={handleClick}
		>
			{allowSound ? '🔈' : '🔇'}
		</button>
	);
}

export default memo(ToggleSounds);
