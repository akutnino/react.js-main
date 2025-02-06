import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import App from '../components/App.tsx';

describe('App component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should show all components on the DOM', () => {
		const { getByTestId, getByText } = render(<App />);

		expect(getByTestId('container')).toBeInTheDocument();
		expect(getByTestId('sidebar')).toBeInTheDocument();
		expect(getByTestId('friendsList')).toBeInTheDocument();
		expect(getByTestId('formAddFriend')).toBeInTheDocument();
		expect(getByText('Close')).toBeInTheDocument();
	});

	test('shoukd render FormSplitBill if the FriendListItem Select button is clicked', () => {
		const { getByTestId, getByText } = render(<App />);
		const selectButton = getByText('Select') as HTMLButtonElement;
	});
});
