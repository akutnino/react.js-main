import type { MouseEvent, ReactNode } from 'react';
import styles from '../styles/components/Button.module.scss';

function Button({
	type,
	onClick,
	children,
}: {
	type: 'primary' | 'back' | 'position' | 'submit';
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	children: ReactNode;
}) {
	return (
		<button
			className={`${styles.btn} ${type === 'submit' ? styles['primary'] : styles[type]}`}
			type={type === 'submit' ? 'submit' : 'button'}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
