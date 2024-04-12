import { useState, useEffect } from 'react';

export function useLocalStorageState(initialState, getItemKey) {
	const [value, setValue] = useState(localStorageGetItem);

	function localStorageGetItem() {
		const storedValue = localStorage.getItem(getItemKey);
		return storedValue ? JSON.parse(storedValue) : initialState;
	}

	useEffect(() => {
		localStorage.setItem(getItemKey, JSON.stringify(value));
	}, [value, getItemKey]);

	return [value, setValue];
}
