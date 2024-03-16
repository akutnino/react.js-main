const messages = [
	'Learn React ⚛️',
	'Apply for jobs 💼',
	'Invest your new income 🤑'
];

export default function App(props) {
	const stepNumber = 1;
	const buttonStyle = { backgroundColor: '#7950f2', color: '#fff' };

	const handlePreviousClick = () => {
		alert('Previous Button was clicked');
	};

	const handleNextClick = () => {
		alert('Next Button was clicked');
	};

	return (
		<div className='steps'>
			<div className='numbers'>
				<div className={stepNumber >= 1 ? 'active' : ''}>1</div>
				<div className={stepNumber >= 2 ? 'active' : ''}>2</div>
				<div className={stepNumber >= 3 ? 'active' : ''}>3</div>
			</div>

			<p className='message'>
				Step {stepNumber}: {messages[stepNumber - 1]}
			</p>

			<div className='buttons'>
				<button
					style={buttonStyle}
					onClick={handlePreviousClick}
				>
					Previous
				</button>
				<button
					style={buttonStyle}
					onClick={handleNextClick}
				>
					Next
				</button>
			</div>
		</div>
	);
}
