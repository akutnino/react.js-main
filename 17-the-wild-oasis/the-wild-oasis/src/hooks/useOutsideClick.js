import { useEffect, useRef } from 'react';

export function useOutsideClick(
	openName = '',
	handleCloseWindow,
	listenCapturing = true
) {
	const ref = useRef();

	useEffect(() => {
		if (!openName) return;

		const handleModalClick = (event) => {
			if (ref.current && !ref.current.contains(event.target)) handleCloseWindow();
		};

		document.addEventListener('click', handleModalClick, listenCapturing);

		return () => document.removeEventListener('click', handleModalClick, listenCapturing);
	}, [openName, handleCloseWindow, listenCapturing]);

	return { ref };
}
