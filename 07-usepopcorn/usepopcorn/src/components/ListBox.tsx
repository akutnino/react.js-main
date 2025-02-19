import { type ReactNode, useState } from 'react';

function ListBox({ children }: { children: ReactNode }) {
	const [isOpen1, setIsOpen1] = useState<boolean>(true);

	return (
		<div className='box'>
			<button
				className='btn-toggle'
				onClick={() => setIsOpen1((open) => !open)}
			>
				{isOpen1 ? '–' : '+'}
			</button>
			{isOpen1 && children}
		</div>
	);
}
export default ListBox;
