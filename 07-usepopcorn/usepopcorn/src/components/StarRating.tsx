import { useState } from 'react';
import Star from './Star.tsx';

const containerStyle = {
	display: 'flex',
	alignItems: 'center',
	gap: '16px',
};

const startContainerStyle = {
	display: 'flex',
	gap: '1px',
};

const textStyle = {
	lineHeight: '1',
	margin: '0',
};

function StarRating({ maxRating = 5 }: { maxRating: number }) {
	const [rating, setRating] = useState<number>(0);

	const handleClick = (rating: number) => {
		return () => {
			setRating(rating);
		};
	};

	return (
		<div style={containerStyle}>
			<div style={startContainerStyle}>
				{Array.from(Array(maxRating), (_, index) => (
					<Star
						isRating={rating < index + 1}
						onClick={handleClick(index + 1)}
						key={index}
					/>
				))}
			</div>
			<p style={textStyle}>{rating || ''}</p>
		</div>
	);
}

export default StarRating;
