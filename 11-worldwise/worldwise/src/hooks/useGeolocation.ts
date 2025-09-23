import { useState } from 'react';
import type { DefaultPositionType } from '../types/hooks/types.ts';

function useGeolocation(defaultPosition: DefaultPositionType) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [position, setPosition] = useState<DefaultPositionType>(defaultPosition);
	const [error, setError] = useState<null | string>(null);

	const getPosition = () => {
		if (!navigator.geolocation)
			return setError('Your browser does not support geolocation');

		setIsLoading(true);
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				console.log(pos);
				setPosition({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				});
				setIsLoading(false);
			},
			(error) => {
				console.log(error);
				setError(error.message);
				setIsLoading(false);
			}
		);
	};

	return { isLoading, position, error, getPosition };
}

export { useGeolocation };
