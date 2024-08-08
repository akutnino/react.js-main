import { useSearchParams } from 'react-router-dom';
import styles from '../styles/Map.module.scss';

export default function Map() {
	const [searchParams, setSearchParams] = useSearchParams();
	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');

	const handleClick = () => {
		setSearchParams({ lat: 909090, lng: 818181 });
	};

	return (
		<div className={styles.mapContainer}>
			<h1>Map</h1>
			<h1>
				Position: {lat}, {lng}
			</h1>
			<button
				type='button'
				onClick={handleClick}
			>
				Change Position
			</button>
		</div>
	);
}
