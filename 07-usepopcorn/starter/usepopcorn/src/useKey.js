import { useEffect } from 'react';

export function useKey(key, callback) {
	useEffect(() => {
		const keyDownEventCallback = (event) => {
			if (event.code.toLowerCase() === key.toLowerCase()) {
				callback(null);
			}
		};

		document.addEventListener('keydown', keyDownEventCallback);
		return () => document.removeEventListener('keydown', keyDownEventCallback);
	}, [key, callback]);
}
