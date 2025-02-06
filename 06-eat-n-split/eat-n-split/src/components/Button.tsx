import { type ComponentPropsWithRef, type ReactNode } from 'react';

function Button({
	onClick,
	children,
}: {
	onClick?: () => void;
	children: ReactNode;
} & ComponentPropsWithRef<'button'>) {
	return (
		<button
			className='button'
			onClick={onClick}
			data-testid='button'
		>
			{children}
		</button>
	);
}

export default Button;
