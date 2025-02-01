import { type ReactNode } from 'react';

function Button({ children }: { children: ReactNode }) {
	return (
		<button
			className='button'
			type='button'
		>
			{children}
		</button>
	);
}

export default Button;
