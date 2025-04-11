import { type ReactNode, useState } from 'react';

function Box({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	return (
		<div
			className='box'
			data-testid='box'
		>
			<button
				className='btn-toggle'
				onClick={() => setIsOpen((open) => !open)}
			>
				{isOpen ? '–' : '+'}
			</button>
			{isOpen && children}
		</div>
	);
}

export default Box;
