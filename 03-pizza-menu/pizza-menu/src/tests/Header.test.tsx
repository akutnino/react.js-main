import { describe, test } from 'vitest';
import { render } from '@testing-library/react';
import Header from '../components/Header.tsx';

describe('Header component test suit', () => {
	test('should render the component correctly', () => {
		const sample = render(<Header />).container;
		console.log(sample.innerHTML);
	});
});
