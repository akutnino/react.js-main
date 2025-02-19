import { type ReactNode } from 'react';
import WatchedBox from './WatchedBox.tsx';

function MainSection({ children }: { children: ReactNode }) {
	return (
		<main className='main'>
			{children}
			<WatchedBox />
		</main>
	);
}

export default MainSection;
