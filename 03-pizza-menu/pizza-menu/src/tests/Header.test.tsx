import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import Header from '../components/Header.tsx';

describe('Header component test suite', () => {
	beforeEach(() => {
		render(<Header />);
	});

	test('should render correctly the login component', () => {
		const mainElement = screen.getByRole('heading');
		expect(mainElement).toBeInTheDocument();
	});

	test('should render correctly h1 element', () => {
		expect(screen.getByTestId('header-h1')).toBeInTheDocument();
	});
});
