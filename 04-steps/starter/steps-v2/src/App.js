import { useState } from 'react';

const messages = [
	'Learn React ⚛️',
	'Apply for jobs 💼',
	'Invest your new income 🤑'
];

export default function App(props) {
	return (
		<div>
			<Steps />
			{/* <Steps /> */}
		</div>
	);
}

function Steps(props) {
	const [stepNumber, setStepNumber] = useState(1);
	const [isOpen, setIsOpen] = useState(true);

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
		<div>
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

					<StepMessage stepNumber={stepNumber}>
						{messages[stepNumber - 1]}
					</StepMessage>

					<div className='buttons'>
						<Button onClick={handlePreviousClick}>Previous</Button>
						<Button onClick={handleNextClick}>Next</Button>
					</div>
				</div>
			)}
		</div>
	);
}

function StepMessage(props) {
	const { stepNumber, children } = props;

	return (
		<div className='message'>
			<h3>Step {stepNumber}:</h3>
			{children}
		</div>
	);
}

function Button(props) {
	const { onClick, children } = props;
	const buttonStyle = { backgroundColor: '#7950f2', color: '#fff' };

	return (
		<button
			style={buttonStyle}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
