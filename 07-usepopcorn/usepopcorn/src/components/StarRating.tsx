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

function StarRating({
	maxRating = 5,
	color = '#fcc419',
	size = 48,
	className = '',
	messages = [],
	defaultRating = 0,
	onSetRating = () => {},
}: {
	maxRating: number;
	color?: string;
	size?: number;
	className?: string;
	messages?: string[];
	defaultRating?: number;
	onSetRating?: (rating: number) => void;
}) {
	const [rating, setRating] = useState<number>(defaultRating);
	const [hoverRating, setHoverRating] = useState<number>(0);

	const textStyle = {
		lineHeight: '1',
		margin: '0',
		color,
		fontSize: `${size}px`,
	};

	const handleClick = (rating: number) => {
		return () => {
			setRating(rating);
			onSetRating(rating);
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
		<div
			style={containerStyle}
			className={className}
			data-testid='starRating'
		>
			<div style={startContainerStyle}>
				{Array.from(Array(maxRating), (_, index) => (
					<Star
						color={color}
						size={size}
						isRating={hoverRating ? hoverRating >= index + 1 : rating >= index + 1}
						onClick={handleClick(index + 1)}
						onMouseEnter={handleMouseEnter(index + 1)}
						onMouseLeave={handleMouseLeave}
						key={index}
					/>
				))}
			</div>
			<p style={textStyle}>
				{messages.length === maxRating
					? messages[hoverRating ? hoverRating - 1 : rating - 1]
					: hoverRating || rating || ''}
			</p>
		</div>
	);
}

export default StarRating;
