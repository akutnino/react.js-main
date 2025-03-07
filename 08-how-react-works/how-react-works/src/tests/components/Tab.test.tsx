import { cleanup, render, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { useState } from 'react';
import Tab from '../../components/Tab.tsx';

describe('Tab component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		const { result } = renderHook(() => {
			const [activeTab, setActiveTab] = useState<number>(0);
			return { activeTab, setActiveTab };
		});

		const { getByTestId } = render(
			<Tab
				num={0}
				activeTab={result.current.activeTab}
				setActiveTab={result.current.setActiveTab}
			/>
		);

		expect(getByTestId('tab')).toBeInTheDocument();
		expect(getByTestId('tab').innerHTML).toBe('Tab 1');
	});
});
