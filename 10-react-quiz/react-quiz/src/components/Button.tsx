import type { ReactNode } from 'react';

function Button({ children, onClick }: { children: ReactNode; onClick: () => void }) {
	return (
		<button
			type='button'
			className='btn btn-ui'
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
