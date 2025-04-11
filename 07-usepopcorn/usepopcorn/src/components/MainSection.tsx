import { type ReactNode } from 'react';

function MainSection({ children }: { children: ReactNode }) {
	return (
		<main
			className='main'
			data-testid='mainSection'
		>
			{children}
		</main>
	);
}

export default MainSection;
