import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import Footer from '../../components/Footer.tsx';

describe('Footer component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render Footer component correctly', () => {
		const { getByRole, getByTestId } = render(<Footer />);

		expect(getByRole('contentinfo')).toBeInTheDocument();
		expect(getByTestId('footer')).toBeInTheDocument();
	});

	test('should render Order component if store is open', () => {
		const mockDate = new Date().setHours(14);

		vi.useFakeTimers();
		vi.setSystemTime(mockDate);
		const { getByTestId } = render(<Footer />);

		expect(vi.isFakeTimers()).toBe(true);
		expect(getByTestId('footer')).toBeInTheDocument();
		expect(getByTestId('order')).toBeInTheDocument();
	});

	test('should not render Order component if store is closed', () => {
		const mockDate = new Date().setHours(0);

		vi.useFakeTimers();
		vi.setSystemTime(mockDate);
		const { getByTestId, getByRole } = render(<Footer />);

		expect(vi.isFakeTimers()).toBe(true);
		expect(getByTestId('footer')).toBeInTheDocument();
		expect(getByRole('paragraph')).toBeInTheDocument();
	});
});
