import { type ReactNode } from 'react';

function MainSection({ children }: { children: ReactNode }) {
	return <main className='main'>{children}</main>;
}

export default MainSection;
