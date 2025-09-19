import { useNavigate, useSearchParams, type NavigateFunction } from 'react-router';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useState, type MouseEvent } from 'react';
import type { UseSearchParamsType } from '../types/components/types.ts';
import type { LatLngExpression } from 'leaflet';
import styles from '../styles/components/Map.module.scss';

function Map() {
	const navigate: NavigateFunction = useNavigate();
	const [searchParams, setSearchParams]: UseSearchParamsType = useSearchParams();
	const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 0]);
	const lat: string | null = searchParams.get('lat');
	const lng: string | null = searchParams.get('lng');

	const handleClick = () => {
		navigate('form');
	};

	const handleChangePosition = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		// setSearchParams({ lat: 'nino', lng: 'brown' });
		console.log({ lat, lng });
	};

	return (
		<div
			className={styles.mapContainer}
			onClick={handleClick}
		>
			<MapContainer
				className={styles.map}
				center={mapPosition}
				zoom={13}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				<Marker position={mapPosition}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}

export default Map;
