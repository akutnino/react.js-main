function App() {
	const messages: string[] = [
		'Start Learning React ⚛️',
		'Apply for jobs 💼',
		'Invest your new income 🤑',
	];

	const step: number = 3;

	return (
		<div
			className='steps'
			data-testid='steps'
		>
			<div
				className='numbers'
				data-testid='numbers'
			>
				<div className={step >= 1 ? 'active' : ''}>1</div>
				<div className={step >= 2 ? 'active' : ''}>2</div>
				<div className={step >= 3 ? 'active' : ''}>3</div>
			</div>

			<p className='message'>
				Step {step}: {messages[step - 1]}
			</p>

			<div className='buttons'>
				<button
					type='button'
					style={{ backgroundColor: '#7950f2', color: '#fff' }}
				>
					Previous
				</button>
				<button
					type='button'
					style={{ backgroundColor: '#7950f2', color: '#fff' }}
				>
					Next
				</button>
			</div>
		</div>
	);
}

export default App;
