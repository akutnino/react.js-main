const containerStyle = {
	display: 'flex',
	alignItems: 'center',
	gap: '16px',
};

const startContainerStyle = {
	display: 'flex',
	gap: '4px',
};

const textStyle = {
	lineHeight: '1',
	margin: '0',
};

function StarRating({ maxRating = 5 }: { maxRating?: number }) {
	return (
		<div style={containerStyle}>
			<div style={startContainerStyle}>
				{Array.from(Array(maxRating), (_, index) => (
					<span key={index}>S{index + 1}</span>
				))}
			</div>
			<p style={textStyle}>10</p>
		</div>
	);
}

export default StarRating;
