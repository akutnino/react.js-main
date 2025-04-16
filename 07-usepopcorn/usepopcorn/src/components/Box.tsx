import { type ReactNode, useState } from 'react';

function Box({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	const handleToggle = () => {
		setIsOpen((currentBoolean) => !currentBoolean);
	};

	return (
		<div
			className='box'
			data-testid='box'
		>
			<button
				className='btn-toggle'
				onClick={handleToggle}
			>
				{isOpen ? '–' : '+'}
			</button>
			{isOpen && children}
		</div>
	);
}

export default Box;
