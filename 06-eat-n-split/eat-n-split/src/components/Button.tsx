import { type ComponentPropsWithRef, type ReactNode } from 'react';

function Button({
	onClick,
	children,
	...props
}: {
	onClick?: () => void;
	children: ReactNode;
} & ComponentPropsWithRef<'button'>) {
	return (
		<button
			className='button'
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;
