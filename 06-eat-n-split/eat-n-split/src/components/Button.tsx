import { type ReactNode } from 'react';

function Button({ onClick, children }: { onClick: () => void; children: ReactNode }) {
	return (
		<button
			className='button'
			type='button'
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
