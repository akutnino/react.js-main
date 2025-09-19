import { useNavigate, useSearchParams, type NavigateFunction } from 'react-router';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useState, type MouseEvent } from 'react';
import { useCities } from '../contexts/CitiesContext.tsx';
import type { CitiesContextValue } from '../types/contexts/types.ts';
import type { CityDataType, UseSearchParamsType } from '../types/components/types.ts';
import type { LatLngExpression } from 'leaflet';
import styles from '../styles/components/Map.module.scss';

function Map() {
	const navigate: NavigateFunction = useNavigate();
	const { cities }: CitiesContextValue = useCities();
	const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 0]);
	// const [searchParams, setSearchParams]: UseSearchParamsType = useSearchParams();
	// const lat: string | null = searchParams.get('lat');
	// const lng: string | null = searchParams.get('lng');

	const handleClick = () => {
		navigate('form');
	};

	// const handleChangePosition = (event: MouseEvent<HTMLButtonElement>) => {
	// 	event.stopPropagation();
	// 	setSearchParams({ lat: 'nino', lng: 'brown' });
	// };

	return (
		<div
			className={styles.mapContainer}
			onClick={handleClick}
		>
			<MapContainer
				className={styles.map}
				center={mapPosition}
				zoom={4}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>

				{cities.map((cityObj: CityDataType) => (
					<Marker
						position={Object.values(cityObj.position) as LatLngExpression}
						key={cityObj.id}
					>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}

export default Map;
