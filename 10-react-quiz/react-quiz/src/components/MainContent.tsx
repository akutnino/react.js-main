import type { ReactNode } from 'react';

function MainContent({ children }: { children: ReactNode }) {
	return (
		<main
			className='main'
			data-testid='main'
		>
			{children}
		</main>
	);
}

export default MainContent;
