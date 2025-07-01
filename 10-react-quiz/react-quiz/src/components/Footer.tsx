import type { ReactNode } from 'react';

function Footer({ children }: { children: ReactNode }) {
	return <footer data-testid='footer'>{children}</footer>;
}

export default Footer;
