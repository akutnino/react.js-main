import {
	cleanup,
	render,
	type Matcher,
	type MatcherOptions,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import Footer from '../../components/Footer.tsx';

type RenderGetByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined
) => HTMLElement;

describe('Footer component test suite', () => {
	let renderGetByTestId: RenderGetByTestIdType;

	beforeEach(() => {
		const { getByTestId } = render(
			<Footer>
				<div>Test</div>
			</Footer>
		);

		renderGetByTestId = getByTestId as RenderGetByTestIdType;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(renderGetByTestId('footer')).toBeInTheDocument();
		expect(renderGetByTestId('footer').children).toHaveLength(1);
	});

	test('should check if the children is mounted by defualt', () => {
		const testElement = renderGetByTestId('footer').firstElementChild as HTMLDivElement;

		expect(testElement).toBeInTheDocument();
		expect(testElement).toHaveTextContent('Test');
		expect(renderGetByTestId('footer')).toContainElement(testElement);
	});
});
