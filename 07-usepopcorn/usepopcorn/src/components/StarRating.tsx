import { useState } from 'react';
import Star from './Star.tsx';

const containerStyle = {
	display: 'flex',
	alignItems: 'center',
	gap: '16px',
};

const startContainerStyle = {
	display: 'flex',
};

const textStyle = {
	lineHeight: '1',
	margin: '0',
};

function StarRating({ maxRating = 5 }: { maxRating: number }) {
	const [rating, setRating] = useState<number>(0);
	const [hoverRating, setHoverRating] = useState<number>(0);

	const handleClick = (rating: number) => {
		return () => {
			setRating(rating);
		};
	};

	const handleMouseEnter = (hoverRating: number) => {
		return () => {
			setHoverRating(hoverRating);
		};
	};

	const handleMouseLeave = () => {
		setHoverRating(0);
	};

	return (
		<div style={containerStyle}>
			<div style={startContainerStyle}>
				{Array.from(Array(maxRating), (_, index) => (
					<Star
						isRating={hoverRating ? hoverRating < index + 1 : rating < index + 1}
						onClick={handleClick(index + 1)}
						onMouseEnter={handleMouseEnter(index + 1)}
						onMouseLeave={handleMouseLeave}
						key={index}
					/>
				))}
			</div>
			<p style={textStyle}>{hoverRating || rating || ''}</p>
		</div>
	);
}

export default StarRating;
