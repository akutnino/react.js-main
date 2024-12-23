import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Header from '../components/Header.tsx';

describe('Header component test suite', () => {
	test('should render correctly the login component', () => {
		const container = render(<Header />).container;
		console.log(container.innerHTML);

		const mainElement = screen.getByRole('heading');
		expect(mainElement).toBeInTheDocument();
	});
});
