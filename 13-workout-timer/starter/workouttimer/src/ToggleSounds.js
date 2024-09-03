import { memo } from 'react';

const ToggleSounds = memo(function ToggleSounds(props) {
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
});

export default ToggleSounds;
