import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from '../styles/Map.module.scss';

export default function Map() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');

	const handleChangePos = (event) => {
		event.stopPropagation();
		setSearchParams({ lat: 909090, lng: 818181 });
	};

	const handleMapClick = () => {
		navigate('form');
	};

	return (
		<div
			className={styles.mapContainer}
			onClick={handleMapClick}
		>
			<h1>Map</h1>
			<h1>
				Position: {lat}, {lng}
			</h1>
			<button
				type='button'
				onClick={handleChangePos}
			>
				Change Position
			</button>
		</div>
	);
}
