import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { useState } from 'react';
import Star from '../../components/Star.tsx';

type RenderHookResultType = {
	current: {
		rating: number;
		hoverRating: number;
		setRating: React.Dispatch<React.SetStateAction<number>>;
		setHoverRating: React.Dispatch<React.SetStateAction<number>>;
	};
};

type RenderRerenderType = (ui: React.ReactNode) => void;

describe('Star component test suite', () => {
	const DEFAULT_COLOR: string = '#fcc419';
	const DEFAULT_SIZE: number = 48;
	const DEFAULT_IsRATING: boolean = true;
	const DEFAULT_RATING: number = 0;
	const DUMMY_RATING: number = 1;

	let starElement: HTMLSpanElement;
	let renderHookResult: RenderHookResultType;
	let renderRerender: RenderRerenderType;

	const SPY_HANDLE_CLICK = vi.fn((rating: number) => {
		return () => {
			renderHookResult.current.setRating(rating);
		};
	});

	const SPY_HANDLE_MOUSE_ENTER = vi.fn((hoverRating: number) => {
		return () => {
			renderHookResult.current.setHoverRating(hoverRating);
		};
	});

	const SPY_HANDLE_MOUSE_LEAVE = vi.fn(() => {
		renderHookResult.current.setHoverRating(0);
	});

	beforeEach(() => {
		const { result } = renderHook(() => {
			const [rating, setRating] = useState<number>(DEFAULT_RATING);
			const [hoverRating, setHoverRating] = useState<number>(0);

			return {
				rating,
				hoverRating,
				setRating,
				setHoverRating,
			};
		});

		const { getByTestId, rerender } = render(
			<Star
				color={DEFAULT_COLOR}
				size={DEFAULT_SIZE}
				isRating={DEFAULT_IsRATING}
				onClick={SPY_HANDLE_CLICK(DUMMY_RATING)}
				onMouseEnter={SPY_HANDLE_MOUSE_ENTER(DUMMY_RATING)}
				onMouseLeave={SPY_HANDLE_MOUSE_LEAVE}
			/>
		);

		renderRerender = rerender as RenderRerenderType;
		renderHookResult = result as RenderHookResultType;
		starElement = getByTestId('star') as HTMLSpanElement;
	});

	afterEach(() => {
		SPY_HANDLE_CLICK.mockClear();
		SPY_HANDLE_MOUSE_ENTER.mockClear();
		SPY_HANDLE_MOUSE_LEAVE.mockClear();
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(starElement).toBeInTheDocument();
	});

	test('should render the correct hover rating if the user hovers over the star component', () => {
		expect(renderHookResult.current.hoverRating).toBe(DEFAULT_RATING);

		fireEvent.mouseEnter(
			starElement,
			new MouseEvent('mouseenter', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(renderHookResult.current.hoverRating).toBe(DUMMY_RATING);
		expect(SPY_HANDLE_MOUSE_ENTER).toHaveBeenCalled();
		expect(SPY_HANDLE_MOUSE_ENTER).toHaveBeenCalledTimes(1);
	});

	test('should render the correct hover rating if the user stops hovering over the star component', () => {
		fireEvent.mouseEnter(
			starElement,
			new MouseEvent('mouseenter', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(renderHookResult.current.hoverRating).toBe(DUMMY_RATING);

		renderRerender(
			<Star
				color={DEFAULT_COLOR}
				size={DEFAULT_SIZE}
				isRating={!DEFAULT_IsRATING}
				onClick={SPY_HANDLE_CLICK(DUMMY_RATING)}
				onMouseEnter={SPY_HANDLE_MOUSE_ENTER(DUMMY_RATING)}
				onMouseLeave={SPY_HANDLE_MOUSE_LEAVE}
			/>
		);

		fireEvent.mouseLeave(
			starElement,
			new MouseEvent('mouseleave', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(renderHookResult.current.hoverRating).toBe(DEFAULT_RATING);
		expect(SPY_HANDLE_MOUSE_LEAVE).toHaveBeenCalled();
		expect(SPY_HANDLE_MOUSE_LEAVE).toHaveBeenCalledTimes(1);
	});

	test('should render the component correctly if the user clicks on the star component', () => {
		expect(renderHookResult.current.rating).toBe(DEFAULT_RATING);

		fireEvent.click(
			starElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(renderHookResult.current.rating).toBe(DUMMY_RATING);
		expect(SPY_HANDLE_CLICK).toHaveBeenCalled();
		expect(SPY_HANDLE_CLICK).toHaveBeenCalledTimes(1);
	});
});
