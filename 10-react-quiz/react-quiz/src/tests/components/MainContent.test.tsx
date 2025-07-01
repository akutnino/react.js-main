import {
	cleanup,
	render,
	type Matcher,
	type MatcherOptions,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import MainContent from '../../components/MainContent.tsx';

type RenderGetByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined
) => HTMLElement;

describe('MainContent component test suite', () => {
	let renderGetByTestId: RenderGetByTestIdType;

	beforeEach(() => {
		const { getByTestId } = render(
			<MainContent>
				<div>Test</div>
			</MainContent>
		);

		renderGetByTestId = getByTestId as RenderGetByTestIdType;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(renderGetByTestId('main')).toBeInTheDocument();
		expect(renderGetByTestId('main').children).toHaveLength(1);
	});

	test('should check if the children is mounted by defualt', () => {
		const testElement = renderGetByTestId('main').firstElementChild as HTMLDivElement;

		expect(testElement).toBeInTheDocument();
		expect(testElement).toHaveTextContent('Test');
		expect(renderGetByTestId('main')).toContainElement(testElement);
	});
});
