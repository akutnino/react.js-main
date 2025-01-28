import { type ReactNode, useState } from 'react';

const messages: string[] = [
	'Start Learning React ⚛️',
	'Apply for jobs 💼',
	'Invest your new income 🤑',
];

function App() {
	const [step, setStep] = useState<number>(1);
	const [isOpen, setIsOpen] = useState<boolean>(true);

	const handleOpen = () => {
		setIsOpen(!isOpen);
	};

	const handlePrevious = () => {
		setStep((currentStep) => (currentStep > 1 ? currentStep - 1 : 1));
	};

	const handleNext = () => {
		setStep((currentStep) => (currentStep < 3 ? currentStep + 1 : 3));
	};

	return (
		<>
			<button
				className='close'
				data-testid='close'
				type='button'
				onClick={handleOpen}
			>
				&times;
			</button>

			{isOpen && (
				<div
					className='steps'
					data-testid='steps'
				>
					<div
						className='numbers'
						data-testid='numbers'
					>
						<div className={'active'}>1</div>
						<div className={step >= 2 ? 'active' : ''}>2</div>
						<div className={step >= 3 ? 'active' : ''}>3</div>
					</div>

					<p
						className='message'
						data-testid='message'
					>
						Step {step}: {messages[step - 1]}
					</p>

					<div
						className='buttons'
						data-testid='buttons'
					>
						<Button
							textColor='#fff'
							bgColor='#7950f2'
							onClick={handlePrevious}
						>
							<span>👈</span>
							Previous
						</Button>

						<Button
							textColor='#fff'
							bgColor='#7950f2'
							onClick={handleNext}
						>
							Next
							<span>👉</span>
						</Button>
					</div>
				</div>
			)}
		</>
	);
}

function Button({
	textColor,
	bgColor,
	onClick,
	children,
}: {
	textColor: string;
	bgColor: string;
	onClick: () => void;
	children: ReactNode;
}) {
	return (
		<button
			type='button'
			style={{ backgroundColor: bgColor, color: textColor }}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default App;
