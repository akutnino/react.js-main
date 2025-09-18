import { useNavigate, useSearchParams, type NavigateFunction } from 'react-router';
import type { UseSearchParamsType } from '../types/components/types.ts';
import type { MouseEvent } from 'react';
import styles from '../styles/components/Map.module.scss';

function Map() {
	const navigate: NavigateFunction = useNavigate();
	const [searchParams, setSearchParams]: UseSearchParamsType = useSearchParams();
	const lat: string | null = searchParams.get('lat');
	const lng: string | null = searchParams.get('lng');

	const handleClick = () => {
		navigate('form');
	};

	const handleChangePosition = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setSearchParams({ lat: 'nino', lng: 'brown' });
	};

	return (
		<div
			className={styles.mapContainer}
			onClick={handleClick}
		>
			<h1>Map</h1>
			<h1>
				Position: {lat}, {lng}
			</h1>
			<button
				type='button'
				onClick={handleChangePosition}
			>
				Change Position
			</button>
		</div>
	);
}

export default Map;
