import { useState } from 'react';

const messages = [
	'Learn React ⚛️',
	'Apply for jobs 💼',
	'Invest your new income 🤑'
];

export default function App(props) {
	const [stepNumber, setStepNumber] = useState(1);
	const [isOpen, setIsOpen] = useState(true);
	const buttonStyle = { backgroundColor: '#7950f2', color: '#fff' };

	const handlePreviousClick = () => {
		setStepNumber((currentState) =>
			currentState === 1 ? currentState : currentState - 1
		);
	};

	const handleNextClick = () => {
		setStepNumber((currentState) =>
			currentState === 3 ? currentState : currentState + 1
		);
	};

	const handleCloseClick = () => {
		setIsOpen((currentState) => !currentState);
	};

	return (
		<>
			<button
				className='close'
				onClick={handleCloseClick}
			>
				&times;
			</button>

			{isOpen && (
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
			)}
		</>
	);
}
