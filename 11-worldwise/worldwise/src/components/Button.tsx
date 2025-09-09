import type { MouseEvent, ReactNode } from 'react';
import styles from '../styles/components/Button.module.scss';

function Button({
	type,
	onClick,
	children,
}: {
	type: 'primary' | 'back' | 'position';
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	children: ReactNode;
}) {
	return (
		<button
			className={`${styles.btn} ${styles[type]}`}
			type='button'
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
