import { cleanup, fireEvent, render } from '@testing-library/react';
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

	test('should render FormSplitBill if the FriendListItem Select button is clicked', () => {
		const { getByTestId, getAllByText } = render(<App />);
		const selectButton = getAllByText('Select')[0] as HTMLButtonElement;

		fireEvent.click(
			selectButton,
			new MouseEvent('clcik', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(getByTestId('formSplitBill')).toBeInTheDocument();
		expect(selectButton.innerHTML).toBe('Close');
	});

	test('should unmount formAddFriend if the Close button is clicked', () => {
		const { getByTestId, getByText } = render(<App />);
		const closeButton = getByText('Close') as HTMLButtonElement;

		fireEvent.click(
			closeButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(getByText('Add Friend')).toBeInTheDocument();
		expect(getByTestId('container').lastChild).toBe(getByTestId('sidebar'));
	});
});
