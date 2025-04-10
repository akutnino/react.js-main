import { useEffect } from 'react';

export function useKey(keyCode: string, setter: () => void) {
	useEffect(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.code === keyCode) setter();
		};

		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	}, [keyCode, setter]);
}
